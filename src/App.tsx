import React, { useState } from "react";
import { ThemeFile, CustomizerSettings, CartItem, AIChatMessage, Product } from "./types";
import StorefrontPreview from "./components/StorefrontPreview";

// INITIAL DETAILED SHOPIFY LIQUID FILE MOCK DATABASE
const INITIAL_THEME_FILES: ThemeFile[] = [
  {
    path: "layout/theme.liquid",
    name: "theme.liquid",
    language: "liquid",
    content: `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="canonical" href="{{ canonical_url }}">
    <title>{{ page_title }} - Soft Glamour</title>

    {{ 'base.css' | asset_url | stylesheet_tag }}
    {% render 'meta-tags' %}
    {{ content_for_header }}
  </head>

  <body class="theme-horizon-v3">
    {% section 'announcement-bar' %}
    {% section 'header' %}

    <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
      {{ content_for_layout }}
    </main>

    {% section 'footer' %}

    <script src="{{ 'global.js' | asset_url }}" defer="defer"></script>
  </body>
</html>`
  },
  {
    path: "config/settings_data.json",
    name: "settings_data.json",
    language: "json",
    content: `{
  "current": {
    "colors_solid_button_labels": "#ffffff",
    "colors_accent_1": "#E29578",
    "colors_accent_2": "#BC6C25",
    "colors_text": "#1C1917",
    "colors_background": "#FFF9F8",
    "announcement_bar_enabled": true,
    "announcement_bar_text": "¡Envío gratis en compras mayores a $100 usd!",
    "hero_banner_title": "Soft Glamour - Colección Horizon v3.5.1",
    "hero_banner_subtitle": "Redescubre tu destello natural con cosmética de lujo duradera y joyería pulida a mano.",
    "grid_products_per_row": 3
  }
}`
  },
  {
    path: "blocks/_announcement.liquid",
    name: "_announcement.liquid",
    language: "liquid",
    content: `{% style %}
  .announcement-bar {
    background-color: {{ section.settings.announcement_bg }};
    color: {{ section.settings.announcement_color }};
  }
{% endstyle %}

{% if section.settings.show_announcement %}
  <div class="announcement-bar py-1.5 text-center text-xs tracking-wide">
    <p>{{ section.settings.text }}</p>
  </div>
{% endif %}

{% schema %}
{
  "name": "Announcement Bar",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_announcement",
      "label": "Show Announcement",
      "default": true
    },
    {
      "type": "text",
      "id": "text",
      "label": "Announcement Text",
      "default": "¡Envío gratis en compras mayores a $100 usd!"
    },
    {
      "type": "color",
      "id": "announcement_bg",
      "label": "Background Color",
      "default": "#FCD5CE"
    }
  ]
}
{% endschema %}`
  },
  {
    path: "assets/base.css",
    name: "base.css",
    language: "css",
    content: `/* Theme Horizon v3.5.1 - Soft Glamour Styling sheet */
:root {
  --font-body-family: "Georgia", Georgia, serif;
  --color-base-background: #FFF9F8;
  --color-base-text: #1C1917;
  --color-accent-1: #E29578;
  --color-accent-2: #BC6C25;
}

body {
  font-family: var(--font-body-family);
  background-color: var(--color-base-background);
  color: var(--color-base-text);
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

.product-grid {
  display: grid;
  gap: 1.5rem;
}

.button--primary {
  background-color: var(--color-base-text);
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: opacity 0.2s ease;
}

.button--primary:hover {
  opacity: 0.9;
}`
  },
  {
    path: "sections/featured-collection.liquid",
    name: "featured-collection.liquid",
    language: "liquid",
    content: `{% style %}
  .featured-collection-heading {
    color: {{ section.settings.heading_color }};
  }
{% endstyle %}

<div class="featured-collection px-6 py-10">
  <h2 className="featured-collection-heading text-center text-xl font-bold font-serif">
    {{ section.settings.title }}
  </h2>
  
  <div class="product-grid grid-cols-{{ section.settings.grid_cols }}">
    {% for product in collections[section.settings.catalog].products %}
      {% render 'product-card', product: product %}
    {% endfor %}
  </div>
</div>`
  }
];

