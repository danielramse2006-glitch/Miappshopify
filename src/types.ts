export interface ThemeFile {
  path: string;
  name: string;
  content: string;
  language: "liquid" | "javascript" | "json" | "css";
}

export interface CustomizerSettings {
  background_color: string;
  text_color: string;
  accent_color_1: string;
  accent_color_2: string;
  button_bg_color: string;
  button_text_color: string;
  
  // Announcement Bar
  announcement_enabled: boolean;
  announcement_text: string;
  announcement_bg: string;
  announcement_text_color: string;
  
  // Header Settings
  header_sticky: boolean;
  header_logo_alignment: "left" | "center";
  header_show_search: boolean;
  
  // Hero / Banner Section
  hero_title: string;
  hero_subtitle: string;
  hero_button_text: string;
  hero_image_blur: boolean;
  hero_height: "small" | "medium" | "large";
  
  // Product Showcase
  show_badges: boolean;
  products_per_row: 2 | 3 | 4;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  tag?: string;
  rating: number;
  reviewsCount: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AIChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  code?: {
    fileName: string;
    code: string;
    explanation: string;
  };
}
