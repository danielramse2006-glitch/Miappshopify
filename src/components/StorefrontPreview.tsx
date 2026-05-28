import React, { useState, useEffect } from "react";
import { CustomizerSettings, Product, CartItem } from "../types";
import ModaBelleLogo from "./ModaBelleLogo";
import { 
  ShoppingCart, 
  Search, 
  Star, 
  Heart, 
  X, 
  Minus, 
  Plus, 
  Check, 
  MessageSquare, 
  Sparkles, 
  Menu, 
  ShoppingBag, 
  Send,
  Play,
  HeartCrack,
  BadgeAlert,
  ChevronRight,
  Info
} from "lucide-react";

interface StorefrontPreviewProps {
  settings: CustomizerSettings;
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onModifyCartQuantity: (productId: string, delta: number) => void;
  onClearCart: () => void;
  virtualSections: string[];
  onUpdateSettings?: (newSettings: Partial<CustomizerSettings>) => void;
  showAssistant?: boolean;
  onToggleAssistant?: () => void;
}

// ModaBelle MX themed product catalog
const PRODUCT_CATALOG: Product[] = [
  {
    id: "elf-lote-10",
    title: "Lote 10 Piezas ELF | Envío Gratis Hot Sale",
    price: 1100.00,
    originalPrice: 1550.00,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
    tag: "Oferta",
    rating: 4.9,
    reviewsCount: 165,
    description: "Lote ideal para emprendedoras con 10 piezas de maquillaje variadas originales de e.l.f. Cosmetics. Incluye iluminadores líquidos Halo Glow, polvos fijadores, brochas de alta densidad y primers hidratantes para surtir tu negocio o uso personal."
  },
  {
    id: "elf-boss-gloss",
    title: "ELF Sun Boss Gloss Brillo Labial Peachy Kween",
    price: 100.00,
    originalPrice: 130.00,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=450",
    tag: "Oferta",
    rating: 4.8,
    reviewsCount: 42,
    description: "Brillo labial peachy kween con factor de protección solar SPF 25. Acabado ultra brillante, fórmula no pegajosa de alta nutrición con aroma a mantequilla de coco."
  },
  {
    id: "elf-no-budge",
    title: "ELF No Budge Retractable Eyeliner Delineador Zero Effort",
    price: 120.00,
    originalPrice: 160.00,
    image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&q=80&w=450",
    tag: "Oferta",
    rating: 4.7,
    reviewsCount: 35,
    description: "Delineador retráctil de ojos ultra cremoso, resistente al agua y de larga duración 16 horas. No se corre, ideal para la línea de agua."
  },
  {
    id: "lotes-elf-std",
    title: "Lotes ELF Original Maquillaje Surtido",
    price: 110.00,
    originalPrice: 150.00,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=450",
    tag: "Más Vendido",
    rating: 5.0,
    reviewsCount: 68,
    description: "Lote de productos e.l.f. originales para revendedoras. Piezas surtidas listas para enviar."
  },
  {
    id: "lotes-mixtos",
    title: "Lotes MIXTOS Multimarca Cosméticos",
    price: 100.00,
    originalPrice: 140.00,
    image: "https://images.unsplash.com/photo-1631730359575-38e4755d772b?auto=format&fit=crop&q=80&w=450",
    tag: "Popular",
    rating: 4.9,
    reviewsCount: 18,
    description: "Lotes de maquillaje variado multimarca (e.l.f., Maybelline, Wet n Wild, L'Oreal) ideal para reventa."
  },
  {
    id: "k-beauty-glow-kit",
    title: "Lote Kit Skincare Coreano Glow | Envío Gratis",
    price: 550.00,
    originalPrice: 780.00,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=450",
    tag: "Nuevos",
    rating: 4.9,
    reviewsCount: 38,
    description: "Kit completo de skincare y maquillaje K-Beauty. Incluye sueros de ácido hialurónico, mascarillas botánicas hidratantes, parches para colágeno de ojos y tónicos de bava de caracol de marcas icónicas."
  }
];