export default function App() {
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"customizer" | "code" | "assistant">("customizer");
  const [themeFiles, setThemeFiles] = useState<ThemeFile[]>(INITIAL_THEME_FILES);
  const [activeFile, setActiveFile] = useState<ThemeFile | null>(INITIAL_THEME_FILES[0]);
  const [virtualSections, setVirtualSections] = useState<string[]>([]);
  const [showAssistant, setShowAssistant] = useState<boolean>(false);
  
  // Customizer Settings - Synced with settings_data.json
  const [settings, setSettings] = useState<CustomizerSettings>({
    background_color: "#FFF9F8",
    text_color: "#1C1917",
    accent_color_1: "#E29578",
    accent_color_2: "#BC6C25",
    button_bg_color: "#1C1917",
    button_text_color: "#FFFFFF",
    announcement_enabled: true,
    announcement_text: "¡Envío gratis de fragancias Soft Glamour por encima de $100 USD!",
    announcement_bg: "#FCD5CE",
    announcement_text_color: "#1C1917",
    header_sticky: true,
    header_logo_alignment: "left",
    header_show_search: true,
    hero_title: "Horizon 3.5.1: Soft Glamour",
    hero_subtitle: "Colección exclusiva de fragancias, labiales terciopelo y joyas de oro de 18K finamente talladas.",
    hero_button_text: "Explorar Colección",
    hero_image_blur: false,
    hero_height: "medium",
    show_badges: true,
    products_per_row: 3,
  });

  // Cart Local States for Simulated Storefront
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Model Chat States
  const [chatHistory, setChatHistory] = useState<AIChatMessage[]>([]);
  const [assistantLoading, setAssistantLoading] = useState<boolean>(false);

  // Sync settings modifications with settings_data.json
  const handleUpdateSettings = (newSettings: Partial<CustomizerSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      
      // Mirror back into the virtual settings_data.json
      setThemeFiles((oldFiles) => {
        return oldFiles.map((f) => {
          if (f.path === "config/settings_data.json") {
            try {
              const parsed = JSON.parse(f.content);
              parsed.current.colors_background = updated.background_color;
              parsed.current.colors_text = updated.text_color;
              parsed.current.colors_accent_1 = updated.accent_color_1;
              parsed.current.colors_accent_2 = updated.accent_color_2;
              parsed.current.announcement_bar_enabled = updated.announcement_enabled;
              parsed.current.announcement_bar_text = updated.announcement_text;
              parsed.current.hero_banner_title = updated.hero_title;
              parsed.current.hero_banner_subtitle = updated.hero_subtitle;
              parsed.current.grid_products_per_row = updated.products_per_row;
              return {
                ...f,
                content: JSON.stringify(parsed, null, 2),
              };
            } catch (err) {
              return f;
            }
          }
          return f;
        });
      });

      return updated;
    });
  };

  // Content modifiers for virtual file system
  const handleUpdateFileContent = (path: string, newContent: string) => {
    setThemeFiles((oldFiles) => {
      const updated = oldFiles.map((f) => {
        if (f.path === path) {
          // If we saved changes specifically to config/settings_data.json, sync back to Customizer settings variables
          if (path === "config/settings_data.json") {
            try {
              const parsed = JSON.parse(newContent);
              if (parsed.current) {
                setSettings((prev) => ({
                  ...prev,
                  background_color: parsed.current.colors_background || prev.background_color,
                  text_color: parsed.current.colors_text || prev.text_color,
                  accent_color_1: parsed.current.colors_accent_1 || prev.accent_color_1,
                  accent_color_2: parsed.current.colors_accent_2 || prev.accent_color_2,
                  announcement_enabled: parsed.current.announcement_bar_enabled !== undefined ? parsed.current.announcement_bar_enabled : prev.announcement_enabled,
                  announcement_text: parsed.current.announcement_bar_text || prev.announcement_text,
                  hero_title: parsed.current.hero_banner_title || prev.hero_title,
                  hero_subtitle: parsed.current.hero_banner_subtitle || prev.hero_subtitle,
                  products_per_row: parsed.current.grid_products_per_row || prev.products_per_row,
                }));
              }
            } catch (e) {
              console.warn("Invalid settings JSON structure saved.");
            }
          }
          return { ...f, content: newContent };
        }
        return f;
      });

      // Maintain active selected context
      const selected = updated.find((f) => f.path === activeFile?.path);
      if (selected) {
        setActiveFile(selected);
      }
      return updated;
    });
  };

  const handleResetThemeFiles = () => {
    setThemeFiles(INITIAL_THEME_FILES);
    setActiveFile(INITIAL_THEME_FILES[0]);
  };

  // Add virtual block / section from AI Generator
  const handleAddVirtualFile = (path: string, content: string) => {
    // Check if file already exists first
    setThemeFiles((prev) => {
      const filtered = prev.filter((f) => f.path !== path);
      const newFile: ThemeFile = {
        path,
        name: path.split("/").pop() || "user.liquid",
        content,
        language: path.endsWith(".liquid") ? "liquid" : "javascript",
      };
      const result = [...filtered, newFile];
      setActiveFile(newFile);
      return result;
    });

    // Auto toggle corresponding visual feature inside simulated storefront!
    if (path.includes("whatsapp")) {
      setVirtualSections((prev) => [...prev, "whatsapp-float"]);
    } else if (path.includes("testimonio") || path.includes("reviews") || path.includes("stars")) {
      setVirtualSections((prev) => [...prev, "review-carousel"]);
    }
  };

  // Interactive Cart events for simulated storefront
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const match = prev.find((item) => item.product.id === product.id);
      if (match) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleModifyCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const qty = item.quantity + delta;
            return { ...item, quantity: qty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Assistant Gemini Request triggers API POST endpoint safely
  const handleSubmitAIPrompt = async (prompt: string) => {
    setAssistantLoading(true);

    // Create immediate user message
    const userMessage: AIChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: prompt,
    };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/generate-liquid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          fileContext: activeFile?.content || "",
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo obtener respuesta del servidor de generación Liquid.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Append generative reply
      const assistantMessage: AIChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: `Aquí tienes la sección de Shopify Liquid diseñada especialmente para tu tema Horizon. Cumple con los parámetros estilizados de "Soft Glamour" y los esquemas interactivos del editor de temas de Shopify.`,
        code: {
          fileName: data.suggestedFileName || "sections/custom-banner.liquid",
          code: data.liquidCode || "",
          explanation: data.explanation || "",
        },
      };

      setChatHistory((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "assistant",
          content: `Lo siento, surgió un error al comunicarme con el motor Gemini API: ${err.message || err}`,
        },
      ]);
    } finally {
      setAssistantLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-stone-900 font-sans antialiased flex flex-col selection:bg-rose-100">
      <StorefrontPreview
        settings={settings}
        cart={cart}
        onAddToCart={handleAddToCart}
        onModifyCartQuantity={handleModifyCartQuantity}
        onClearCart={handleClearCart}
        virtualSections={virtualSections}
        onUpdateSettings={handleUpdateSettings}
        showAssistant={showAssistant}
        onToggleAssistant={() => setShowAssistant(!showAssistant)}
      />
    </div>
  );
}

