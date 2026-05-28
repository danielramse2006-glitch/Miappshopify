import React, { useState } from "react";
import { AIChatMessage } from "../types";
import { Sparkles, Send, Loader2, FileCode, CheckCircle, HelpCircle, Save } from "lucide-react";

interface LiquidAssistantProps {
  chatHistory: AIChatMessage[];
  onSubmitPrompt: (prompt: string) => Promise<void>;
  onAddVirtualFile: (path: string, content: string) => void;
  loading: boolean;
}

export default function LiquidAssistant({
  chatHistory,
  onSubmitPrompt,
  onAddVirtualFile,
  loading,
}: LiquidAssistantProps) {
  const [prompt, setPrompt] = useState<string>("");
  const [justSaved, setJustSaved] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    onSubmitPrompt(prompt);
    setPrompt("");
  };

  const handleSaveToWorkspace = (fileName: string, code: string, messageId: string) => {
    onAddVirtualFile(fileName, code);
    setJustSaved((prev) => ({ ...prev, [messageId]: true }));
    setTimeout(() => {
      setJustSaved((prev) => ({ ...prev, [messageId]: false }));
    }, 2500);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col h-[650px] overflow-hidden" id="ai-liquid-assistant">
      {/* Header of AI Studio Assistant */}
      <div className="p-4 bg-gradient-to-r from-rose-50 to-amber-50/55 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-rose-500 fill-rose-100/30 shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">Creador de Liquid Copilot</h3>
            <p className="text-[10px] text-gray-500 font-mono">Powered by Gemini 3.5 Flash</p>
          </div>
        </div>
      </div>

      {/* Suggested quick requests */}
      <div className="px-4 py-2 border-b border-gray-100/75 bg-gray-50/30 flex gap-2 overflow-x-auto text-[10px] whitespace-nowrap scrollbar-none shrink-0">
        <button
          onClick={() => setPrompt("Crear sección de banner flotante de WhatsApp")}
          className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-600 rounded-full transition"
        >
          WhatsApp Flotante
        </button>
        <button
          onClick={() => setPrompt("Generar sección de testimonios de clientes con estrellas")}
          className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-600 rounded-full transition"
        >
          Testimonios Estelares
        </button>
        <button
          onClick={() => setPrompt("Crear contador de cuenta regresiva para ofertas de lujo")}
          className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-600 rounded-full transition"
        >
          Cuenta Regresiva
        </button>
      </div>

      {/* History scroll view */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center text-gray-400 space-y-2">
            <Sparkles className="h-10 w-10 text-rose-200" />
            <p className="text-xs font-semibold text-stone-700">Asistente Shopify Liquid</p>
            <p className="text-[11px] text-stone-500 max-w-xs leading-relaxed">
              Dime qué tipo de bloque, sección o botón quieres añadir a tu tienda Soft Glamour. El modelo generará el código Liquid perfecto para Shopify.
            </p>
          </div>
        ) : (
          chatHistory.map((msg) => (
            <div key={msg.id} className="space-y-3">
              <div
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-rose-500 text-white font-medium"
                      : "bg-stone-50 border border-stone-100 text-stone-850"
                  }`}
                >
                  {msg.content}
                </div>
              </div>

              {/* Generated Liquid blocks inside assistant card */}
              {msg.code && (
                <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-900 mx-2 space-y-3">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span className="font-mono text-[10px] text-emerald-400 font-semibold">{msg.code.fileName}</span>
                    <button
                      onClick={() => handleSaveToWorkspace(msg.code!.fileName, msg.code!.code, msg.id)}
                      disabled={justSaved[msg.id]}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-semibold transition ${
                        justSaved[msg.id]
                          ? "bg-emerald-900/40 text-emerald-300 border border-emerald-800"
                          : "bg-rose-500 hover:bg-rose-600 text-white"
                      }`}
                    >
                      {justSaved[msg.id] ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          <span>¡Importado!</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-3 w-3" />
                          <span>Importar a archivos</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="max-h-56 overflow-y-auto font-mono text-[10px] text-zinc-300 bg-zinc-900/60 p-2.5 rounded border border-zinc-850/60 whitespace-pre scrollbar-thin">
                    {msg.code.code}
                  </div>

                  <div className="text-[11px] text-zinc-400 bg-zinc-900 border-l-2 border-rose-500 p-2.5 rounded-r">
                    <span className="font-semibold block text-zinc-200 mb-1">Guía del Componente:</span>
                    <div className="text-zinc-300 space-y-1.5 leading-relaxed">
                      {msg.code.explanation}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex gap-2.5 max-w-[85%] items-center text-gray-500 bg-stone-50 p-3 rounded-2xl mr-auto text-xs w-48">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-rose-500" />
            <span>Generando Liquid...</span>
          </div>
        )}
      </div>

      {/* Footer Chat prompt input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-150 flex gap-2 bg-stone-50">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe tu requerimiento de Liquid..."
          disabled={loading}
          className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={!prompt.trim() || loading}
          className="p-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 disabled:opacity-40 transition shrink-0"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