export default function StorefrontPreview({
  settings,
  cart,
  onAddToCart,
  onModifyCartQuantity,
  onClearCart,
  virtualSections,
  onUpdateSettings,
  showAssistant = false,
  onToggleAssistant,
}: StorefrontPreviewProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCT_CATALOG[0]); // Default to show Lote 10 Piezas ELF directly for detail showcase!
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [checkoutFinished, setCheckoutFinished] = useState<boolean>(false);
  const [customReviewText, setCustomReviewText] = useState<string>("");
  const [customReviewName, setCustomReviewName] = useState<string>("");
  const [reviewsList, setReviewsList] = useState<any[]>([
    {
      name: "Danna",
      stars: 5,
      text: "Todo esta increíble y llegan en perfecto estado!! Me encantaron todas las marcas de labiales y sombras de elf.",
      img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Pilc",
      stars: 5,
      text: "Llegó todo muy bien empacado. Hubo un retraso de un producto pero se entiende por el Hot Sale, excelente atención por WhatsApp.",
      img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Sandra G.",
      stars: 5,
      text: "Excelente lote de 10 piezas de ELF, ya lo vendí todo en mi ciudad y obtuve más del doble de ganancia. ¡Comprando el siguiente de inmediato!",
      img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=150"
    }
  ]);

  // Main featured Product qty counter
  const [mainProductQty, setMainProductQty] = useState<number>(1);

  // States for live ticking countdown timer
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 1,
    minutes: 19,
    seconds: 47,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { ...prev, seconds: 59 }; // reset cycle
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const cartTotal = cart.reduce((sums, item) => sums + item.product.price * item.quantity, 0);
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setCheckoutFinished(true);
    setTimeout(() => {
      setCheckoutFinished(false);
      onClearCart();
      setIsCartOpen(false);
    }, 2500);
  };

  const handleAddMainProductToCart = () => {
    const p = PRODUCT_CATALOG[0]; // Lote 10 Piezas ELF
    for (let i = 0; i < mainProductQty; i++) {
      onAddToCart(p);
    }
    setIsCartOpen(true);
  };

  const submitCustomReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customReviewText || !customReviewName) return;
    const newRev = {
      name: customReviewName,
      stars: 5,
      text: customReviewText,
      img: "https://images.unsplash.com/photo-1631730359575-38e4755d772b?auto=format&fit=crop&q=80&w=150"
    };
    setReviewsList([newRev, ...reviewsList]);
    setCustomReviewText("");
    setCustomReviewName("");
  };

  return (
    <div
      className="w-full min-h-screen bg-white text-stone-900 flex flex-col relative transition-all duration-300 font-sans pb-16"
    >

      {/* 2. CHIC MODABELLE MX HEADER */}
      <header className="bg-white border-b border-stone-100 px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-10 shrink-0 shadow-sm">
        {/* Left: Hamburger menu toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-stone-900 p-1 hover:bg-stone-50 rounded-lg transition" 
            title="Menu"
          >
            <Menu className="h-6 w-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Center: ModaBelle Brand elegant logo */}
        <div className="text-center py-1">
          <a href="#hero" className="inline-block group focus:outline-none">
            <ModaBelleLogo showMonogram={false} orientation="vertical" />
          </a>
        </div>

        {/* Right: Search and Cart actions */}
        <div className="flex items-center gap-5">
          <button className="text-stone-900 p-1 hover:bg-stone-50 rounded-lg transition" title="Buscar productos">
            <Search className="h-5.5 w-5.5 stroke-[1.5]" />
          </button>

          {/* Cart Bag with counter */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1 text-stone-900 hover:text-rose-600 transition tracking-tight font-medium"
            title="Carrito de compras"
          >
            <ShoppingBag className="h-5.5 w-5.5 stroke-[1.5]" />
            <span className="text-xs font-bold bg-stone-100 px-1.5 py-0.5 rounded-full font-mono">
              ({itemsCount})
            </span>
          </button>
        </div>
      </header>

      {/* Main Canvas content */}
      <div className="flex-1 pb-24" id="modabelle-mx-viewport">
        {/* 3. COZY HERO PRESENTATION BANNER */}
        <div id="hero" className="bg-[#FAF6F6] py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-stone-100">
          <div className="max-w-md space-y-4 md:pl-6 text-center md:text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#DC9C9B] bg-rose-50 px-2.5 py-1 rounded inline-block">
              Mayoreo Altamente Rentable
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-syne tracking-tight text-stone-950 leading-tight">
              Descubre precios de maquillaje bajos
            </h2>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-light">
              Muchos otros productos a mayoreo que te harán ganar dinero muy rápido, todo original y con envío express de inmediato.
            </p>
            <div className="pt-2">
              <a
                href="#catalog-featured"
                className="inline-block bg-black text-white hover:bg-[#DC9C9B] text-[11px] font-bold tracking-widest uppercase px-6 py-3 rounded-md transition duration-300"
              >
                Comprar en Oferta
              </a>
            </div>
          </div>

          {/* Elegant Floating mock graphic with beautiful card deck layout */}
          <div className="relative w-full max-w-sm md:max-w-md aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-[#FAF0ED] p-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#DC9C9B_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.12]" />
            
            {/* Composited Polaroid-style Card Deck */}
            <div className="relative w-full h-full flex items-center justify-center gap-6 z-10">
              {/* Lotes ELF card */}
              <div className="w-[45%] bg-white rounded-3xl shadow-xl shadow-stone-200/30 p-3 pt-3 pb-5 flex flex-col justify-between transform -rotate-6 hover:rotate-0 hover:scale-102 transition-all duration-300 border border-stone-100 select-none">
                <div className="aspect-square w-full rounded-2xl overflow-hidden bg-stone-50">
                  <img
                    src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=350"
                    alt="Lotes ELF"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center pt-3">
                  <span className="text-[9px] font-extrabold text-[#DC9C9B] uppercase tracking-widest block font-sans">
                    Lotes ELF
                  </span>
                </div>
              </div>

              {/* Lotes Coreanos card */}
              <div className="w-[45%] bg-white rounded-3xl shadow-xl shadow-stone-200/30 p-3 pt-3 pb-5 flex flex-col justify-between transform rotate-6 hover:rotate-0 hover:scale-102 transition-all duration-300 border border-stone-100 select-none">
                <div className="aspect-square w-full rounded-2xl overflow-hidden bg-stone-50">
                  <img
                    src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=350"
                    alt="Lotes Coreanos"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center pt-3">
                  <span className="text-[9px] font-extrabold text-[#DC9C9B] uppercase tracking-widest block font-sans">
                    Lotes Coreanos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. VISUAL BUBBLES CATEGORIES SCROLL */}
        <div className="py-6 border-b border-stone-100 px-4 md:px-8 bg-white overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-center gap-6 md:gap-12 min-w-[500px] py-1">
            <a href="#productos-similares" className="group flex items-center gap-3 bg-stone-50 hover:bg-[#FAF4F4] px-4 py-2.5 rounded-full border border-stone-150 transition">
              <span className="h-8 w-8 rounded-full bg-[#DC9C9B]/20 font-bold text-[10px] text-stone-800 flex items-center justify-center group-hover:scale-110 transition">❀</span>
              <span className="text-[11px] font-bold tracking-wider text-stone-800 uppercase">MÁS VENDIDOS &gt;</span>
            </a>

            <a href="#productos-similares" className="group flex items-center gap-3 bg-stone-50 hover:bg-[#FAF4F4] px-4 py-2.5 rounded-full border border-stone-150 transition border-rose-100">
              <span className="h-8 w-8 rounded-full bg-[#DC9C9B]/20 font-bold text-[11px] text-stone-850 flex items-center justify-center group-hover:scale-110 transition">🧴</span>
              <span className="text-[11px] font-bold tracking-wider text-stone-800 uppercase">LOTES COREANOS &gt;</span>
            </a>

            <a href="#productos-similares" className="group flex items-center gap-3 bg-stone-50 hover:bg-[#FAF4F4] px-4 py-2.5 rounded-full border border-stone-150 transition">
              <span className="h-8 w-8 rounded-full bg-[#DC9C9B]/20 font-bold text-[11px] text-stone-850 flex items-center justify-center group-hover:scale-110 transition">✦</span>
              <span className="text-[11px] font-bold tracking-wider text-stone-800 uppercase">NOVEDADES &gt;</span>
            </a>
          </div>
        </div>

        {/* 5. BRAND LOGOS SECTION */}
        <div className="py-8 bg-white border-b border-stone-100 text-center space-y-4">
          <h3 className="text-xs font-bold tracking-widest text-stone-400 uppercase font-sans">
            COMPRA POR MARCA
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-70 px-4 max-w-4xl mx-auto">
            <span className="text-sm font-black tracking-widest font-serif text-stone-900 hover:opacity-100 transition">SEPHORA</span>
            <span className="text-xs font-bold tracking-normal font-sans italic text-stone-900 border-stone-800 border-b hover:opacity-100 transition">stila cosmetics</span>
            <span className="text-sm font-semibold tracking-wide font-mono text-stone-900 hover:opacity-100 transition">pıxı</span>
            <span className="text-xs font-black tracking-[0.2em] font-sans text-stone-900 hover:opacity-100 transition">L'ORÉAL</span>
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-stone-800 hover:opacity-100 transition">KYLIE COSMETICS</span>
            <span className="text-[11px] font-black tracking-wider text-stone-900 hover:opacity-100 transition">NYX</span>
          </div>
        </div>

        {/* 6. IMMERSIVE COMPREHENSIVE PRODUCT PAGE PORTION (LOTE 10 PIEZAS ELF) */}
        <section id="catalog-featured" className="px-6 py-12 max-w-6xl mx-auto border-b border-stone-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Portion: Master Cosmetico Bundle display image widget with zoom badge */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-50 border border-stone-150 group">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=720"
                  alt="Lote 10 Piezas ELF cosméticos"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 referrer-policy='no-referrer'"
                />
                <span className="absolute top-4 left-4 bg-[#DC9C9B] text-white font-bold text-[10px] px-3 py-1 rounded uppercase tracking-wider shadow-sm">
                  Oferta
                </span>
                <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/95 border border-stone-200 flex items-center justify-center text-stone-600 shadow-md">
                  <Search className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Right Portion: Main Product information panel */}
            <div className="lg:col-span-6 space-y-6 text-stone-900">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-extrabold font-sans text-stone-950 tracking-tight leading-loose">
                  Lote 10 Piezas ELF | Envío Gratis Hot Sale
                </h2>
                
                <div className="flex items-center gap-1.5 flex-wrap">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />)}
                  </div>
                  <span className="text-xs text-stone-500 font-bold font-mono">5.0 (165 referencias reales)</span>
                </div>

                <div className="pt-2 flex items-baseline gap-3">
                  <span className="text-2xl font-extrabold text-stone-950 font-sans">
                    $ 1,100.00 MXN
                  </span>
                  <span className="text-sm font-light text-stone-400 line-through">
                    $ 1,550.00 MXN
                  </span>
                </div>
              </div>

              {/* Counter and Cart Addition */}
              <div className="space-y-3.5 pt-4 border-t border-stone-100">
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">
                  Cantidad a comprar
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  {/* Rounded Counter Stepper */}
                  <div className="flex items-center gap-3 border border-stone-300 rounded-full bg-white px-4 py-2 font-mono h-11">
                    <button
                      onClick={() => setMainProductQty(Math.max(1, mainProductQty - 1))}
                      className="text-stone-500 p-1 hover:text-stone-900 transition"
                      title="reducir"
                    >
                      <Minus className="h-3.5 w-3.5 stroke-[2.5]" />
                    </button>
                    <span className="text-xs font-bold px-3 select-none text-stone-900">{mainProductQty}</span>
                    <button
                      onClick={() => setMainProductQty(mainProductQty + 1)}
                      className="text-stone-500 p-1 hover:text-stone-900 transition"
                      title="aumentar"
                    >
                      <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Add to checkout Button styled as circular pill layout */}
                  <button
                    onClick={handleAddMainProductToCart}
                    className="flex-1 bg-black text-white hover:bg-[#DC9C9B] transition py-3 rounded-full text-xs font-bold tracking-widest uppercase shadow-md active:scale-95 h-11"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>

              {/* Bullet Features Lists */}
              <div className="bg-[#FAF6F6] rounded-xl p-5 border border-stone-100 space-y-3">
                <p className="text-xs font-extrabold text-stone-850 uppercase tracking-wider">
                  Características Principales del Lote de Maquillaje e.l.f. 10 Piezas:
                </p>
                <ul className="text-xs text-stone-700 space-y-2.5 font-light leading-relaxed pl-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[#DC9C9B] font-bold mt-0.5">•</span>
                    <span><strong>Lote de 10 piezas originales:</strong> incluye cosméticos variados de alta rotación para surtir tu negocio o complementar tu colección.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#DC9C9B] font-bold mt-0.5">•</span>
                    <span><strong>Productos variados originales:</strong> puede incluir labiales ultra cremosos, primers hidratantes, rubores halo, iluminadores, bases líquidas y correctores en tonos listos para usar de la marca e.l.f. Cosmetics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#DC9C9B] font-bold mt-0.5">•</span>
                    <span><strong>Marca popular de alta rotación:</strong> e.l.f. es la marca número uno en maquillaje accesible de alta fidelidad, de excelente calidad y muy demandado en redes sociales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#DC9C9B] font-bold mt-0.5">•</span>
                    <span><strong>Ideal para revender y generar ingresos:</strong> perfecto para bazares locales, tiendas de belleza físicas, o ventas digitales en plataformas de redes sociales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#DC9C9B] font-bold mt-0.5">•</span>
                    <span><strong>Promoción express en Hot Sale:</strong> disfruta envío rápido express y asistencia post venta directa por canal WhatsApp.</span>
                  </li>
                </ul>
              </div>

              {/* Default empty opinions disclaimer */}
              <div className="border-t border-stone-100 pt-4 space-y-3">
                <p className="text-xs text-stone-500 italic">
                  Todavía no hay opiniones de este lote individual aquí. Sé el primero en añadir una opinión usando el formulario de testimonios abajo.
                </p>
                <a
                  href="#write-reference-form"
                  className="inline-block bg-black text-white hover:bg-stone-800 text-[10px] font-bold tracking-widest uppercase px-4 py-2 mt-1 rounded"
                >
                  Escribe una opinión
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* 7. PRODUCTOS SIMILARES / LO MAS VENDIDO CARDS */}
        <section id="productos-similares" className="px-6 py-12 max-w-6xl mx-auto space-y-8">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-sm font-bold tracking-widest text-[#DC9C9B] uppercase">
              RECOMENDADO
            </h3>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-stone-950 uppercase font-sans">
              PRODUCTOS SIMILARES / LO MÁS VENDIDO
            </h2>
            <div className="w-16 h-0.5 bg-[#DC9C9B] mt-1.5 mx-auto md:mx-0" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {PRODUCT_CATALOG.slice(1).map((p) => (
              <div
                key={p.id}
                className="bg-white border border-stone-150 rounded-xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image and Offer tag */}
                <div className="relative aspect-square overflow-hidden bg-stone-50 shrink-0">
                  <img
                    src={p.image}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {p.tag && (
                    <span className="absolute top-2 left-2 text-[8px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded shadow-xs bg-[#DC9C9B] text-white">
                      {p.tag}
                    </span>
                  )}
                </div>

                {/* Info block */}
                <div className="p-3 flex-1 flex flex-col justify-between text-stone-900 space-y-2">
                  <div className="space-y-1">
                    <h4 className="text-[11px] font-semibold text-stone-850 leading-tight group-hover:text-[#DC9C9B] transition line-clamp-2">
                      {p.title}
                    </h4>
                    
                    <div className="flex items-center gap-0.5 text-[#DC9C9B]">
                      <Star className="h-2.5 w-2.5 fill-current text-yellow-400" />
                      <span className="text-[8px] font-bold text-stone-400 font-mono">({p.reviewsCount})</span>
                    </div>
                  </div>

                  <div className="pt-1.5 space-y-2">
                    <div className="flex flex-col">
                      {p.originalPrice && (
                        <span className="text-[9px] text-stone-400 line-through font-light">
                          ${p.originalPrice.toFixed(2)} MXN
                        </span>
                      )}
                      <span className="text-[11px] font-extrabold text-stone-900 font-sans">
                        A partir de ${p.price.toFixed(2)} MXN
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(p)}
                      className="w-full py-1.5 rounded text-[9px] uppercase tracking-wider font-extrabold border border-stone-950 bg-white hover:bg-black hover:text-white text-stone-950 transition-colors duration-200"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. TIKTOK SOCIAL REELS COLLAGE */}
        <section className="bg-[#FAF6F6] border-y border-stone-150/60 py-12 px-6">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-1">
              <span className="text-4xl md:text-5xl font-black text-[#DC9C9B] block font-syne leading-none">
                180K
              </span>
              <p className="text-xs font-bold text-stone-700 uppercase tracking-widest">
                Seguidores en TikTok <span className="underline select-all">@modabelle.mx</span>
              </p>
              <div className="w-10 h-0.5 bg-stone-300 mx-auto mt-2" />
            </div>

            {/* Simulated TikTok Videos Collage Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              
              <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-md group flex flex-col justify-between">
                <div className="relative aspect-[3/4] bg-stone-950 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=350"
                    alt="Packaging TikTok Cosmetic video"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/10 transition">
                    <span className="h-12 w-12 rounded-full bg-white/95 text-stone-950 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition duration-300">
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </span>
                  </div>
                  <span className="absolute bottom-3 left-3 bg-red-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded">
                    LIVE REEL
                  </span>
                </div>
                <div className="p-3.5 space-y-1 bg-white">
                  <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Lote de Maquillaje Por $500 pesos</p>
                  <p className="text-xs text-[#DC9C9B] font-mono leading-relaxed line-clamp-1">
                    #maquillajemayoreo #mayoristas #negocios #emprendimiento
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-md group flex flex-col justify-between">
                <div className="relative aspect-[3/4] bg-stone-950 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=350"
                    alt="ELF Cosmetics TikTok"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/10 transition">
                    <span className="h-12 w-12 rounded-full bg-white/95 text-stone-950 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition duration-300">
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </span>
                  </div>
                  <span className="absolute bottom-3 left-3 bg-[#DC9C9B] text-stone-950 font-mono text-[9px] font-bold px-2 py-0.5 rounded">
                    @MODABELLE.MX
                  </span>
                </div>
                <div className="p-3.5 space-y-1 bg-white">
                  <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Cómo ganar 100 mil pesos a los 20 años</p>
                  <p className="text-xs text-[#DC9C9B] font-mono leading-relaxed line-clamp-1">
                    #mayoreomexico #emprendimiento #cosmeticos #elf
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-md group flex flex-col justify-between">
                <div className="relative aspect-[3/4] bg-stone-950 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=350"
                    alt="Packaging box tiktok"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/10 transition">
                    <span className="h-12 w-12 rounded-full bg-white/95 text-stone-950 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition duration-300">
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </span>
                  </div>
                  <span className="absolute bottom-3 left-3 bg-stone-900 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded">
                    MAYOREO
                  </span>
                </div>
                <div className="p-3.5 space-y-1 bg-white">
                  <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Empaca un lote de 10 piezas de ELF con nosotros</p>
                  <p className="text-xs text-[#DC9C9B] font-mono leading-relaxed line-clamp-1">
                    #maquillaje #elfcosmetics #distribuidores #lotes
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 9. REAL REVIEWS AND REFERENCES SECTION ("REFERENCIAS") */}
        <section id="referencias" className="px-6 py-12 max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#DC9C9B] bg-rose-50 px-3 py-1 rounded inline-block">
              Testimonios Reales
            </span>
            <h3 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight font-sans">
              REFERENCIAS DE CLIENTES
            </h3>
            <p className="text-xs text-stone-550 max-w-md mx-auto italic font-light">
              Nuestras compradoras comparten fotos reales de sus paquetes de cosméticos recién desempaquetados.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviewsList.map((rev, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-md space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 italic leading-relaxed font-light">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2.5 border-t border-stone-100">
                  <img
                    src={rev.img}
                    alt={rev.name}
                    className="w-10 h-10 object-cover rounded-full border border-stone-200"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-850">{rev.name}</p>
                    <p className="text-[9px] text-[#DC9C9B] font-semibold tracking-wide uppercase">Compradora Mayorista</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ADD REVIEW ACTION OPINION FORM */}
          <div id="write-reference-form" className="bg-stone-50 rounded-2xl border border-stone-200 p-6 max-w-xl mx-auto space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[#DC9C9B]" /> ¿Quieres añadir tu opinión?
            </h4>
            <form onSubmit={submitCustomReview} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">Tu Nombre</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Sofia Gomez"
                    value={customReviewName}
                    onChange={(e) => setCustomReviewName(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">Calificación</label>
                  <select className="w-full bg-white border border-stone-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-stone-800">
                    <option>⭐⭐⭐⭐⭐ (Excelente)</option>
                    <option>⭐⭐⭐⭐ (Muy Bueno)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">Comentarios de tu pedido</label>
                <textarea
                  required
                  placeholder="Escribe lo que opinas del lote que recibiste, tiempos de envío o atención..."
                  value={customReviewText}
                  onChange={(e) => setCustomReviewText(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded p-3 text-xs focus:outline-none focus:border-stone-800 resize-none h-20"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black hover:bg-stone-800 text-white font-extrabold text-[10px] uppercase tracking-wider py-2 rounded transition-colors duration-200"
              >
                Enviar mi opinión original
              </button>
            </form>
          </div>
        </section>

        {/* 10. NEWSLETTER AND DETAILED MODABELLE MX FOOTER */}
        <footer className="bg-[#FAF6F6] text-stone-800 pt-12 pb-20 border-t border-stone-200/60 font-sans">
          
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 text-center md:text-left">
            
            {/* Newsletter form section */}
            <div className="md:col-span-6 space-y-4">
              <h4 className="text-xs font-bold tracking-widest text-stone-500 uppercase">
                SUSCRÍBETE PARA RECIBIR CORREOS ELECTRÓNICOS DE MODABELLE MX
              </h4>
              <p className="text-[11px] text-stone-500 font-light max-w-sm">
                Recibe notificaciones inmediatas de nuevos arribos de lotes e.l.f. Cosmetics de mayoreo y promociones Hot Sale exclusivas.
              </p>
              
              <div className="flex max-w-xs mx-auto md:mx-0 border border-stone-300 rounded-md bg-white overflow-hidden">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 bg-transparent px-3 py-2 text-xs focus:outline-none placeholder-stone-400 min-w-0"
                  readOnly
                />
                <button className="bg-black hover:bg-[#DC9C9B] text-white px-4 transition flex items-center justify-center border-l border-stone-300">
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <p className="text-[10px] text-stone-400 font-light">
                ¿Necesitas ayuda? <a href="https://wa.me/3000" target="_blank" rel="noreferrer" className="underline hover:text-stone-900">Ponte en contacto</a>
              </p>
            </div>

            {/* Link directories */}
            <div className="md:col-span-3 space-y-3.5">
              <h4 className="text-[10px] font-bold tracking-widest text-[#DC9C9B] uppercase">SERVICIO AL CLIENTE</h4>
              <ul className="text-xs space-y-2 font-medium text-stone-600">
                <li><a href="#hero" className="hover:text-stone-900">Contáctanos</a></li>
                <li><a href="#referencias" className="hover:text-stone-900">Referencias de Envíos</a></li>
                <li><a href="#hero" className="hover:text-stone-900">Guía de Mayoreo</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3.5">
              <h4 className="text-[10px] font-bold tracking-widest text-[#DC9C9B] uppercase">INFORMACIÓN</h4>
              <ul className="text-xs space-y-2 font-medium text-stone-600">
                <li><a href="#catalog-featured" className="hover:text-stone-900">Lote Recién Llegado e.l.f.</a></li>
                <li><a href="#referencias" className="hover:text-stone-900">Políticas de Devolución</a></li>
                <li><a href="#hero" className="hover:text-stone-900">Preguntas Frecuentes</a></li>
              </ul>
            </div>

          </div>

          <div className="max-w-md mx-auto pt-10 text-center space-y-5 flex flex-col items-center">
            <ModaBelleLogo showMonogram={true} monogramSize="md" orientation="vertical" />
            <p className="text-[9px] text-stone-400 font-mono tracking-wider max-w-xs mx-auto pt-2">
              © 2026 ModaBelle MX. Todos los derechos reservados. Distribuidor certificado de cosméticos originales para emprendedores.
            </p>
          </div>

        </footer>

      </div>

      {/* 4. CHIC WHATSAPP FLOATING WIDGET - green pulsing widget in bottom right */}
      <div className="fixed bottom-24 right-6 z-40">
        <a
          href="https://wa.me/3000"
          target="_blank"
          rel="noreferrer"
          className="h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl transition-all duration-300 scale-95 hover:scale-105 active:scale-90 animate-bounce relative"
          title="Chat WhatsApp Directo"
        >
          {/* WhatsApp handset custom icon rendering */}
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current text-white">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.161.001 6.132 1.233 8.371 3.474 2.239 2.24 3.471 5.211 3.47 8.375-.004 6.537-5.328 11.86-11.859 11.86-2.007-.001-3.98-.513-5.733-1.489L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.35-.002 9.707-4.359 9.71-9.708.002-2.592-1.007-5.029-2.842-6.865-1.837-1.836-4.275-2.845-6.864-2.847-5.352 0-9.709 4.357-9.712 9.709-.001 1.635.488 3.227 1.414 4.619l-.961 3.513 3.53-.924zm11.362-3.51c-.268-.134-1.585-.783-1.831-.873-.247-.089-.427-.134-.607.134-.18.268-.697.873-.853 1.05-.157.177-.313.197-.581.063-.268-.134-1.13-.417-2.153-1.331-.794-.709-1.331-1.585-1.487-1.853-.157-.268-.017-.413.118-.546.12-.12.268-.313.402-.47.135-.156.179-.268.268-.446.09-.178.045-.335-.022-.47-.067-.134-.607-1.463-.83-2.003-.218-.523-.459-.452-.63-.46-.153-.008-.33-.01-.508-.01-.179 0-.47.067-.716.335-.247.268-.94.92-1.01 2.254-.069 1.332.9 2.62 1.01 2.776.113.156 1.772 2.706 4.301 3.801.602.26 1.07.417 1.436.533.605.19 1.156.163 1.593.098.487-.072 1.586-.648 1.81-.1274-.224.625-.224 1.159-.224 1.25s-.134.268-.402.402z" />
          </svg>
          {/* Small notification counter to make it extremely interactive */}
          <span className="absolute top-0 right-0 h-4.5 w-4.5 rounded-full bg-red-600 text-white font-extrabold text-[9px] flex items-center justify-center border-2 border-white">
            1
          </span>
        </a>
      </div>

      {/* 11. COUNTDOWN BAR - STICKY BANNER AT THE BOTTOM OF PORT */}
      <div className="fixed bottom-0 inset-x-0 bg-[#DC9C9B] text-stone-950 px-4 md:px-8 py-3.5 flex items-center justify-between z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.15)] flex-wrap gap-2 shrink-0 select-none border-t border-stone-200/80">
        <div className="flex items-center gap-2 font-syne font-extrabold text-xs md:text-sm uppercase tracking-wider">
          <BadgeAlert className="h-4.5 w-4.5 animate-pulse text-stone-950 shrink-0" />
          <span>HOT SALE ENVIÓ GRATIS</span>
        </div>

        {/* Live counter ticking slots */}
        <div className="flex items-center gap-2.5 font-mono text-xs md:text-sm font-black">
          <span className="text-[10px] font-sans font-light text-stone-800 uppercase tracking-wide">Termina en:</span>
          
          <div className="flex items-center gap-1 bg-stone-950/95 text-[#DC9C9B] px-1.5 py-1 rounded shadow-xs">
            <span>{String(timeRemaining.days).padStart(2, "0")}</span>
            <span className="text-[8px] font-sans font-normal text-stone-400">dias</span>
          </div>
          <span className="text-stone-950 font-bold">:</span>

          <div className="flex items-center gap-1 bg-stone-950/95 text-[#DC9C9B] px-1.5 py-1 rounded shadow-xs">
            <span>{String(timeRemaining.hours).padStart(2, "0")}</span>
            <span className="text-[8px] font-sans font-normal text-stone-400">horas</span>
          </div>
          <span className="text-stone-950 font-bold">:</span>

          <div className="flex items-center gap-1 bg-stone-950/95 text-[#DC9C9B] px-1.5 py-1 rounded shadow-xs">
            <span>{String(timeRemaining.minutes).padStart(2, "0")}</span>
            <span className="text-[8px] font-sans font-normal text-stone-400">minutos</span>
          </div>
          <span className="text-stone-950 font-bold">:</span>

          <div className="flex items-center gap-1 bg-stone-950/95 text-[#DC9C9B] px-1.5 py-1 rounded shadow-xs w-11 md:w-12 justify-center">
            <span>{String(timeRemaining.seconds).padStart(2, "0")}</span>
            <span className="text-[8px] font-sans font-normal text-stone-400">seg</span>
          </div>
        </div>

        <button
          onClick={() => {
            handleAddMainProductToCart();
          }}
          className="bg-black text-white hover:bg-stone-800 transition px-5 py-2.5 rounded text-xs tracking-wider uppercase font-extrabold shadow-sm hover:scale-105 active:scale-95 leading-none"
        >
          Comprar
        </button>
      </div>

      {/* 12. SIDE CART SLIDE OUT DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-stone-950/60 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl relative text-stone-900 border-l border-stone-200">
            <div className="p-4 border-b border-stone-150 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-1.5">
                <ShoppingCart className="h-4.5 w-4.5 text-stone-950" />
                <span className="font-extrabold text-xs uppercase tracking-wider font-syne">Tu Carrito ({itemsCount})</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded hover:bg-stone-200 text-stone-500 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Cart body items list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {checkoutFinished ? (
                <div className="h-full flex flex-col items-center justify-center p-4 text-center space-y-2">
                  <Check className="h-12 w-12 text-emerald-500 bg-emerald-50 p-2.5 rounded-full mb-1 animate-ping" />
                  <p className="text-xs font-bold text-stone-950 uppercase tracking-widest font-syne">Procesando Pago...</p>
                  <p className="text-[11px] text-stone-500 leading-relaxed">¡Checkout ficticio exitoso! Gracias por comprar en ModaBelle MX.</p>
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-stone-400 p-4 space-y-2">
                  <ShoppingCart className="h-10 w-10 text-stone-200 mb-1" />
                  <p className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">El carrito está vacío</p>
                  <p className="text-[10px] text-stone-500 leading-relaxed">¿Qué tal si agregas un lote de maquillaje ELF hoy?</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between items-center gap-3 p-3 border border-stone-200 rounded-xl bg-stone-50/50 hover:bg-stone-50 transition"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover rounded-lg border border-stone-200"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-bold text-stone-900 leading-tight truncate">{item.product.title}</h4>
                      <p className="text-[10px] text-stone-500 font-extrabold mt-0.5">${item.product.price.toFixed(2)} MXN</p>
                    </div>

                    <div className="flex items-center gap-1.5 border border-stone-300 bg-white rounded-md px-2 py-1 font-mono">
                      <button
                        onClick={() => onModifyCartQuantity(item.product.id, -1)}
                        className="text-stone-500 p-0.5 hover:bg-stone-50 rounded"
                        title="es"
                      >
                        <Minus className="h-2.5 w-2.5 stroke-[3]" />
                      </button>
                      <span className="text-[10px] font-extrabold px-1 text-stone-950">{item.quantity}</span>
                      <button
                        onClick={() => onModifyCartQuantity(item.product.id, 1)}
                        className="text-stone-500 p-0.5 hover:bg-stone-50 rounded"
                        title="mas"
                      >
                        <Plus className="h-2.5 w-2.5 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total and Checkout actions */}
            {!checkoutFinished && cart.length > 0 && (
              <div className="p-4 bg-[#FAF6F6] border-t border-stone-200 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase font-bold text-stone-500">Subtotal a pagar:</span>
                  <span className="text-sm font-extrabold text-[#1C1917]">${cartTotal.toFixed(2)} MXN</span>
                </div>

                <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-100 text-[10px] text-emerald-800 flex gap-2">
                  <Info className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Tu pedido califica para <strong>Envío Gratis Express</strong> del Hot Sale.</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white hover:bg-[#DC9C9B] transition py-3 rounded-full text-xs uppercase tracking-widest font-extrabold shadow-md active:scale-98"
                >
                  Proceder al Pago
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 13. LEFT CATALOGO NAVIGATION DRAWER */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-stone-950/60 z-50 flex justify-start animate-fade-in">
          <div className="bg-white w-full max-w-[480px] h-full flex flex-col shadow-2xl relative text-stone-900 overflow-y-auto">
            {/* Header portion */}
            <div className="px-4 md:px-8 py-4 flex items-center justify-between border-b border-stone-100 sticky top-0 bg-white z-10 shrink-0">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-stone-900 p-1 hover:bg-stone-50 rounded-lg transition"
                title="Cerrar"
              >
                <X className="h-6 w-6 stroke-[1.5]" />
              </button>

              <div className="flex items-center transform scale-90 md:scale-100 origin-center">
                <ModaBelleLogo showMonogram={false} orientation="vertical" />
              </div>

              <div className="flex items-center gap-4">
                <button className="text-stone-900 p-1 hover:bg-stone-50 rounded-lg transition" title="Buscar">
                  <Search className="h-5.5 w-5.5 stroke-[1.5]" />
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="flex items-center gap-1 text-stone-900 hover:text-rose-600 transition"
                  title="Carrito"
                >
                  <ShoppingBag className="h-5.5 w-5.5 stroke-[1.5]" />
                  <span className="text-xs font-bold font-mono">({itemsCount})</span>
                </button>
              </div>
            </div>

            {/* Drawer Body - Catalogo content */}
            <div className="p-6 md:p-8 space-y-6">
              
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="text-lg font-bold tracking-tight text-stone-950">Catalogo</h3>
                <span className="text-stone-600 font-bold">—</span>
              </div>

              {/* 4 Beautiful category buttons matching screenshot layout perfectly */}
              <div className="grid grid-cols-1 gap-4">
                
                {/* Categoría: Maquillaje */}
                <a 
                  href="#productos-similares" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-6 bg-[#F6F6F6] hover:bg-[#FAF6F6] p-4 rounded-2xl transition duration-200 group border border-transparent hover:border-[#DC9C9B]/20"
                >
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shadow-xs flex items-center justify-center p-2.5 shrink-0 border border-stone-100">
                    <img 
                      src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=150" 
                      alt="Maquillaje"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain group-hover:scale-105 transition"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-stone-900 tracking-tight">Maquillaje</h4>
                  </div>
                </a>

                {/* Categoría: Lotes */}
                <a 
                  href="#catalog-featured" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-6 bg-[#F6F6F6] hover:bg-[#FAF6F6] p-4 rounded-2xl transition duration-200 group border border-transparent hover:border-[#DC9C9B]/20"
                >
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shadow-xs flex items-center justify-center p-2.5 shrink-0 border border-stone-100">
                    <img 
                      src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=150" 
                      alt="Lotes" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain group-hover:scale-105 transition"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-stone-900 tracking-tight">Lotes</h4>
                  </div>
                </a>

                {/* Categoría: Ropa Mayoreo */}
                <a 
                  href="#hero" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-6 bg-[#F6F6F6] hover:bg-[#FAF6F6] p-4 rounded-2xl transition duration-200 group border border-transparent hover:border-[#DC9C9B]/20"
                >
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shadow-xs flex items-center justify-center p-2.5 shrink-0 border border-stone-100">
                    <img 
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=150" 
                      alt="Ropa Mayoreo" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded group-hover:scale-105 transition"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-stone-900 tracking-tight">Ropa Mayoreo</h4>
                  </div>
                </a>

                {/* Categoría: Skincare Coreano */}
                <a 
                  href="#productos-similares" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-6 bg-[#F6F6F6] hover:bg-[#FAF6F6] p-4 rounded-2xl transition duration-200 group border border-transparent hover:border-[#DC9C9B]/20"
                >
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shadow-xs flex items-center justify-center p-2.5 shrink-0 border border-stone-100">
                    <img 
                      src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=150" 
                      alt="Skincare Coreano" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain group-hover:scale-105 transition"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-stone-900 tracking-tight">Skincare Coreano</h4>
                  </div>
                </a>

              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
