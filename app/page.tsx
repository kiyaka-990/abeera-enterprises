"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  { bg: "/images/hero2.jpeg", tag: "Building Construction", title: "BUILDING", accent: "KENYA'S", sub: "FUTURE", desc: "From residential homes to commercial complexes — built with precision and pride." },
  { bg: "/images/hero3.jpg", tag: "Building Construction", title: "RAISING", accent: "BOLD", sub: "STRUCTURES", desc: "From residential homes to commercial complexes — built with precision and pride." },
  { bg: "/images/hero4.jpg", tag: "Water Works", title: "BRINGING", accent: "WATER", sub: "TO LIFE", desc: "Boreholes, dams, water pans and pipelines transforming arid communities." },
  { bg: "/images/hero5.jpg", tag: "Road Works", title: "BUILDING", accent: "KENYA'S", sub: "ROADS", desc: "World-class highway and rural road construction across Kenya's most challenging terrains." },
];

const SERVICES = [
  { id: "roads", icon: "🛣️", title: "Roads Construction", short: "Highway & rural road solutions", color: "#C8102E", description: "We deliver world-class road construction and rehabilitation services across Kenya. From major highway projects to rural murram roads and urban tarmacking, our experienced teams ensure durable, safe road infrastructure.", features: ["Highway Construction", "Road Rehabilitation", "Murram Roads", "Tarmacking & Paving", "Bridges & Culverts", "Drainage Systems", "Road Maintenance"], image: "/images/hero5.jpg" },
  { id: "building", icon: "🏗️", title: "Building Construction", short: "Residential & commercial builds", color: "#8B0000", description: "From single-family homes to large commercial complexes, Abeera Enterprises delivers construction excellence. We handle design-build projects, renovations, and specialised government infrastructure.", features: ["Residential Housing", "Commercial Buildings", "Office Complexes", "Schools & Hospitals", "Warehouses", "Government Facilities", "Renovations & Fit-outs"], image: "/images/hero2.jpeg" },
  { id: "water", icon: "💧", title: "Water Works", short: "Dams, boreholes & pipelines", color: "#1a5276", description: "Providing life-giving water infrastructure across Kenya's arid and semi-arid regions. Our water works division specialises in borehole drilling, water pan construction, dam projects, and complete pipeline systems.", features: ["Borehole Drilling", "Water Pans & Dams", "Pipeline Systems", "Water Treatment Plants", "Irrigation Schemes", "Storage Tanks", "Community Water Supply"], image: "/images/service2.jpg" },
  { id: "mechanical", icon: "⚙️", title: "Mechanical Works", short: "Industrial & plant engineering", color: "#4a235a", description: "Expert mechanical engineering services for industrial, commercial, and government projects. We install, commission, and maintain complex mechanical systems ensuring peak performance and reliability.", features: ["Plant Installation", "Pumping Systems", "HVAC Systems", "Industrial Machinery", "Generator Installation", "Maintenance Contracts", "Equipment Repair"], image: "/images/service4.jpg" },
  { id: "electrical", icon: "⚡", title: "Electrical Works", short: "Power systems & solar solutions", color: "#784212", description: "Comprehensive electrical engineering solutions from grid connections to solar installations. Our certified electricians handle everything from domestic wiring to industrial substations.", features: ["Power Installations", "Solar PV Systems", "Street Lighting", "Industrial Wiring", "Transformers & Substations", "Backup Power Systems", "Smart Building Tech"], image: "/images/service6.jpg" },
];

