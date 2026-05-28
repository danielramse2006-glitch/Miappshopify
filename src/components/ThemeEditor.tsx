import React, { useState } from "react";
import { CustomizerSettings } from "../types";
import { Palette, Layers, AlignLeft, Sliders, Layout, Monitor, Sparkles } from "lucide-react";

interface ThemeEditorProps {
  settings: CustomizerSettings;
  onUpdateSettings: (newSettings: Partial<CustomizerSettings>) => void;
}

export default function ThemeEditor({ settings, onUpdateSettings }: ThemeEditorProps) {
  const [activeTab, setActiveTab] = useState<"colors" | "header" | "hero" | "product">("colors");

  const handleChange = (key: keyof CustomizerSettings, value: any) => {
    onUpdateSettings({ [key]: value });
  };

  const presetGlamour = () => {
    onUpdateSettings({
      background_color: "#FFF9F8",
      text_color: "#1C1917",
      accent_color_1: "#E29578",
      accent_color_2: "#BC6C25",
      button_bg_color: "#1C1917",
      button_text_color: "#FFFFFF",
      announcement_bg: "#FCD5CE",
      announcement_text_color: "#1C1917",
    });
  };

  const presetDiamond = () => {
    onUpdateSettings({
      background_color: "#F8FAFC",
      text_color: "#0F172A",
      accent_color_1: "#0EA5E9",
      accent_color_2: "#38BDF8",
      button_bg_color: "#0F172A",
      button_text_color: "#FFFFFF",
      announcement_bg: "#E0F2FE",
      announcement_text_color: "#0369A1",
    });
  };

  const presetGothic = () => {
    onUpdateSettings({
      background_color: "#121212",
      text_color: "#E2E8F0",
      accent_color_1: "#9333EA",
      accent_color_2: "#C084FC",
      button_bg_color: "#FFFFFF",
      button_text_color: "#121212",
      announcement_bg: "#2A1B3D",
      announcement_text_color: "#E9D5FF",
    });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col h-[650px] overflow-hidden">
      {/* Customizer Sidebar Header */}
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <Sliders className="h-4 w-4 text-rose-500" />
          <h3 className="font-semibold text-gray-800 text-sm">Personalizador Shopify</h3>
        </div>
        <p className="text-xs text-gray-500">Ajusta variables del tema en vivo</p>
      </div>

      {/* Internal Ribbon tabs */}
      <div className="flex border-b border-gray-100 bg-gray-50/50">
        <button
          onClick={() => setActiveTab("colors")}
          className={`flex-1 py-2.5 text-center text-xs font-semibold border-b-2 transition duration-200 ${
            activeTab === "colors" ? "border-rose-500 text-rose-600 bg-white" : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
          title="Colores globales"
        >
          Colores
        </button>
        <button
          onClick={() => setActiveTab("header")}
          className={`flex-1 py-2.5 text-center text-xs font-semibold border-b-2 transition duration-200 ${
            activeTab === "header" ? "border-rose-500 text-rose-600 bg-white" : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
          title="Banner de aviso y cabecera"
        >
          Navbar
        </button>
        <button
          onClick={() => setActiveTab("hero")}
          className={`flex-1 py-2.5 text-center text-xs font-semibold border-b-2 transition duration-200 ${
            activeTab === "hero" ? "border-rose-500 text-rose-600 bg-white" : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
          title="Banner Principal / Slider"
        >
          Hero
        </button>
        <button
          onClick={() => setActiveTab("product")}
          className={`flex-1 py-2.5 text-center text-xs font-semibold border-b-2 transition duration-200 ${
            activeTab === "product" ? "border-rose-500 text-rose-600 bg-white" : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
          title="Catálogo & grilla"
        >
          Grilla
        </button>
      </div>

      {/* Customizer Option list view */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {activeTab === "colors" && (
          <div className="space-y-4">
            <div className="p-3 bg-rose-50/60 rounded-xl">
              <span className="flex items-center gap-1.5 font-semibold text-rose-800 text-xs mb-1">
                <Sparkles className="h-3.5 w-3.5" /> Presets de Estética
              </span>
              <p className="text-[11px] text-rose-700/80 mb-2">Aplica temas preconfigurados de inmediato:</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={presetGlamour}
                  className="px-2 py-1 bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 rounded text-[10px] font-medium transition"
                >
                  Glamour
                </button>
                <button
                  onClick={presetDiamond}
                  className="px-2 py-1 bg-white border border-sky-200 text-sky-700 hover:bg-sky-50 rounded text-[10px] font-medium transition"
                >
                  Diamond
                </button>
                <button
                  onClick={presetGothic}
                  className="px-2 py-1 bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 rounded text-[10px] font-medium transition"
                >
                  Gothic
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1">
                <Palette className="h-3.5 w-3.5 text-gray-500" /> Esquema General
              </h4>

              {/* Color pickers */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-xs text-gray-600">Fondo de tienda</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-mono">{settings.background_color}</span>
                    <input
                      type="color"
                      value={settings.background_color}
                      onChange={(e) => handleChange("background_color", e.target.value)}
                      className="w-8 h-8 rounded-full border-none cursor-pointer overflow-hidden p-0"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-xs text-gray-600">Texto principal</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-mono">{settings.text_color}</span>
                    <input
                      type="color"
                      value={settings.text_color}
                      onChange={(e) => handleChange("text_color", e.target.value)}
                      className="w-8 h-8 rounded-full border-none cursor-pointer overflow-hidden p-0"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-xs text-gray-600">Acento Glamour (Gris/Rosa)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-mono">{settings.accent_color_1}</span>
                    <input
                      type="color"
                      value={settings.accent_color_1}
                      onChange={(e) => handleChange("accent_color_1", e.target.value)}
                      className="w-8 h-8 rounded-full border-none cursor-pointer overflow-hidden p-0"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-xs text-gray-600">Detalles y Oro</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-mono">{settings.accent_color_2}</span>
                    <input
                      type="color"
                      value={settings.accent_color_2}
                      onChange={(e) => handleChange("accent_color_2", e.target.value)}
                      className="w-8 h-8 rounded-full border-none cursor-pointer overflow-hidden p-0"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-xs text-gray-600">Color Botón</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-mono">{settings.button_bg_color}</span>
                    <input
                      type="color"
                      value={settings.button_bg_color}
                      onChange={(e) => handleChange("button_bg_color", e.target.value)}
                      className="w-8 h-8 rounded-full border-none cursor-pointer overflow-hidden p-0"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-xs text-gray-600">Texto Botón</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-mono">{settings.button_text_color}</span>
                    <input
                      type="color"
                      value={settings.button_text_color}
                      onChange={(e) => handleChange("button_text_color", e.target.value)}
                      className="w-8 h-8 rounded-full border-none cursor-pointer overflow-hidden p-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "header" && (
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1">
                <Layers className="h-3.5 w-3.5 text-gray-500" /> Barra de Anuncios
              </h4>

              <div className="space-y-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Mostrar aviso superior</span>
                  <input
                    type="checkbox"
                    checked={settings.announcement_enabled}
                    onChange={(e) => handleChange("announcement_enabled", e.target.checked)}
                    className="rounded border-gray-300 text-rose-500 focus:ring-rose-400 h-4 w-4"
                  />
                </div>

                {settings.announcement_enabled && (
                  <div className="pt-2 space-y-2">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase">Mensaje</span>
                      <input
                        type="text"
                        value={settings.announcement_text}
                        onChange={(e) => handleChange("announcement_text", e.target.value)}
                        className="w-full text-xs p-1.5 border border-gray-200 rounded mt-0.5 focus:border-rose-300 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase">Color Fondo</span>
                        <input
                          type="color"
                          value={settings.announcement_bg}
                          onChange={(e) => handleChange("announcement_bg", e.target.value)}
                          className="w-full h-8 border border-gray-200 rounded cursor-pointer mt-0.5"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase">Color Texto</span>
                        <input
                          type="color"
                          value={settings.announcement_text_color}
                          onChange={(e) => handleChange("announcement_text_color", e.target.value)}
                          className="w-full h-8 border border-gray-200 rounded cursor-pointer mt-0.5"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1">
                <AlignLeft className="h-3.5 w-3.5 text-gray-500" /> Navegación y Header
              </h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Header Pegajoso (Sticky)</span>
                  <input
                    type="checkbox"
                    checked={settings.header_sticky}
                    onChange={(e) => handleChange("header_sticky", e.target.checked)}
                    className="rounded border-gray-300 text-rose-500 focus:ring-rose-400 h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Mostrar buscador</span>
                  <input
                    type="checkbox"
                    checked={settings.header_show_search}
                    onChange={(e) => handleChange("header_show_search", e.target.checked)}
                    className="rounded border-gray-300 text-rose-500 focus:ring-rose-400 h-4 w-4"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-gray-600 block">Alineación del Logo</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleChange("header_logo_alignment", "left")}
                      className={`flex-1 py-1.5 border rounded text-xs transition ${
                        settings.header_logo_alignment === "left"
                          ? "bg-rose-50 border-rose-300 text-rose-600 font-semibold"
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      Izquierda
                    </button>
                    <button
                      onClick={() => handleChange("header_logo_alignment", "center")}
                      className={`flex-1 py-1.5 border rounded text-xs transition ${
                        settings.header_logo_alignment === "center"
                          ? "bg-rose-50 border-rose-300 text-rose-600 font-semibold"
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      Centro
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "hero" && (
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1">
              <Monitor className="h-3.5 w-3.5 text-gray-500" /> Sección Hero del Tema
            </h4>

            {/* Hero Options */}
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-xs text-gray-600 block">Título Banner</span>
                <input
                  type="text"
                  value={settings.hero_title}
                  onChange={(e) => handleChange("hero_title", e.target.value)}
                  className="w-full text-xs p-2 border border-gray-200 rounded focus:border-rose-300 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs text-gray-600 block">Subtítulo</span>
                <textarea
                  value={settings.hero_subtitle}
                  onChange={(e) => handleChange("hero_subtitle", e.target.value)}
                  className="w-full text-xs p-2 border border-gray-200 rounded h-16 resize-none focus:border-rose-300 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs text-gray-600 block">Texto del Botón</span>
                <input
                  type="text"
                  value={settings.hero_button_text}
                  onChange={(e) => handleChange("hero_button_text", e.target.value)}
                  className="w-full text-xs p-2 border border-gray-200 rounded focus:border-rose-300 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-gray-600">Efecto Blur de Fondo</span>
                <input
                  type="checkbox"
                  checked={settings.hero_image_blur}
                  onChange={(e) => handleChange("hero_image_blur", e.target.checked)}
                  className="rounded border-gray-300 text-rose-500 focus:ring-rose-400 h-4 w-4"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs text-gray-600 block">Altura de la Sección</span>
                <div className="flex gap-1.5">
                  {(["small", "medium", "large"] as const).map((h) => (
                    <button
                      key={h}
                      onClick={() => handleChange("hero_height", h)}
                      className={`flex-1 py-1 border rounded text-[11px] capitalize transition ${
                        settings.hero_height === h
                          ? "bg-rose-50 border-rose-300 text-rose-600 font-semibold"
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      {h === "small" ? "Corta" : h === "medium" ? "Media" : "Larga"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "product" && (
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1">
              <Layout className="h-3.5 w-3.5 text-gray-500" /> Grilla del Catálogo
            </h4>

            {/* Product config choices */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Mostrar etiquetas en productos</span>
                <input
                  type="checkbox"
                  checked={settings.show_badges}
                  onChange={(e) => handleChange("show_badges", e.target.checked)}
                  className="rounded border-gray-300 text-rose-500 focus:ring-rose-400 h-4 w-4"
                />
              </div>

              <div className="space-y-1 pt-2">
                <span className="text-xs text-gray-600 block">Productos por Fila (Escritorio)</span>
                <div className="flex gap-2">
                  {([2, 3, 4] as const).map((num) => (
                    <button
                      key={num}
                      onClick={() => handleChange("products_per_row", num)}
                      className={`flex-1 py-1 px-2 border rounded text-xs transition ${
                        settings.products_per_row === num
                          ? "bg-rose-50 border-rose-300 text-rose-600 font-semibold"
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      {num} col.
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Editor footer info */}
      <div className="bg-gray-50 p-3 border-t border-gray-100 text-[10px] text-gray-400 text-center uppercase tracking-wider font-mono">
        Active Theme: Horizon v3.5.1
      </div>
    </div>
  );
}
