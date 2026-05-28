import React, { useState } from "react";
import { ThemeFile } from "../types";
import { Folder, FileCode, Check, Copy, Save, AlertCircle, RefreshCw } from "lucide-react";

interface FileBrowserProps {
  files: ThemeFile[];
  activeFile: ThemeFile | null;
  onSelectFile: (file: ThemeFile) => void;
  onUpdateFileContent: (path: string, newContent: string) => void;
  onResetFiles: () => void;
}

export default function FileBrowser({
  files,
  activeFile,
  onSelectFile,
  onUpdateFileContent,
  onResetFiles,
}: FileBrowserProps) {
  const [editorContent, setEditorContent] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync editor content when active file changes
  React.useEffect(() => {
    if (activeFile) {
      setEditorContent(activeFile.content);
      setIsSaved(false);
    }
  }, [activeFile]);

  // Group files into standard Shopify directories
  const directories: Record<string, ThemeFile[]> = {
    layout: [],
    templates: [],
    sections: [],
    blocks: [],
    snippets: [],
    config: [],
    assets: [],
  };

  files.forEach((file) => {
    const parts = file.path.split("/");
    const dir = parts[0];
    if (directories[dir]) {
      directories[dir].push(file);
    } else {
      // fallback in case of root file or custom folder
      if (!directories[dir]) {
        directories[dir] = [];
      }
      directories[dir].push(file);
    }
  });

  const handleSave = () => {
    if (activeFile) {
      onUpdateFileContent(activeFile.path, editorContent);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const handleCopy = () => {
    if (activeFile) {
      navigator.clipboard.writeText(editorContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full" id="theme-code-explorer">
      {/* File Tree Sidebar (4 columns) */}
      <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col h-[650px]">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">Explorador de Archivos</h3>
            <p className="text-xs text-gray-500 font-mono">Horizon v3.5.1 / Soft Glamour</p>
          </div>
          <button
            onClick={onResetFiles}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            title="Restaurar archivos originales"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {Object.entries(directories).map(([dirName, dirFiles]) => {
            if (dirFiles.length === 0) return null;
            return (
              <div key={dirName} className="space-y-1">
                <div className="flex items-center gap-2 px-2 py-1 text-gray-600 font-medium text-xs uppercase tracking-wider">
                  <Folder className="h-4 w-4 text-amber-500 fill-amber-100/30" />
                  <span>{dirName}</span>
                  <span className="ml-auto text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full font-mono">
                    {dirFiles.length}
                  </span>
                </div>

                <div className="pl-4 space-y-0.5">
                  {dirFiles.map((file) => {
                    const isActive = activeFile?.path === file.path;
                    return (
                      <button
                        key={file.path}
                        onClick={() => onSelectFile(file)}
                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs transition duration-200 ${
                          isActive
                            ? "bg-rose-50 text-rose-700 font-medium border-l-2 border-rose-500"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <FileCode className={`h-3.5 w-3.5 ${isActive ? "text-rose-500" : "text-gray-400"}`} />
                        <span className="truncate">{file.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Code Editor Workspace (8 columns) */}
      <div className="lg:col-span-8 bg-zinc-950 rounded-2xl shadow-md border border-zinc-900 flex flex-col h-[650px] overflow-hidden">
        {activeFile ? (
          <>
            {/* Editor Header */}
            <div className="bg-zinc-900/80 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <div className="h-4 w-px bg-zinc-800 mx-1"></div>
                <span className="font-mono text-xs text-zinc-300 font-medium tracking-tight">
                  {activeFile.path}
                </span>
                {editorContent !== activeFile.content && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse ml-1" title="Sin guardar"></span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition duration-200"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copiado" : "Copiar"}</span>
                </button>

                <button
                  onClick={handleSave}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition duration-200 ${
                    editorContent !== activeFile.content
                      ? "bg-rose-500 hover:bg-rose-600 text-white shadow-sm"
                      : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                  }`}
                >
                  {isSaved ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Save className="h-3.5 w-3.5" />}
                  <span>{isSaved ? "Guardado" : "Guardar"}</span>
                </button>
              </div>
            </div>

            {/* Simulated Live Editor Window */}
            <div className="flex-1 flex overflow-hidden font-mono text-xs text-zinc-300">
              {/* Line Numbers gutter */}
              <div className="py-4 select-none text-right text-zinc-600 bg-zinc-950 border-r border-zinc-900 w-11 px-2 shrink-0">
                {editorContent.split("\n").map((_, i) => (
                  <div key={i} className="leading-5 h-5">{i + 1}</div>
                ))}
              </div>

              {/* Editable Text Area */}
              <textarea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                className="flex-1 p-4 bg-zinc-950 focus:outline-none resize-none overflow-y-auto leading-5 text-emerald-300 fill-none border-none focus:ring-0 select-text selection:bg-rose-900/50"
                spellCheck="false"
                style={{
                  fontFamily: '"JetBrains Mono", Courier, monospace',
                  whiteSpace: "pre",
                }}
              />
            </div>

            {/* Quick Helper Banner */}
            <div className="bg-zinc-900/60 p-3 border-t border-zinc-900 flex items-center gap-2 text-[11px] text-zinc-500">
              <AlertCircle className="h-4 w-4 text-zinc-400 shrink-0" />
              <span>Puedes editar el código del tema Liquid. La pantalla de simulación reaccionará dinámicamente si modificas configuraciones.</span>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
            <FileCode className="h-12 w-12 text-zinc-700 mb-3 animate-pulse" />
            <p className="text-sm font-medium">Ningún archivo seleccionado</p>
            <p className="text-xs text-zinc-600 mt-1 max-w-xs">
              Haz clic en algún archivo en el Explorador de la izquierda para ver y editar su código Shopify Liquid.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