const PROJECTS = [
  { title: "Mandera County Road Rehabilitation", category: "Roads", year: "2024", value: "KES 45M", image: "/images/road.jpg", desc: "30km road rehabilitation with drainage improvements in Mandera County" },
  { title: "Community Water Borehole Project", category: "Water Works", year: "2024", value: "KES 12M", image: "/images/project2.jpg", desc: "5 deep boreholes with solar-powered pumping for rural communities" },
  { title: "Affordable Housing Complex", category: "Building", year: "2023", value: "KES 28M", image: "/images/hero3.jpg", desc: "40-unit residential complex with modern amenities in Nairobi" },
  { title: "Solar Street Lighting Installation", category: "Electrical", year: "2024", value: "KES 8M", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80", desc: "200 solar street lights along major county roads" },
  { title: "Water Pan Construction — Wajir", category: "Water Works", year: "2023", value: "KES 18M", image: "/images/project4.jpg", desc: "Large-capacity water pan for livestock and irrigation needs" },
  { title: "Industrial Warehouse Build", category: "Building", year: "2023", value: "KES 35M", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80", desc: "5,000sqm industrial warehouse with mechanical and electrical fit-out" },
];

const TEAM = [
  { name: "Abdinur Issack Abdi", role: "Director & Co-Founder", shares: "300 shares (30%)", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
  { name: "Fatuma Abdi Jirow", role: "Director & Managing Shareholder", shares: "700 shares (70%)", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80" },
  { name: "Eng. Hassan Mohammed", role: "Chief Civil Engineer", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80" },
  { name: "Eng. Amina Osman", role: "Water & Environmental Engineer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80" },
];

const QUICK_REPLIES = [
  { label: "🛣️ Roads", text: "Tell me about your roads construction services" },
  { label: "💧 Water works", text: "What water works do you offer — boreholes, dams, pans?" },
  { label: "📋 Get a quote", text: "How do I request a project quote?" },
  { label: "🏗️ Building", text: "What building construction services do you provide?" },
  { label: "⚡ Electrical & solar", text: "Tell me about your electrical and solar services" },
  { label: "📞 Contact", text: "What are your contact details and location?" },
];

// ─── LOCAL AI BRAIN — No API needed ──────────────────────────────────────────
const KB = [
  {
    patterns: ["hello", "hi", "hey", "habari", "jambo", "hujambo", "salaam", "good morning", "good afternoon", "good evening", "howdy", "sup", "hiya"],
    response: () => `Habari! 👋 Welcome to **Abeera Enterprises Limited**!\n\nI'm **ARIA**, your AI assistant. I'm here to help with:\n• 🛣️ Roads & civil works\n• 🏗️ Building construction\n• 💧 Water works & boreholes\n• ⚙️ Mechanical works\n• ⚡ Electrical & solar\n\nWhat can I help you with today?`,
  },
  {
    patterns: ["who are you", "what are you", "your name", "introduce yourself", "tell me about yourself", "aria"],
    response: () => `I'm **ARIA** — Abeera Responsive Intelligence Assistant 🤖\n\nI'm the official AI for **Abeera Enterprises Limited**, a premier Kenyan construction company. Ask me about our services, projects, pricing, company info, and more!`,
  },
  {
    patterns: ["about company", "about abeera", "who is abeera", "what is abeera", "tell me about the company", "company info", "company details", "about you"],
    response: () => `**Abeera Enterprises Limited** — a premier Kenyan construction & engineering company. 🏢\n\n📋 **Company No:** PVT-BEUXP26A\n📅 **Founded:** 5th June 2023\n📍 **Office:** P.O. Box 227, Mandera, Kenya\n🏙️ **Location:** Bula Janhuria Street, Nairobi North\n\nWe specialise in roads, buildings, water works, mechanical & electrical engineering — especially in arid regions of Kenya.\n\n– ARIA, Abeera AI 🏗️`,
  },
  {
    patterns: ["registration", "company number", "pvt", "registered", "certificate", "incorporation", "cr12"],
    response: () => `**Official Registration Details:** 📜\n\n• **Company:** Abeera Enterprises Limited\n• **Company Number:** PVT-BEUXP26A\n• **Date:** 5th June 2023\n• **Act:** Companies Act, 2015\n• **Regulator:** Business Registration Service, Kenya\n• **Ref:** OS-ERFDG9Z2\n\nFully compliant & legally registered. ✅`,
  },
  {
    patterns: ["directors", "owners", "shareholders", "who owns", "founder", "leadership", "management", "abdinur", "fatuma"],
    response: () => `Abeera Enterprises is led by two experienced directors: 👥\n\n**1. Abdinur Issack Abdi**\n• Director & Co-Founder | 300 shares (30%)\n\n**2. Fatuma Abdi Jirow**\n• Director & Managing Shareholder | 700 shares (70%)\n\nBoth bring deep regional expertise and a passion for community development. 🌍`,
  },
  {
    patterns: ["shares", "share capital", "capital", "equity", "ownership structure"],
    response: () => `**Share Structure:** 📊\n\n• **Nominal Capital:** KES 100,000\n• **Total Shares:** 1,000 ordinary @ KES 100 each\n• Fatuma Abdi Jirow — 700 shares (70%)\n• Abdinur Issack Abdi — 300 shares (30%)`,
  },
  {
    patterns: ["contact", "phone", "call", "telephone", "reach you", "get in touch", "number", "email", "address", "location", "where are you", "find you", "office"],
    response: () => `**Contact Abeera Enterprises:** 📞\n\n📱 **Phone:** +254 722 819 305\n✉️ **Email:** abeeraeenterprise@gmail.com\n📍 **Office:** Bula Janhuria Street, Nairobi North\n📮 **Postal:** P.O. Box 227, Mandera, Kenya\n\n⏰ Mon–Sat: 7AM–6PM | Sunday: Emergencies only\n\nWe'd love to hear from you! 🤝`,
  },
  {
    patterns: ["road", "roads", "highway", "tarmac", "tarmacking", "murram", "culvert", "bridge", "drainage", "pavement", "asphalt", "grading", "road rehabilitation", "road construction", "earthwork"],
    response: () => `**Roads Construction** — our flagship service! 🛣️\n\nWe deliver:\n• Highway & trunk road construction\n• Road rehabilitation & upgrading\n• Murram/gravel road construction\n• Tarmacking & asphalt paving\n• Bridges & culvert installation\n• Drainage systems & channels\n• Road maintenance contracts\n\nExperience across **Mandera, Wajir, Garissa** and Nairobi region.\n\n📞 **+254 722 819 305** for a quote!`,
  },
  {
    patterns: ["building", "house", "housing", "residential", "commercial", "office", "school", "hospital", "warehouse", "renovation", "storey", "apartment", "structure"],
    response: () => `**Building Construction** — we build dreams! 🏗️\n\nOur services:\n• Residential houses & apartments\n• Commercial buildings & offices\n• Schools, hospitals & clinics\n• Warehouses & industrial buildings\n• Government & institutional facilities\n• Renovations & interior fit-outs\n\nAll buildings comply with the **Kenya Building Code** and are supervised by qualified engineers.\n\n📞 **+254 722 819 305**`,
  },
  {
    patterns: ["water", "dam", "pan", "pipeline", "water pan", "irrigation", "water supply", "water tank", "water treatment", "water works", "water project"],
    response: () => `**Water Works** — bringing water to life! 💧\n\nWe specialise in:\n• Water pans for livestock & irrigation\n• Dam construction (earth & masonry)\n• Pipeline systems (distribution & supply)\n• Water treatment plants\n• Irrigation schemes\n• Water storage tanks\n• Community water supply projects\n• Solar-powered pumping systems\n\nExtensive experience in **ASAL regions** (Mandera, Wajir, Garissa, Marsabit).\n\n📞 **+254 722 819 305**`,
  },
  {
    patterns: ["borehole", "drill", "drilling", "groundwater", "well"],
    response: () => `**Borehole Drilling Services** 🔩\n\n• Deep borehole drilling (50–300m+)\n• Hydrogeological surveys & siting\n• Borehole casing & development\n• Pump installation (submersible & solar)\n• Water quality testing\n• Borehole rehabilitation\n• Yield testing & documentation\n\nWe use **modern rotary drilling rigs** with proven results in Mandera, Wajir & Marsabit.\n\n📞 **+254 722 819 305** for a drilling assessment!`,
  },
  {
    patterns: ["mechanical", "generator", "pump", "hvac", "air conditioning", "plant", "machinery", "equipment", "engine", "motor", "compressor"],
    response: () => `**Mechanical Works** — engineering excellence! ⚙️\n\nOur services:\n• Industrial plant installation\n• Generator installation & commissioning\n• Pumping systems (water, fuel, chemical)\n• HVAC systems\n• Industrial machinery installation\n• Mechanical maintenance contracts\n• Pipework & plumbing\n• Equipment repair & overhauling\n\n📞 **+254 722 819 305**`,
  },
  {
    patterns: ["electrical", "solar", "power", "electricity", "wiring", "panel", "substation", "transformer", "street light", "backup power", "inverter", "renewable", "pv", "lighting"],
    response: () => `**Electrical Works** — powering the future! ⚡\n\nOur services:\n• Power installation & wiring\n• **Solar PV systems** (residential & commercial)\n• Street & security lighting\n• Industrial electrical installations\n• Transformer & substation works\n• Backup power & UPS systems\n• Rural electrification projects\n• Smart building automation\n\nExpert in both **grid-connected & off-grid solar** — perfect for remote areas.\n\n📞 **+254 722 819 305**`,
  },
  {
    patterns: ["quote", "quotation", "price", "cost", "how much", "pricing", "estimate", "budget", "rates", "charges", "fee", "tender", "bid"],
    response: () => `We provide **free project quotations!** 📋\n\n**How to get a quote:**\n1️⃣ Contact us with project details\n2️⃣ We do a site visit or virtual assessment\n3️⃣ We prepare a detailed BOQ within **3–5 working days**\n\n📞 **+254 722 819 305**\n✉️ abeeraeenterprise@gmail.com\n\nFactors affecting cost: project size, location, materials, timeline.\n\nWe're competitive, transparent and fair! 💪`,
  },
  {
    patterns: ["project", "portfolio", "past work", "previous work", "completed", "experience", "examples", "achievements"],
    response: () => `**Recent Projects Showcase:** 🏆\n\n🛣️ Mandera Road Rehabilitation — **KES 45M** (2024)\n💧 Community Borehole Project — **KES 12M** (2024)\n🏗️ Affordable Housing Complex — **KES 28M** (2023)\n⚡ Solar Street Lighting (200 lights) — **KES 8M** (2024)\n💧 Water Pan, Wajir — **KES 18M** (2023)\n🏗️ Industrial Warehouse 5,000sqm — **KES 35M** (2023)\n\n**Total: KES 150M+ across 6 counties** 📍`,
  },
  {
    patterns: ["services", "what do you do", "what do you offer", "your work", "offerings", "capabilities", "specialise", "specialize"],
    response: () => `**Abeera Enterprises** — 5 core service lines: 🏗️\n\n1️⃣ 🛣️ **Roads Construction** — highways, murram, bridges\n2️⃣ 🏗️ **Building Construction** — residential, commercial, institutional\n3️⃣ 💧 **Water Works** — boreholes, dams, pans, pipelines\n4️⃣ ⚙️ **Mechanical Works** — plant, generators, HVAC\n5️⃣ ⚡ **Electrical Works** — solar, wiring, substations\n\nAll delivered by **qualified engineers** across Kenya.\n\nWhich service interests you?`,
  },
  {
    patterns: ["mandera", "wajir", "garissa", "nairobi", "kenya", "counties", "where do you work", "coverage", "area", "region", "operate", "asal", "northern kenya"],
    response: () => `We operate **across Kenya!** 🌍\n\n**Primary regions:**\n• Mandera County (home base)\n• Wajir County\n• Garissa County\n• Marsabit County\n• Nairobi & environs\n• Other counties on project basis\n\nWe have **special expertise in ASAL regions** — challenging terrains that require our experience and dedication. 💪`,
  },
  {
    patterns: ["timeline", "how long", "duration", "deadline", "when", "time frame", "completion", "delivery", "schedule"],
    response: () => `**Project Timelines** — we deliver on time! ⏱️\n\n• **Small projects** (borehole, small building): 2–8 weeks\n• **Medium projects** (road section, medium build): 2–6 months\n• **Large projects** (major roads, dams, complexes): 6–24 months\n\nWe provide:\n✅ Detailed Gantt charts\n✅ Weekly progress reports\n✅ Milestone-based billing\n\n📞 **+254 722 819 305** for your specific timeline!`,
  },
  {
    patterns: ["quality", "standard", "certified", "warranty", "guarantee", "workmanship", "materials", "specification"],
    response: () => `Quality is non-negotiable at **Abeera Enterprises!** 🏆\n\n✅ Kenya Building Code compliance\n✅ Certified, tested materials only\n✅ Licensed engineers on every project\n✅ Regular quality inspections\n✅ Defects liability period on all works\n✅ ISO-aligned quality management\n\nOur team: Registered Civil Engineers, Water Engineers, Certified Electricians, Licensed Mechanical Engineers.\n\nWe don't cut corners. Ever. 💪`,
  },
  {
    patterns: ["job", "career", "employment", "vacancy", "hire", "work for", "internship", "cv", "resume", "apply", "recruitment"],
    response: () => `Interested in joining **Abeera Enterprises?** 💼\n\nWe hire:\n• Civil & Structural Engineers\n• Water & Environmental Engineers\n• Electrical & Mechanical Engineers\n• Project Managers & Site Supervisors\n• Quantity Surveyors\n• Skilled artisans & labourers\n\n📧 Send CV to: **abeeraeenterprise@gmail.com**\n📞 Call: **+254 722 819 305**\n\nWe prioritise **local talent** from the communities we serve! 🌍`,
  },
  {
    patterns: ["partner", "partnership", "subcontract", "joint venture", "collaborate", "jv", "supplier", "vendor"],
    response: () => `We welcome **partnerships!** 🤝\n\nOpen to:\n• Joint Ventures (JV) on large projects\n• Subcontracting arrangements\n• Supplier partnerships\n• NGO & donor project collaboration\n• Government framework contracts\n\nExperience with County Governments, national agencies, international NGOs & private developers.\n\n📞 **+254 722 819 305** | ✉️ abeeraeenterprise@gmail.com`,
  },
  {
    patterns: ["complaint", "problem", "issue", "concern", "unhappy", "disappointed", "bad", "poor", "wrong", "delay"],
    response: () => `We're sorry to hear you have a concern. 😔 We take all feedback seriously.\n\nPlease contact our management directly:\n\n📞 **+254 722 819 305**\n✉️ **abeeraeenterprise@gmail.com**\n\nOr write to: The Directors, Abeera Enterprises Limited, P.O. Box 227, Mandera, Kenya.\n\nWe resolve issues **promptly and professionally.** 🤝`,
  },
  {
    patterns: ["habari", "jambo", "asante", "karibu", "huduma", "ujenzi", "barabara", "maji", "umeme", "kampuni"],
    response: () => `Karibu sana! 🇰🇪\n\n**Abeera Enterprises** inatoa:\n🛣️ Ujenzi wa Barabara\n🏗️ Ujenzi wa Majengo\n💧 Kazi za Maji (visima, mabwawa)\n⚙️ Kazi za Mitambo\n⚡ Kazi za Umeme na Sola\n\n📞 **+254 722 819 305**\n✉️ abeeraeenterprise@gmail.com\n\nTuko tayari kukusaidia! 💪`,
  },
  {
    patterns: ["thank", "thanks", "okay", "ok", "great", "perfect", "awesome", "bye", "goodbye", "noted", "understood"],
    response: () => {
      const r = [
        `You're welcome! 😊 Feel free to reach out anytime.\n📞 **+254 722 819 305** | **Abeera Enterprises — Building Kenya's Future!** 🏗️`,
        `Happy to help! Don't hesitate to ask more questions. 🤝\n📞 **+254 722 819 305**`,
        `Glad I could help! **Abeera Enterprises** is just a call away. 🏗️\n📞 **+254 722 819 305**`,
      ];
      return r[Math.floor(Math.random() * r.length)];
    },
  },
];

function ariaRespond(userInput: string): string {
  const input = userInput.toLowerCase().trim();
  let bestMatch = null;
  let bestScore = 0;
  for (const entry of KB) {
    for (const pattern of entry.patterns) {
      if (input.includes(pattern)) {
        const score = pattern.length;
        if (score > bestScore) { bestScore = score; bestMatch = entry; }
      }
    }
  }
  if (bestMatch && bestScore > 0) return bestMatch.response();
  const fallbacks = [
    `Good question! 🤔 I can help with:\n• 🛣️ Roads construction\n• 🏗️ Building works\n• 💧 Water works & boreholes\n• ⚙️ Mechanical works\n• ⚡ Electrical & solar\n• 📋 Quotes & pricing\n• 📞 Contact details\n\nOr call us: **+254 722 819 305**`,
    `Let me connect you with our team for that! 😊\n📞 **+254 722 819 305**\n✉️ abeeraeenterprise@gmail.com\n\nWhat else can I help you with?`,
    `Great question for our team! 🤝\n📞 **+254 722 819 305**\n✉️ abeeraeenterprise@gmail.com\n\nFeel free to ask about our **services, projects, or company!**`,
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}


// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const G = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@300;400;500;600;700&family=Exo+2:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body,#__next{background:#0A0A0A;color:#F5F5F5;font-family:'Exo 2',sans-serif;overflow-x:hidden;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:#111;}
::-webkit-scrollbar-thumb{background:#C8102E;border-radius:2px;}
.bebas{font-family:'Bebas Neue',sans-serif;}
.raj{font-family:'Rajdhani',sans-serif;}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes fadeOut{from{opacity:1;}to{opacity:0;}}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.35;}}
@keyframes rotateSlow{from{transform:rotate(0deg);}to{transform:rotate(360deg);}  }
@keyframes particleFloat{0%{transform:translateY(100vh) scale(0);opacity:0;}10%{opacity:1;}90%{opacity:0.5;}100%{transform:translateY(-10vh) scale(1);opacity:0;}}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
@keyframes gridMove{0%{background-position:0 0;}100%{background-position:50px 50px;}}
@keyframes heroKen{0%{transform:scale(1);}100%{transform:scale(1.07);}}
@keyframes slideInLeft{from{opacity:0;transform:translateX(-36px);}to{opacity:1;transform:translateX(0);}}
@keyframes slideInRight{from{opacity:0;transform:translateX(36px);}to{opacity:1;transform:translateX(0);}}
@keyframes typingDot{0%,80%,100%{transform:scale(0);opacity:0.4;}40%{transform:scale(1);opacity:1;}}
@keyframes chatPop{from{opacity:0;transform:translateY(18px) scale(0.95);}to{opacity:1;transform:translateY(0) scale(1);}}
@keyframes ripple{0%{transform:scale(0);opacity:0.5;}100%{transform:scale(3.5);opacity:0;}}
@keyframes slideRight{from{transform:scaleX(0);}to{transform:scaleX(1);}}
.glass{
  background:linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%);
  backdrop-filter:blur(28px) saturate(180%);
  -webkit-backdrop-filter:blur(28px) saturate(180%);
  border:1px solid rgba(255,255,255,0.1);
  border-top:1px solid rgba(255,255,255,0.18);
  border-left:1px solid rgba(255,255,255,0.12);
  border-radius:16px;
  box-shadow:0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
  position:relative;
}
.glass::before{
  content:'';position:absolute;inset:0;border-radius:16px;
  background:linear-gradient(135deg,rgba(200,16,46,0.04) 0%,transparent 60%);
  pointer-events:none;
}
.glass:hover{
  border-color:rgba(200,16,46,0.35);
  box-shadow:0 12px 40px rgba(0,0,0,0.5),0 0 0 1px rgba(200,16,46,0.15),inset 0 1px 0 rgba(255,255,255,0.1);
  transition:all 0.35s ease;
}
.glass-deep{
  background:linear-gradient(135deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.03) 100%);
  backdrop-filter:blur(40px) saturate(200%);
  -webkit-backdrop-filter:blur(40px) saturate(200%);
  border:1px solid rgba(255,255,255,0.12);
  border-top:1px solid rgba(255,255,255,0.22);
  border-radius:20px;
  box-shadow:0 16px 48px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.1),inset 0 -1px 0 rgba(0,0,0,0.2);
}
.grid-tex{background-image:linear-gradient(rgba(200,16,46,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,16,46,0.03) 1px,transparent 1px);background-size:50px 50px;animation:gridMove 10s linear infinite;}
@keyframes shimmer{0%{background-position:-400px 0;}100%{background-position:400px 0;}}
@keyframes glassShine{0%{opacity:0;transform:translateX(-100%) rotate(20deg);}40%{opacity:0.6;}100%{opacity:0;transform:translateX(200%) rotate(20deg);}}
.glass-shine{overflow:hidden;}
.glass-shine::after{content:'';position:absolute;top:-50%;left:-60%;width:40%;height:200%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent);transform:rotate(20deg);animation:glassShine 4s 2s ease-in-out infinite;}
.card-glow:hover{box-shadow:0 0 30px rgba(200,16,46,0.15),0 16px 48px rgba(0,0,0,0.5)!important;}
.btn-p{background:linear-gradient(135deg,#C8102E,#8B0000);color:#fff;border:none;padding:14px 32px;border-radius:8px;font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;position:relative;overflow:hidden;}
.btn-p::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent);transition:left 0.4s;}
.btn-p:hover::before{left:100%;}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(200,16,46,0.45);}
.btn-o{background:transparent;color:#C8102E;border:1px solid #C8102E;padding:13px 32px;border-radius:8px;font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
.btn-o:hover{background:rgba(200,16,46,0.1);transform:translateY(-2px);}
.stag{display:inline-block;background:rgba(200,16,46,0.13);color:#C8102E;border:1px solid rgba(200,16,46,0.3);padding:6px 16px;border-radius:4px;font-family:'Rajdhani',sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;}
input,textarea,select{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#F5F5F5;padding:12px 16px;border-radius:8px;font-family:'Exo 2',sans-serif;font-size:14px;width:100%;transition:all 0.3s;outline:none;}
input:focus,textarea:focus,select:focus{border-color:#C8102E;background:rgba(200,16,46,0.06);box-shadow:0 0 0 3px rgba(200,16,46,0.12);}
select option{background:#1a1a1a;}
@media(max-width:768px){
  .nav-links{display:none!important;}
  .stat-grid{grid-template-columns:repeat(2,1fr)!important;}
  .two-col{grid-template-columns:1fr!important;}
  .three-col{grid-template-columns:1fr!important;}
  .four-col{grid-template-columns:repeat(2,1fr)!important;}
  .hero-thumb{display:none!important;}
  .hero-rings{display:none!important;}
  .about-mosaic{grid-template-columns:1fr 1fr!important;}
  .footer-grid{grid-template-columns:1fr 1fr!important;}
}
@media(max-width:480px){
  .stat-grid{grid-template-columns:1fr 1fr!important;}
  .four-col{grid-template-columns:1fr 1fr!important;}
  .footer-grid{grid-template-columns:1fr!important;}
  .btn-p,.btn-o{padding:12px 20px!important;font-size:13px!important;}
}
`;

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function Logo({ size = 40 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#E63946" /><stop offset="100%" stopColor="#8B0000" /></linearGradient></defs>
        <path d="M10 85 L50 10 L90 85" stroke="url(#lg)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M25 60 L75 60" stroke="url(#lg)" strokeWidth="6" strokeLinecap="round" />
        <path d="M55 18 Q80 8 92 30" stroke="url(#lg)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />
        <path d="M60 28 Q82 20 90 42" stroke="url(#lg)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
      </svg>
      <div>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: size * 0.54, lineHeight: 1, color: "#F5F5F5", letterSpacing: 2 }}>ABEERA</div>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: size * 0.21, color: "#C8102E", letterSpacing: 3, fontWeight: 700, textTransform: "uppercase" }}>Enterprises Limited</div>
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "linear-gradient(180deg,rgba(10,4,4,0.95) 0%,rgba(8,8,8,0.92) 100%)" : "transparent", backdropFilter: scrolled ? "blur(32px) saturate(180%)" : "none", WebkitBackdropFilter: scrolled ? "blur(32px) saturate(180%)" : "none", borderBottom: scrolled ? "1px solid rgba(200,16,46,0.18)" : "none", transition: "all 0.4s", padding: "0 5%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div onClick={() => setPage("Home")}><Logo size={38} /></div>
        <div className="nav-links" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {["Home", "About", "Services", "Portfolio", "Contact"].map(l => (
            <button key={l} onClick={() => setPage(l)} style={{ background: "none", border: "none", color: page === l ? "#C8102E" : "#bbb", fontFamily: "'Rajdhani',sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: 1, padding: "8px 14px", cursor: "pointer", position: "relative", transition: "color 0.3s" }}>
              {l}
              {page === l && <span style={{ position: "absolute", bottom: 0, left: "20%", width: "60%", height: 2, background: "#C8102E", borderRadius: 2, display: "block", transformOrigin: "left", animation: "slideRight 0.3s ease" }} />}
            </button>
          ))}
          <button className="btn-p" style={{ padding: "9px 20px", fontSize: 13, marginLeft: 8 }} onClick={() => setPage("Contact")}>Get Quote</button>
        </div>
      </div>
    </nav>
  );
}

// ─── PARTICLES ────────────────────────────────────────────────────────────────
function Particles() {
  const [pts, setPts] = useState<{ id: number; left: number; delay: number; dur: number; size: number; op: number }[]>([]);
  useEffect(() => {
    setPts(Array.from({ length: 18 }, (_, i) => ({
      id: i, left: Math.random() * 100, delay: Math.random() * 12,
      dur: 9 + Math.random() * 14, size: 2 + Math.random() * 4, op: 0.3 + Math.random() * 0.4,
    })));
  }, []);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
      {pts.map(p => <div key={p.id} style={{ position: "absolute", left: `${p.left}%`, bottom: -10, width: p.size, height: p.size, borderRadius: "50%", background: `rgba(200,16,46,${p.op})`, animation: `particleFloat ${p.dur}s ${p.delay}s linear infinite` }} />)}
    </div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SH({ tag, title, sub, left }: { tag: string; title: string; sub?: string; left?: boolean }) {
  return (
    <div style={{ textAlign: left ? "left" : "center", marginBottom: 52 }}>
      <span className="stag">{tag}</span>
      <h2 className="bebas" style={{ fontSize: "clamp(32px,5vw,56px)", lineHeight: 1, color: "#F5F5F5", marginBottom: 13 }}>
        {title.split("||").map((p: string, i: number) => i % 2 === 1 ? <span key={i} style={{ color: "#C8102E" }}>{p}</span> : p)}
      </h2>
      {sub && <p style={{ color: "#888", maxWidth: 560, margin: left ? 0 : "0 auto", lineHeight: 1.75, fontSize: 15 }}>{sub}</p>}
    </div>
  );
}

// ─── HERO CAROUSEL ────────────────────────────────────────────────────────────
function HeroCarousel({ setPage }: { setPage: (p: string) => void }) {
  const [cur, setCur] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const INTERVAL = 5500;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setCur(idx);
    setProgress(0);
    setTimeout(() => setTransitioning(false), 800);
  }, [transitioning]);

  const next = useCallback(() => goTo((cur + 1) % HERO_SLIDES.length), [cur, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, INTERVAL) as ReturnType<typeof setInterval>;
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    progRef.current = setInterval(() => {
      setProgress(Math.min(((Date.now() - start) / INTERVAL) * 100, 100));
    }, 60);
    return () => { if (progRef.current) clearInterval(progRef.current); };
  }, [cur]);

  const s = HERO_SLIDES[cur];

  return (
    <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* BG image — keyed so it re-animates on slide change */}
      <div key={cur} style={{ position: "absolute", inset: 0, zIndex: 0, animation: "fadeIn 0.85s ease" }}>
        <img src={s.bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.28, animation: "heroKen 6s ease forwards" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(8,8,8,0.93) 0%,rgba(100,0,0,0.25) 50%,rgba(8,8,8,0.88) 100%)" }} />
        <div className="grid-tex" style={{ position: "absolute", inset: 0, opacity: 0.35 }} />
      </div>

      <Particles />

      {/* Rotating rings */}
      <div className="hero-rings" style={{ position: "absolute", right: "4%", top: "50%", transform: "translateY(-50%)", width: 460, height: 460, borderRadius: "50%", border: "1px solid rgba(200,16,46,0.12)", animation: "rotateSlow 28s linear infinite", zIndex: 2, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 30, borderRadius: "50%", border: "1px solid rgba(200,16,46,0.07)" }} />
        <div style={{ position: "absolute", inset: 60, borderRadius: "50%", border: "1px solid rgba(200,16,46,0.04)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 10, height: 10, borderRadius: "50%", background: "rgba(200,16,46,0.5)" }} />
      </div>

      {/* Content — keyed so it re-animates */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", position: "relative", zIndex: 3, paddingTop: "clamp(60px,12vw,90px)", width: "100%" }}>
        <div style={{ maxWidth: 700 }} key={cur}>
          <div style={{ animation: "slideInLeft 0.6s 0.05s both" }}><span className="stag">{s.tag}</span></div>
          <h1 className="bebas" style={{ fontSize: "clamp(44px,9.5vw,122px)", lineHeight: 0.9, marginBottom: 20, animation: "slideInLeft 0.7s 0.15s both" }}>
            {s.title}<br /><span style={{ color: "#C8102E" }}>{s.accent}</span><br />{s.sub}
          </h1>
          <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.75, marginBottom: 38, maxWidth: "min(480px, 90vw)", animation: "slideInLeft 0.7s 0.28s both" }}>{s.desc}</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", animation: "slideInLeft 0.7s 0.4s both" }}>
            <button className="btn-p" onClick={() => setPage("Portfolio")}>View Projects</button>
            <button className="btn-o" onClick={() => setPage("Contact")}>Get A Quote</button>
          </div>

          {/* Dots with progress */}
          <div style={{ display: "flex", gap: 10, marginTop: 46, alignItems: "center" }}>
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 3 }}>
                <div style={{ width: i === cur ? 34 : 8, height: 4, borderRadius: 3, background: i === cur ? "transparent" : "rgba(255,255,255,0.2)", transition: "width 0.4s ease", overflow: "hidden", position: "relative", border: i === cur ? "1px solid rgba(200,16,46,0.5)" : "none" }}>
                  {i === cur && <div style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "#C8102E", width: `${progress}%`, transition: "width 0.06s linear" }} />}
                  {i !== cur && <div style={{ width: "100%", height: "100%", background: "rgba(255,255,255,0.2)", borderRadius: 3 }} />}
                </div>
              </button>
            ))}
            <span style={{ color: "#444", fontFamily: "'Rajdhani',sans-serif", fontSize: 12, marginLeft: 6 }}>{String(cur + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="hero-thumb" style={{ position: "absolute", right: "2.5%", top: "50%", transform: "translateY(-50%)", zIndex: 4, display: "flex", flexDirection: "column", gap: 10 }}>
        {HERO_SLIDES.map((sl, i) => (
          <div key={i} onClick={() => goTo(i)} style={{ width: 62, height: 42, borderRadius: 7, overflow: "hidden", cursor: "pointer", border: i === cur ? "2px solid #C8102E" : "2px solid rgba(255,255,255,0.1)", transition: "all 0.35s", opacity: i === cur ? 1 : 0.45, transform: i === cur ? "scale(1.1)" : "scale(1)" }}>
            <img src={sl.bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>

      {/* Marquee */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(200,16,46,0.88)", padding: "9px 0", overflow: "hidden", zIndex: 5 }}>
        <div style={{ display: "flex", gap: 60, whiteSpace: "nowrap", animation: "marquee 22s linear infinite" }}>
          {[...Array(2)].flatMap(() => ["Roads Construction", "Building Works", "Water Works", "Borehole Drilling", "Electrical Works", "Mechanical Engineering", "Dams & Pipelines"]).map((t, i) => (
            <span key={i} style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 2, color: "#fff" }}>◆ {t.toUpperCase()}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CHATBOT ──────────────────────────────────────────────────────────────────
type Msg = { role: string; content: string; time: string };

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{
    role: "assistant",
    content: "Habari! 👋 I'm **ARIA**, Abeera's AI assistant.\n\nI can help with:\n• 🛣️ Roads & civil works\n• 🏗️ Building construction\n• 💧 Water works & boreholes\n• ⚙️ Mechanical & electrical\n• 📋 Quotes & company info\n\nHow can I help you today?",
    time: ""
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [notif, setNotif] = useState(false);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputRef2 = useRef(input); // always-current ref for send()
  inputRef2.current = input;

  useEffect(() => {
    setMsgs(prev => prev.map((m, i) => i === 0
      ? { ...m, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
      : m));
    const t = setTimeout(() => setNotif(true), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 150);
    }
  }, [msgs, open]);

  // send() reads inputRef2.current so it never has a stale closure
  const send = useCallback((text?: string) => {
    const msg = (text !== undefined ? text : inputRef2.current).trim();
    if (!msg || loading) return;
    if (text === undefined) setInput(""); // only clear textarea when typing
    setShowQuick(false);
    setNotif(false);
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMsgs(prev => [...prev, { role: "user", content: msg, time }]);
    setLoading(true);
    setTyping(true);
    setTimeout(() => {
      const reply = ariaRespond(msg);
      setTyping(false);
      setLoading(false);
      setMsgs(prev => [...prev, {
        role: "assistant", content: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }]);
    }, 700 + Math.random() * 700);
  }, [loading]);  // inputRef2 is a ref — stable, no need in deps

  const renderMsg = (text: string) => text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#ff8080;font-weight:600">$1</strong>')
    .replace(/\n•/g, '<br/>•')
    .replace(/\n/g, '<br/>');

  const MsgBubble = ({ m }: { m: Msg }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
      {m.role === "assistant" && (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 7, marginBottom: 2 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#C8102E,#8B0000)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0, boxShadow: "0 2px 8px rgba(200,16,46,0.4)" }}>🤖</div>
          <div style={{
            background: "linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))",
            backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.13)",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "4px 16px 16px 16px",
            padding: "11px 14px",
            maxWidth: "calc(100% - 50px)",
            fontSize: 13, lineHeight: 1.7, color: "#e8e8e8",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)",
            wordBreak: "break-word",
          }} dangerouslySetInnerHTML={{ __html: renderMsg(m.content) }} />
        </div>
      )}
      {m.role === "user" && (
        <div style={{
          background: "linear-gradient(135deg,#C8102E,#8B0000)",
          borderRadius: "16px 4px 16px 16px",
          padding: "10px 14px",
          maxWidth: "80%",
          fontSize: 13, lineHeight: 1.65, color: "#fff",
          boxShadow: "0 4px 16px rgba(200,16,46,0.35)",
          wordBreak: "break-word",
        }}>{m.content}</div>
      )}
      {m.time && <span style={{ fontSize: 10, color: "#3a3a3a", marginTop: 3, padding: "0 4px" }}>{m.time}</span>}
    </div>
  );

  return (
    <>
      {/* ── Responsive CSS injected once ── */}
      <style>{`
        .aria-win {
          position: fixed;
          right: 20px;
          bottom: 90px;
          width: 370px;
          height: 580px;
          z-index: 1999;
          display: flex;
          flex-direction: column;
          background: linear-gradient(160deg,rgba(28,6,6,0.93) 0%,rgba(10,10,10,0.97) 60%,rgba(6,3,3,0.95) 100%);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.1);
          border-top: 1px solid rgba(255,255,255,0.2);
          border-radius: 22px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(200,16,46,0.15), inset 0 1px 0 rgba(255,255,255,0.09);
          animation: chatPop 0.38s cubic-bezier(0.34,1.56,0.64,1);
          overflow: hidden;
        }
        @media (max-width: 480px) {
          .aria-win {
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 92vh;
            border-radius: 22px 22px 0 0;
            animation: chatPopMobile 0.35s ease;
          }
          .aria-fab {
            bottom: 16px !important;
            right: 16px !important;
          }
        }
        @keyframes chatPopMobile {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .aria-msgs::-webkit-scrollbar { width: 3px; }
        .aria-msgs::-webkit-scrollbar-thumb { background: rgba(200,16,46,0.4); border-radius: 2px; }
        .aria-textarea { color: #F5F5F5 !important; }
        .aria-textarea::placeholder { color: rgba(255,255,255,0.35) !important; }
        .aria-send-btn:hover { transform: scale(1.05); box-shadow: 0 4px 16px rgba(200,16,46,0.5) !important; }
        .aria-quick:hover { background: rgba(200,16,46,0.25) !important; color: #fff !important; transform: scale(1.03); }
      `}</style>

      {/* ── FAB Button ── */}
      <div className="aria-fab" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 2000 }}>
        {!open && notif && (
          <>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(200,16,46,0.3)", animation: "ripple 2s ease-out infinite" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(200,16,46,0.15)", animation: "ripple 2s 0.7s ease-out infinite" }} />
            <div style={{ position: "absolute", top: -6, right: -6, background: "#22c55e", color: "#fff", borderRadius: "50%", width: 17, height: 17, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, border: "2px solid #0A0A0A", zIndex: 2, fontFamily: "sans-serif" }}>1</div>
          </>
        )}
        <button
          onClick={() => { setOpen(p => !p); setNotif(false); }}
          aria-label="Open ARIA chatbot"
          style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "linear-gradient(135deg,#C8102E,#8B0000)",
            border: "2px solid rgba(200,16,46,0.5)",
            cursor: "pointer", fontSize: 22,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 6px 24px rgba(200,16,46,0.5)",
            transition: "transform 0.2s, box-shadow 0.2s",
            color: "#fff", outline: "none",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"}
          onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
        >
          {open ? "✕" : "💬"}
        </button>
        {!open && (
          <div style={{
            position: "absolute", bottom: "115%", right: 0, whiteSpace: "nowrap",
            background: "rgba(12,8,8,0.97)", border: "1px solid rgba(200,16,46,0.3)",
            borderRadius: 10, padding: "7px 13px", fontSize: 12,
            color: "#F5F5F5", fontFamily: "'Rajdhani',sans-serif", fontWeight: 600,
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)", pointerEvents: "none",
          }}>💬 Chat with ARIA</div>
        )}
      </div>

      {/* ── Chat Window ── */}
      {open && (
        <div className="aria-win">

          {/* ── HEADER ── */}
          <div style={{
            padding: "12px 14px",
            background: "linear-gradient(135deg,rgba(200,16,46,0.28),rgba(70,0,0,0.2))",
            borderBottom: "1px solid rgba(200,16,46,0.25)", flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Avatar */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: "linear-gradient(135deg,#C8102E,#8B0000)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 17, border: "2px solid rgba(200,16,46,0.5)",
                  boxShadow: "0 2px 12px rgba(200,16,46,0.4)",
                }}>🤖</div>
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: "#22c55e", border: "2px solid #0A0A0A" }} />
              </div>
              {/* Name */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 15, color: "#F5F5F5", lineHeight: 1.2 }}>ARIA</div>
                <div style={{ fontSize: 10, color: "#888", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite", flexShrink: 0 }} />
                  Always online
                </div>
              </div>
              {/* Header action buttons */}
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {/* Topics menu toggle */}
                <button
                  onClick={() => setShowQuick(p => !p)}
                  title="Show topics menu"
                  style={{
                    background: showQuick ? "rgba(200,16,46,0.3)" : "rgba(255,255,255,0.07)",
                    border: showQuick ? "1px solid rgba(200,16,46,0.5)" : "1px solid rgba(255,255,255,0.1)",
                    color: showQuick ? "#ff8080" : "#aaa", cursor: "pointer",
                    fontSize: 13, width: 30, height: 30, borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "all 0.2s", fontFamily: "sans-serif",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.background = "rgba(200,16,46,0.25)"}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.background = showQuick ? "rgba(200,16,46,0.3)" : "rgba(255,255,255,0.07)"}
                >☰</button>
                {/* Restart conversation */}
                <button
                  onClick={() => {
                    setMsgs([{
                      role: "assistant",
                      content: "Chat restarted! 🔄 How can I help you?\n\n• 🛣️ Roads & civil works\n• 🏗️ Building construction\n• 💧 Water works & boreholes\n• ⚙️ Mechanical & electrical\n• 📋 Quotes & company info",
                      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    }]);
                    setInput("");
                    setShowQuick(true);
                    setLoading(false);
                    setTyping(false);
                  }}
                  title="Restart conversation"
                  style={{
                    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#aaa", cursor: "pointer", fontSize: 13, width: 30, height: 30,
                    borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "all 0.2s",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,200,0,0.15)"; (e.currentTarget as HTMLElement).style.color = "#ffd700"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "#aaa"; }}
                >↺</button>
                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  title="Close chat"
                  style={{
                    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#aaa", cursor: "pointer", fontSize: 14, width: 30, height: 30,
                    borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "all 0.2s",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.background = "rgba(200,16,46,0.3)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "#aaa"; }}
                >✕</button>
              </div>
            </div>
          </div>

          {/* ── TOPICS MENU (always-accessible slide-down panel) ── */}
          {showQuick && (
            <div style={{
              padding: "8px 10px",
              background: "rgba(0,0,0,0.35)",
              borderBottom: "1px solid rgba(200,16,46,0.15)",
              flexShrink: 0,
              animation: "fadeIn 0.2s ease",
            }}>
              <div style={{ fontSize: 9.5, color: "#C8102E", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: 2, marginBottom: 7, textTransform: "uppercase" }}>
                Quick Topics
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {QUICK_REPLIES.map((q, i) => (
                  <button
                    key={i}
                    className="aria-quick"
                    onClick={() => { send(q.text); setShowQuick(false); }}
                    style={{
                      background: "rgba(200,16,46,0.1)", border: "1px solid rgba(200,16,46,0.28)",
                      color: "#ff8080", padding: "5px 11px", borderRadius: 20,
                      fontSize: 11, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600,
                      cursor: "pointer", transition: "all 0.18s", whiteSpace: "nowrap",
                    }}
                  >{q.label}</button>
                ))}
              </div>
              {/* Quick contact row */}
              <div style={{ display: "flex", gap: 8, marginTop: 7 }}>
                <a href="tel:+254722819305" style={{ textDecoration: "none", flex: 1 }}>
                  <div style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 8, padding: "6px 10px", textAlign: "center", fontSize: 11, color: "#4ade80", fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, cursor: "pointer" }}>
                    📞 Call Us
                  </div>
                </a>
                <a href="mailto:abeeraeenterprise@gmail.com" style={{ textDecoration: "none", flex: 1 }}>
                  <div style={{ background: "rgba(200,16,46,0.1)", border: "1px solid rgba(200,16,46,0.25)", borderRadius: 8, padding: "6px 10px", textAlign: "center", fontSize: 11, color: "#ff8080", fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, cursor: "pointer" }}>
                    ✉️ Email Us
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* ── MESSAGES ── */}
          <div className="aria-msgs" style={{ flex: 1, overflowY: "auto", padding: "12px 11px 6px", display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map((m, i) => <MsgBubble key={i} m={m} />)}
            {typing && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 7 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#C8102E,#8B0000)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>🤖</div>
                <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "4px 16px 16px 16px", padding: "11px 15px", display: "flex", gap: 5, alignItems: "center" }}>
                  {[0, 1, 2].map(j => (
                    <div key={j} style={{ width: 7, height: 7, borderRadius: "50%", background: "#C8102E", animation: `typingDot 1.4s ${j * 0.22}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} style={{ height: 4 }} />
          </div>

          {/* ── INPUT BAR ── */}
          <div style={{ padding: "8px 10px 10px", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0, background: "rgba(0,0,0,0.28)" }}>
            {/* Topics toggle pill row above input */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
              <button
                onClick={() => setShowQuick(p => !p)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: showQuick ? "#C8102E" : "#555",
                  fontSize: 11, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600,
                  letterSpacing: 1, display: "flex", alignItems: "center", gap: 4,
                  transition: "color 0.2s", padding: "2px 0",
                }}
              >
                <span style={{ fontSize: 13 }}>{showQuick ? "▲" : "▼"}</span>
                {showQuick ? "HIDE TOPICS" : "☰ SHOW TOPICS"}
              </button>
              {msgs.length > 1 && (
                <button
                  onClick={() => {
                    setMsgs([{
                      role: "assistant",
                      content: "Restarted! ✨ What can I help you with?\n\n• 🛣️ Roads & civil works\n• 🏗️ Building construction\n• 💧 Water works & boreholes\n• ⚙️ Mechanical & electrical\n• 📋 Quotes & info",
                      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    }]);
                    setInput("");
                    setShowQuick(true);
                    setLoading(false);
                    setTyping(false);
                  }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "#555", fontSize: 11, fontFamily: "'Rajdhani',sans-serif",
                    fontWeight: 600, letterSpacing: 1, display: "flex", alignItems: "center",
                    gap: 4, transition: "color 0.2s", padding: "2px 0",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.color = "#ffd700"}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.color = "#555"}
                >↺ NEW CHAT</button>
              )}
            </div>
            {/* Textarea + send */}
            <div style={{ display: "flex", gap: 7, alignItems: "flex-end" }}>
              <textarea
                ref={inputRef}
                className="aria-textarea"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Type a message or pick a topic above…"
                rows={1}
                style={{
                  flex: 1, fontSize: 13, padding: "9px 12px", borderRadius: 12,
                  resize: "none", minHeight: 38, maxHeight: 85, overflowY: "auto",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#F5F5F5", fontFamily: "'Exo 2',sans-serif", lineHeight: 1.5,
                  outline: "none",
                }}
              />
              <button
                className="aria-send-btn"
                onClick={() => send()}
                disabled={loading || !input.trim()}
                title="Send message"
                style={{
                  background: input.trim() ? "linear-gradient(135deg,#C8102E,#8B0000)" : "rgba(255,255,255,0.06)",
                  border: "none", borderRadius: 12, width: 40, height: 40,
                  cursor: input.trim() ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, transition: "all 0.22s", flexShrink: 0, color: "#fff",
                  opacity: loading ? 0.5 : 1,
                  boxShadow: input.trim() ? "0 4px 14px rgba(200,16,46,0.4)" : "none",
                }}
              >➤</button>
            </div>
            <div style={{ textAlign: "center", marginTop: 5, fontSize: 9, color: "#242424", fontFamily: "'Rajdhani',sans-serif", letterSpacing: 1 }}>
              ARIA by ABEERA ENTERPRISES
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage }: { setPage: (p: string) => void }) {
  const [count, setCount] = useState([0, 0, 0, 0]);
  const isMob = useIsMobile();
  useEffect(() => {
    const targets = [50, 5, 200, 6];
    const timers = targets.map((t, i) => setInterval(() => {
      setCount((prev: number[]) => { const n = [...prev]; if (n[i] < t) n[i] = Math.min(n[i] + Math.ceil(t / 35), t); return n; });
    }, 55));
    return () => timers.forEach(clearInterval);
  }, []);
  return (
    <div>
      <HeroCarousel setPage={setPage} />
      {/* Stats */}
      <section style={{ padding: "65px 5%", background: "linear-gradient(180deg,rgba(200,16,46,0.06) 0%,rgba(10,10,10,0.8) 100%)", borderTop: "1px solid rgba(200,16,46,0.15)", borderBottom: "1px solid rgba(200,16,46,0.1)", backdropFilter: "blur(20px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMob ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 18 }}>
          {([["50+", "Projects Completed", 50], ["5", "Core Services", 5], ["200+", "Skilled Workers", 200], ["6", "Counties Served", 6]] as [string, string, number][]).map(([v, l, n], i) => (
            <div key={i} className="glass" style={{ padding: "26px 18px", textAlign: "center" }}>
              <div className="bebas" style={{ fontSize: 58, color: "#C8102E", lineHeight: 1 }}>{count[i]}{v.replace(/\d+/, "")}</div>
              <div style={{ color: "#666", fontFamily: "'Rajdhani',sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginTop: 5 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Services */}
      <section style={{ padding: "86px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SH tag="What We Do" title="||Core Services|| We Provide" sub="Comprehensive construction and engineering services tailored for Kenya's growing infrastructure needs" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(205px,1fr))", gap: 18 }}>
            {SERVICES.map((s, i) => (
              <div key={s.id} className="glass glass-shine card-glow" style={{ padding: 24, cursor: "pointer", transition: "all 0.4s", position: "relative", overflow: "hidden", animation: `fadeUp 0.6s ${i * 0.09}s both` }}
                onClick={() => setPage("Services")}
                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${s.color},transparent)` }} />
                <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 5 }}>{s.title}</h3>
                <p style={{ color: "#666", fontSize: 13, lineHeight: 1.6 }}>{s.short}</p>
                <div style={{ marginTop: 13, color: "#C8102E", fontSize: 11, fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: 1 }}>LEARN MORE →</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why us */}
      <section style={{ padding: "86px 5%", background: "rgba(8,8,8,0.8)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(200,16,46,0.07) 0%,transparent 70%)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMob ? "1fr" : "1fr 1fr", gap: isMob ? 32 : 65, alignItems: "center" }}>
          <div>
            <SH tag="Why Choose Us" left title="Quality Built on ||Trust|| & Excellence" />
            <p style={{ color: "#888", lineHeight: 1.82, marginBottom: 24, fontSize: 15 }}>Abeera Enterprises combines local expertise with international standards. We operate across Kenya's most challenging terrains, delivering infrastructure that transforms communities.</p>
            {["Certified engineers & skilled workforce", "Modern machinery and equipment fleet", "Timely delivery with quality guarantee", "Community-focused development approach", "Competitive pricing, no compromise"].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 11 }}>
                <div style={{ width: 19, height: 19, borderRadius: "50%", background: "rgba(200,16,46,0.16)", border: "1px solid #C8102E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: "#C8102E", fontSize: 10 }}>✓</span></div>
                <span style={{ color: "#ccc", fontSize: 14 }}>{f}</span>
              </div>
            ))}
            <button className="btn-p" style={{ marginTop: 20 }} onClick={() => setPage("About")}>About Us</button>
          </div>
          <div style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80" alt="" style={{ width: "100%", borderRadius: 16, filter: "brightness(0.76)" }} />
            <div style={{ position: "absolute", bottom: -16, left: -16, background: "linear-gradient(135deg,#C8102E,#8B0000)", padding: "18px 26px", borderRadius: 12, boxShadow: "0 14px 36px rgba(0,0,0,0.5)" }}>
              <div className="bebas" style={{ fontSize: 42, color: "#fff", lineHeight: 1 }}>2+</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, fontFamily: "'Rajdhani',sans-serif", letterSpacing: 1 }}>Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>
      {/* Projects */}
      <section style={{ padding: "86px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SH tag="Our Work" title="Recent ||Projects|| & Achievements" sub="Showcasing completed infrastructure projects transforming communities across Kenya" />
          <div style={{ display: "grid", gridTemplateColumns: isMob ? "1fr" : "repeat(3,1fr)", gap: 20 }}>
            {PROJECTS.slice(0, 3).map((p, i) => (
              <div key={i} className="glass" style={{ overflow: "hidden", transition: "transform 0.3s" }} onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"} onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}>
                <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                  <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)"} onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
                  <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(200,16,46,0.9)", padding: "3px 10px", borderRadius: 4, fontSize: 10, fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: 1 }}>{p.category}</div>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{p.title}</h3>
                  <p style={{ color: "#666", fontSize: 12, lineHeight: 1.5, marginBottom: 11 }}>{p.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 11 }}>
                    <span style={{ color: "#C8102E", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 14 }}>{p.value}</span>
                    <span style={{ color: "#444", fontSize: 12 }}>{p.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}><button className="btn-o" onClick={() => setPage("Portfolio")}>View All Projects</button></div>
        </div>
      </section>
      {/* CTA */}
      <section style={{ padding: "75px 5%", margin: "0 5% 75px", background: "linear-gradient(135deg,rgba(200,16,46,0.1),rgba(139,0,0,0.06))", border: "1px solid rgba(200,16,46,0.18)", borderTop: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, backdropFilter: "blur(24px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06),0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ maxWidth: 650, margin: "0 auto", textAlign: "center" }}>
          <h2 className="bebas" style={{ fontSize: "clamp(32px,5vw,64px)", marginBottom: 16 }}>READY TO BUILD YOUR <span style={{ color: "#C8102E" }}>VISION?</span></h2>
          <p style={{ color: "#888", fontSize: 16, marginBottom: 34, lineHeight: 1.7 }}>From concept to completion, Abeera Enterprises delivers excellence. Contact us for a free consultation.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-p" style={{ fontSize: 15, padding: "15px 36px" }} onClick={() => setPage("Contact")}>Start Your Project</button>
            <a href="tel:+254722819305" style={{ textDecoration: "none" }}><button className="btn-o" style={{ fontSize: 15, padding: "14px 36px" }}>📞 +254 722 819 305</button></a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage() {
  const isMob = useIsMobile();
  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: "65px 5% 45px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}><img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.12 }} /><div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#0A0A0A 0%,transparent 30%,transparent 70%,#0A0A0A 100%)" }} /></div>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2, textAlign: "center" }}>
          <span className="stag">About Us</span>
          <h1 className="bebas" style={{ fontSize: "clamp(48px,7vw,86px)", lineHeight: 0.95 }}>WHO WE <span style={{ color: "#C8102E" }}>ARE</span></h1>
          <p style={{ color: "#888", maxWidth: 520, margin: "16px auto 0", fontSize: 16, lineHeight: 1.7 }}>A proudly Kenyan construction company committed to nation-building through quality infrastructure</p>
        </div>
      </section>
      <section style={{ padding: "65px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMob ? "1fr" : "1fr 1fr", gap: isMob ? 28 : 65, alignItems: "center" }}>
          <div>
            <span className="stag">Our Story</span>
            <h2 className="bebas" style={{ fontSize: 46, marginBottom: 20 }}>FROM MANDERA TO <span style={{ color: "#C8102E" }}>KENYA</span></h2>
            {["Abeera Enterprises Limited was founded in June 2023 with a clear mission: to provide world-class construction and engineering services to Kenya, particularly in underserved regions like the North Eastern counties.", "Registered under the Companies Act, 2015 (No. PVT-BEUXP26A), we bring together experienced directors with deep roots in the region and a passionate team of engineers, project managers, and skilled artisans.", "We believe in building not just structures, but communities. Every road, borehole, building, and electrical installation we complete is a step towards a more connected and prosperous Kenya."].map((txt, i) => (
              <p key={i} style={{ color: "#888", lineHeight: 1.82, marginBottom: 15, fontSize: 14 }}>{txt}</p>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMob ? "1fr 1fr" : "1fr 1fr", gap: 13 }}>
            {["photo-1504307651254-35680f356dfd", "photo-1581094794329-c8112a89af12", "photo-1497435334941-8c899ee9e8e9", "photo-1541888946425-d81bb19240f5"].map((id, i) => (
              <img key={i} src={`https://images.unsplash.com/${id}?w=400&q=80`} alt="" style={{ borderRadius: 11, width: "100%", height: 185, objectFit: "cover", marginTop: i % 2 === 1 ? 20 : 0 }} />
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: "55px 5%", background: "rgba(200,16,46,0.04)", borderTop: "1px solid rgba(200,16,46,0.1)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SH tag="Company Details" title="Official ||Registration|| Information" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(225px,1fr))", gap: 16 }}>
            {[["Company Name", "Abeera Enterprises Limited"], ["Company Number", "PVT-BEUXP26A"], ["Date of Registration", "5th June 2023"], ["Share Capital", "KES 100,000 (1,000 shares)"], ["Registered Address", "P.O. Box 227, Mandera, Kenya"], ["Contact Phone", "+254 722 819 305"]].map(([k, v]) => (
              <div key={k} className="glass" style={{ padding: "17px 20px" }}>
                <div style={{ color: "#C8102E", fontSize: 10, fontFamily: "'Rajdhani',sans-serif", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{k}</div>
                <div style={{ color: "#F5F5F5", fontWeight: 500, fontSize: 13 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: "84px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SH tag="Our Values" title="Principles That ||Drive|| Us" sub="The core values guiding every decision at Abeera Enterprises" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(185px,1fr))", gap: 20 }}>
            {[["🏆", "Quality", "We never compromise on material quality or construction standards"], ["🤝", "Integrity", "Transparent dealings with clients, partners, and communities"], ["⏱️", "Timeliness", "On-time delivery is a commitment, not just a promise"], ["💡", "Innovation", "Embracing new technologies and modern construction methods"], ["🌍", "Community", "Prioritising local employment and community development"]].map(([icon, title, desc]) => (
              <div key={title} className="glass" style={{ padding: 24, textAlign: "center", transition: "transform 0.3s" }} onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"} onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}>
                <div style={{ fontSize: 36, marginBottom: 13 }}>{icon}</div>
                <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 17, color: "#C8102E", marginBottom: 7 }}>{title}</h3>
                <p style={{ color: "#666", fontSize: 12, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: "65px 5%", background: "rgba(8,8,8,0.5)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SH tag="Our Team" title="The People Behind ||Abeera||" sub="Led by experienced directors, backed by skilled professionals" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(225px,1fr))", gap: 24 }}>
            {TEAM.map((m, i) => (
              <div key={i} className="glass" style={{ overflow: "hidden", textAlign: "center" }}>
                <div style={{ height: 205, overflow: "hidden" }}><img src={m.image} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(22%)" }} /></div>
                <div style={{ padding: "17px 20px" }}>
                  <div style={{ width: "100%", height: 2, background: "linear-gradient(90deg,transparent,#C8102E,transparent)", marginBottom: 13 }} />
                  <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 3 }}>{m.name}</h3>
                  <p style={{ color: "#C8102E", fontSize: 11, fontFamily: "'Rajdhani',sans-serif", letterSpacing: 1 }}>{m.role}</p>
                  {m.shares && <p style={{ color: "#444", fontSize: 10, marginTop: 4 }}>{m.shares}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
function ServicesPage() {
  const [active, setActive] = useState(0);
  const isMob = useIsMobile();
  const s = SERVICES[active];
  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: "55px 5% 36px", textAlign: "center" }}>
        <span className="stag">What We Offer</span>
        <h1 className="bebas" style={{ fontSize: "clamp(46px,7vw,84px)", lineHeight: 0.95 }}>OUR <span style={{ color: "#C8102E" }}>SERVICES</span></h1>
      </section>
      <section style={{ padding: "0 5% 75px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 38, flexWrap: "wrap", justifyContent: "center" }}>
            {SERVICES.map((sv, i) => (
              <button key={sv.id} onClick={() => setActive(i)} style={{ background: active === i ? "linear-gradient(135deg,#C8102E,#8B0000)" : "rgba(255,255,255,0.05)", border: `1px solid ${active === i ? "transparent" : "rgba(255,255,255,0.1)"}`, color: "#fff", padding: "10px 20px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", gap: 7 }}>
                {sv.icon} {sv.title}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMob ? "1fr" : "1fr 1fr", gap: isMob ? 24 : 54, alignItems: "center" }}>
            <div key={active} style={{ animation: "slideInLeft 0.45s ease" }}>
              <div style={{ fontSize: 44, marginBottom: 13 }}>{s.icon}</div>
              <h2 className="bebas" style={{ fontSize: 48, marginBottom: 13 }}>{s.title.split(" ").map((w, i) => i === 0 ? <span key={i} style={{ color: "#C8102E" }}>{w} </span> : w + " ")}</h2>
              <p style={{ color: "#888", lineHeight: 1.82, marginBottom: 26, fontSize: 14 }}>{s.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                {s.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C8102E", flexShrink: 0 }} />
                    <span style={{ color: "#ccc", fontSize: 13 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button className="btn-p" style={{ marginTop: 26 }}>Request This Service</button>
            </div>
            <div key={`img-${active}`} style={{ position: "relative", animation: "slideInRight 0.45s ease" }}>
              <img src={s.image} alt={s.title} style={{ width: "100%", borderRadius: 16, filter: "brightness(0.8)" }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: `linear-gradient(135deg,${s.color}22,transparent)`, border: `1px solid ${s.color}33` }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PORTFOLIO PAGE ───────────────────────────────────────────────────────────
function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const isMob = useIsMobile();
  const cats = ["All", "Roads", "Building", "Water Works", "Electrical"];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter || p.category.includes(filter.replace(" Works", "")));
  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: "55px 5% 32px", textAlign: "center" }}>
        <span className="stag">Our Work</span>
        <h1 className="bebas" style={{ fontSize: "clamp(46px,7vw,84px)", lineHeight: 0.95 }}>PROJECT <span style={{ color: "#C8102E" }}>PORTFOLIO</span></h1>
        <p style={{ color: "#888", maxWidth: 480, margin: "16px auto 0", lineHeight: 1.7 }}>Completed infrastructure projects transforming communities across Kenya</p>
      </section>
      <div style={{ padding: "0 5% 32px", display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        {cats.map(c => <button key={c} onClick={() => setFilter(c)} style={{ background: filter === c ? "linear-gradient(135deg,#C8102E,#8B0000)" : "rgba(255,255,255,0.05)", border: `1px solid ${filter === c ? "transparent" : "rgba(255,255,255,0.1)"}`, color: "#fff", padding: "8px 20px", borderRadius: 6, fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.3s" }}>{c}</button>)}
      </div>
      <section style={{ padding: "0 5% 84px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMob ? "1fr" : "repeat(3,1fr)", gap: 22 }}>
          {filtered.map((p, i) => (
            <div key={i} className="glass" style={{ overflow: "hidden", animation: `fadeUp 0.5s ${i * 0.08}s both`, transition: "transform 0.3s" }} onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"} onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}>
              <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"} onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.6),transparent)" }} />
                <div style={{ position: "absolute", top: 11, left: 11, background: "rgba(200,16,46,0.9)", padding: "3px 10px", borderRadius: 4, fontSize: 10, fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: 1 }}>{p.category}</div>
              </div>
              <div style={{ padding: "18px 20px" }}>
                <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 7 }}>{p.title}</h3>
                <p style={{ color: "#666", fontSize: 12, lineHeight: 1.5, marginBottom: 12 }}>{p.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 11 }}>
                  <div><div style={{ color: "#C8102E", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 14 }}>{p.value}</div><div style={{ color: "#333", fontSize: 10, marginTop: 2 }}>Project Value</div></div>
                  <div style={{ textAlign: "right" }}><div style={{ color: "#999", fontFamily: "'Rajdhani',sans-serif", fontSize: 14 }}>{p.year}</div><div style={{ color: "#333", fontSize: 10, marginTop: 2 }}>Completion</div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: "50px 5%", background: "linear-gradient(135deg,rgba(200,16,46,0.1),rgba(139,0,0,0.06))", borderTop: "1px solid rgba(200,16,46,0.12)", borderBottom: "1px solid rgba(200,16,46,0.12)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMob ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 18, textAlign: "center" }}>
          {[["KES 150M+", "Total Project Value"], ["6", "Counties Served"], ["50+", "Projects Done"], ["100%", "Client Satisfaction"]].map(([v, l]) => (
            <div key={l}><div className="bebas" style={{ fontSize: 46, color: "#C8102E" }}>{v}</div><div style={{ color: "#666", fontFamily: "'Rajdhani',sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>{l}</div></div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const isMob = useIsMobile();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = () => {
    if (form.name && form.email && form.message) { setSent(true); setTimeout(() => setSent(false), 5000); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }
  };
  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: "55px 5% 65px", textAlign: "center" }}>
        <span className="stag">Get In Touch</span>
        <h1 className="bebas" style={{ fontSize: "clamp(46px,7vw,84px)", lineHeight: 0.95 }}>CONTACT <span style={{ color: "#C8102E" }}>US</span></h1>
        <p style={{ color: "#888", maxWidth: 460, margin: "16px auto 0", lineHeight: 1.7 }}>Ready to start your project? Get in touch for a free consultation and assessment</p>
      </section>
      <section style={{ padding: "0 5% 84px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMob ? "1fr" : "1fr 1.2fr", gap: isMob ? 28 : 52 }}>
          <div>
            <h2 className="bebas" style={{ fontSize: 38, marginBottom: 26 }}>LET'S BUILD <span style={{ color: "#C8102E" }}>TOGETHER</span></h2>
            {[{ icon: "📍", title: "Registered Office", lines: ["P.O. Box 227, Mandera, Kenya", "Bula Janhuria Street, Bula Building", "Nairobi North District"] }, { icon: "📞", title: "Phone", lines: ["+254 722 819 305"] }, { icon: "✉️", title: "Email", lines: ["abeeraeenterprise@gmail.com"] }, { icon: "⏰", title: "Working Hours", lines: ["Mon–Sat: 7AM – 6PM", "Sunday: Emergency calls only"] }].map((info, i) => (
              <div key={i} className="glass" style={{ padding: "17px 20px", marginBottom: 13, display: "flex", gap: 17, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24 }}>{info.icon}</span>
                <div>
                  <div style={{ color: "#C8102E", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{info.title}</div>
                  {info.lines.map((l, j) => <div key={j} style={{ color: "#bbb", fontSize: 13, lineHeight: 1.6 }}>{l}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div className="glass glass-deep" style={{ padding: 36 }}>
            <h3 className="bebas" style={{ fontSize: 28, marginBottom: 24 }}>SEND A <span style={{ color: "#C8102E" }}>MESSAGE</span></h3>
            {sent && <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#4ade80", fontSize: 13 }}>✅ Message sent! We'll respond within 24 hours.</div>}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13, marginBottom: 13 }}>
              <input placeholder="Your Name *" value={form.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm((p: any) => ({ ...p, name: e.target.value }))} />
              <input placeholder="Email Address *" value={form.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm((p: any) => ({ ...p, email: e.target.value }))} />
            </div>
            <input placeholder="Phone Number" value={form.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm((p: any) => ({ ...p, phone: e.target.value }))} style={{ marginBottom: 13 }} />
            <select value={form.service} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm((p: any) => ({ ...p, service: e.target.value }))} style={{ marginBottom: 13 }}>
              <option value="">Select Service Type</option>
              {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
            <textarea rows={5} placeholder="Describe your project... *" value={form.message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm((p: any) => ({ ...p, message: e.target.value }))} style={{ marginBottom: 17, resize: "vertical" }} />
            <button className="btn-p" style={{ width: "100%", fontSize: 15, padding: 14 }} onClick={handleSubmit}>Send Message →</button>
            <p style={{ color: "#333", fontSize: 11, marginTop: 11, textAlign: "center" }}>Your information is secure and never shared.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: string) => void }) {
  const isMob = useIsMobile();
  return (
    <footer style={{ background: "#040404", borderTop: "1px solid rgba(200,16,46,0.12)", padding: "52px 5% 26px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMob ? "1fr 1fr" : "2fr 1fr 1fr 1.4fr", gap: isMob ? 24 : 40, marginBottom: 40 }}>
          <div>
            <Logo size={38} />
            <p style={{ color: "#444", fontSize: 13, lineHeight: 1.75, marginTop: 13, maxWidth: 260 }}>Premier Kenyan construction and engineering company building the infrastructure that transforms communities.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 2, color: "#C8102E", textTransform: "uppercase", marginBottom: 16 }}>Navigate</h4>
            {["Home", "About", "Services", "Portfolio", "Contact"].map((l: string) => <div key={l} onClick={() => setPage(l)} style={{ color: "#444", fontSize: 13, marginBottom: 8, cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.color = "#F5F5F5"} onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.color = "#444"}>{l}</div>)}
          </div>
          <div>
            <h4 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 2, color: "#C8102E", textTransform: "uppercase", marginBottom: 16 }}>Services</h4>
            {["Roads Construction", "Building Works", "Water Works", "Mechanical Works", "Electrical Works"].map(s => <div key={s} style={{ color: "#444", fontSize: 13, marginBottom: 8 }}>{s}</div>)}
          </div>
          <div>
            <h4 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 2, color: "#C8102E", textTransform: "uppercase", marginBottom: 16 }}>Contact</h4>
            {[["📞", "+254 722 819 305"], ["✉️", "abeeraeenterprise@gmail.com"], ["📍", "P.O. Box 227, Mandera, Kenya"]].map(([icon, text]) => (
              <div key={text} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 12, flexShrink: 0 }}>{icon}</span>
                <span style={{ color: "#444", fontSize: 12, lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ color: "#2a2a2a", fontSize: 12 }}>© 2025 Abeera Enterprises Limited • PVT-BEUXP26A • All rights reserved.</span>
          <span style={{ color: "#C8102E", fontSize: 12, fontFamily: "'Rajdhani',sans-serif" }}>Registered under The Companies Act, 2015</span>
        </div>
      </div>
    </footer>
  );
}

// ─── RESPONSIVE HELPER ───────────────────────────────────────────────────────
function useIsMobile() {
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const check = () => setMob(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mob;
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const nav = useCallback((p: string) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  return (
    <>
      <style>{G}</style>
      <div style={{ minHeight: "100vh", background: "#0A0A0A" }}>
        <Navbar page={page} setPage={nav} />
        <main key={page} style={{ animation: "fadeIn 0.4s ease" }}>
          {page === "Home" && <HomePage setPage={nav} />}
          {page === "About" && <AboutPage />}
          {page === "Services" && <ServicesPage />}
          {page === "Portfolio" && <PortfolioPage />}
          {page === "Contact" && <ContactPage />}
        </main>
        <Footer setPage={nav} />
        <Chatbot />
      </div>
    </>
  );
}
