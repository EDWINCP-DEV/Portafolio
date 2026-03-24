import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'
import emailjs from '@emailjs/browser'

// === COMPONENTE: ENSAMBLAJE DE HARDWARE & TRADING ===
const HardwareAssembly = () => {
  const [stage, setStage] = useState(0);
  const components = [
    { label: "CPU: TICs ENGINEER Core", detail: "8vo Semestre // Promedio 9.1" },
    { label: "RAM: High Performance UX", detail: "Especialista Mobile" },
    { label: "NETWORK: English B2", detail: "Certificación Global" },
    { label: "LOGIC: Java & JS Modules", detail: "Robust System Architecture" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev < components.length ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(timer);
  }, [components.length]);

  return (
    <div className="relative w-full max-w-lg mb-12">
      <div className="grid grid-cols-1 gap-4">
        {components.map((comp, i) => (
          <motion.div
            key={i}
            initial={{ x: i % 2 === 0 ? -150 : 150, opacity: 0, rotateX: 45 }}
            animate={stage > i ? { x: 0, opacity: 1, rotateX: 0 } : {}}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="bg-white/5 border border-white/10 p-5 rounded-2xl flex justify-between items-center group hover:bg-red-600/5 hover:border-red-600/30 transition-all"
          >
            <div className="text-left">
              <p className="text-red-500 font-black text-[10px] uppercase tracking-[0.2em] mb-1">{comp.label}</p>
              <p className="text-slate-400 text-[11px] font-mono italic">{comp.detail}</p>
            </div>
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_15px_#dc2626]"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// === PANTALLA DE ACCESO PERSONALIZADA ===
const WelcomeScreen = ({ onEnter }) => {
  const [clientName, setClientName] = useState('');

  return (
    <motion.div 
      className="fixed inset-0 bg-[#010409] z-[100] flex flex-col items-center justify-center p-6 overflow-hidden"
      exit={{ y: "-100%", filter: "blur(20px)", transition: { duration: 0.9, ease: [0.9, 0.1, 0.3, 0.96] } }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%"><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" /></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
      </div>
      <motion.div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        <HardwareAssembly />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.5 }} className="w-full bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[3.5rem] shadow-2xl text-center">
          <h1 className="text-white text-4xl font-black mb-8 tracking-tighter italic">EwinCP<span className="text-red-600">-dev</span></h1>
          <input type="text" placeholder="Introduce tu nombre..." value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-slate-600 focus:border-red-600 focus:outline-none transition-all text-center font-bold text-sm mb-8" />
          <motion.button whileHover={{ scale: 1.05, letterSpacing: "0.4em", backgroundColor: "#dc2626" }} whileTap={{ scale: 0.95 }} onClick={() => onEnter(clientName || 'Invitado')} className="w-full py-5 border-2 border-red-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-red-600/20">Construir Ecosistema</motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// === COMPONENTE PRINCIPAL ===
export default function App() {
  const [userName, setUserName] = useState('');
  const [hasEntered, setHasEntered] = useState(false);
  const form = useRef();

  // Configuración de Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 120 });

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / 30);
      mouseY.set((e.clientY - window.innerHeight / 2) / 30);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Función de Envío EmailJS
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_wcs373v', 'template_iuxt5nc', form.current, 'K4b2DrhqeJqdHH1mT')
      .then(() => {
          alert("¡Ticket enviado con éxito! Me pondré en contacto contigo pronto.");
          form.current.reset();
      }, () => {
          alert("Error al enviar el ticket. Inténtalo de nuevo.");
      });
  };

  return (
    <>
      <AnimatePresence>
        {!hasEntered && <WelcomeScreen onEnter={(name) => { setUserName(name); setHasEntered(true); }} />}
      </AnimatePresence>

      <div className={`min-h-screen bg-[#010409] text-slate-200 font-sans selection:bg-red-600/50 ${!hasEntered ? 'h-screen overflow-hidden' : ''}`}>
        
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 p-8">
          <motion.div className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-2xl border border-white/10 p-5 rounded-3xl" initial={{ opacity: 0, y: -100 }} animate={hasEntered ? { opacity: 1, y: 0 } : {}}>
            <h1 className="text-2xl font-black tracking-tighter italic">EwinCP<span className="text-red-600">-dev</span></h1>
            <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <a href="#sobre-mi" className="hover:text-red-500 transition-colors">Bio</a>
              <a href="#servicios" className="hover:text-red-500 transition-colors">Servicios</a>
              <a href="#proyectos" className="hover:text-red-500 transition-colors">Portafolio</a>
              <a href="#contacto" className="hover:text-red-500 transition-colors">Contacto</a>
            </div>
          </motion.div>
        </nav>

        <motion.main style={{ x: springX, y: springY }} className="max-w-7xl mx-auto px-6 pt-64 pb-24 relative">
          
          {/* Hero */}
          <motion.section className="mb-56" initial={{ opacity: 0, x: -50 }} animate={hasEntered ? { opacity: 1, x: 0 } : {}}>
            <p className="text-red-600 font-mono text-sm font-black mb-6 uppercase tracking-[0.6em]">// Bienvenido al sistema, {userName}.</p>
            <h2 className="text-8xl md:text-[180px] font-black text-white leading-[0.75] tracking-tighter mb-16 italic">SYSTEM <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-red-600 uppercase">Creator.</span></h2>
            <div className="max-w-3xl border-l-8 border-red-600 pl-12"><p className="text-3xl text-slate-400 font-medium leading-relaxed italic">Ingeniero en TICs especializado en tecnologías móviles y arquitecturas nativas de alto impacto.</p></div>
          </motion.section>

          {/* SOBRE MÍ */}
          <section id="sobre-mi" className="mb-64 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -50 }}>
              <h3 className="text-xs font-black text-red-600 uppercase tracking-[0.8em] mb-8">Bio // Perfil</h3>
              <p className="text-2xl text-white font-bold leading-snug mb-8 tracking-tight">Estudiante de 8vo semestre en el TESCO con un promedio de 9.1. Especialista en desarrollo móvil y soluciones fullstack de alto rendimiento.</p>
              <p className="text-slate-500 leading-relaxed font-medium italic">Como CEO de Lynx Gaming, lidero la gestión de recursos digitales y presencia estratégica. Mi enfoque une la infraestructura técnica con una experiencia de usuario impecable.</p>
            </motion.div>
            <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] text-center shadow-2xl">
              <div className="text-6xl mb-6">🏆</div>
              <p className="text-white font-black text-2xl italic mb-2 tracking-tighter">HACKATEC 2025</p>
              <p className="text-red-600 font-black text-[10px] uppercase tracking-widest">2do Lugar Local // Software Inteligente</p>
            </div>
          </section>

          {/* SERVICIOS */}
          <section id="servicios" className="mb-64">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.8em] mb-24 text-center">Módulos de Inversión</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
              <div className="bg-[#0d1117] border border-white/5 p-12 rounded-[3.5rem] group hover:border-red-600/50 transition-all flex flex-col justify-between">
                <div>
                  <h4 className="text-red-500 font-black text-[10px] uppercase tracking-widest mb-6 font-mono">Digitalización</h4>
                  <h3 className="text-4xl font-black text-white mb-6 italic tracking-tighter uppercase leading-none">Landing Pages</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-10">Desarrollo nativo de sitios de alta conversión. Incluye diseño UI moderno y arquitectura escalable.</p>
                  <div className="flex flex-wrap gap-3 mb-10">
                    {['Java', 'JS', 'PHP', 'SQL', 'React', 'Tailwind'].map((tool) => (
                      <span key={tool} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest">{tool}</span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/5 pt-8">
                  <p className="text-white font-black text-2xl mb-1">$2,500 - $5,000 <span className="text-xs text-slate-500 font-mono">MXN</span></p>
                  <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest italic">*Pago único por desarrollo</p>
                </div>
              </div>

              <div className="bg-[#0d1117] border border-white/5 p-12 rounded-[3.5rem] group hover:border-red-600/50 transition-all flex flex-col justify-between">
                <div>
                  <h4 className="text-red-500 font-black text-[10px] uppercase tracking-widest mb-6 font-mono">Mantenimiento</h4>
                  <h3 className="text-4xl font-black text-white mb-6 italic tracking-tighter uppercase leading-none">Soporte IT</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-10">Gestión integral de entornos digitales. Mantenimiento de hardware, redes y servicios cloud.</p>
                  <div className="flex flex-wrap gap-3 mb-10">
                    {['Hardware', 'Windows', 'Network', 'Security', 'Cloud'].map((tool) => (
                      <span key={tool} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest">{tool}</span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/5 pt-8">
                  <p className="text-white font-black text-2xl mb-1">$300 <span className="text-xs text-slate-500 font-mono">MXN / MES</span></p>
                  <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest italic">*Suscripción mensual de soporte</p>
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
              <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
                <h3 className="text-white font-black text-xs uppercase tracking-[0.4em]">Service & Infrastructure Details</h3>
                <span className="text-[9px] font-mono text-red-500 animate-pulse">SYSTEM_ACTIVE</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 text-left font-mono">
                <div className="p-8 border-b md:border-b-0 md:border-r border-white/5">
                  <p className="text-red-600 font-black text-[10px] uppercase mb-4 tracking-widest">// Desarrollo</p>
                  <ul className="text-slate-500 text-[11px] space-y-3"><li>• UI/UX Personalizado</li><li>• Lógica de Programación</li><li>• Integración NoSQL/SQL</li><li>• SEO & Carga Optimizada</li></ul>
                </div>
                <div className="p-8 border-b md:border-b-0 md:border-r border-white/5">
                  <p className="text-red-600 font-black text-[10px] uppercase mb-4 tracking-widest">// Infraestructura</p>
                  <ul className="text-slate-500 text-[11px] space-y-3"><li>• Gestión de Hosting (Externo)</li><li>• Costo Host: $800 - $1600/año</li><li>• Mantenimiento a Equipos</li><li>• Configuración de Redes</li></ul>
                </div>
                <div className="p-8 bg-red-600/5">
                  <p className="text-white font-black text-[10px] uppercase mb-4 tracking-widest">// Beneficios</p>
                  <ul className="text-slate-300 text-[11px] space-y-3 italic"><li>• Consultoría en Digitalización</li><li>• Soporte Técnico Mensual</li><li>• Análisis de Conversión</li><li>• Inglés B2 Certificado</li></ul>
                </div>
              </div>
            </motion.div>
          </section>

          {/* PROYECTOS */}
          <section id="proyectos" className="mb-64">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.8em] mb-24">Exp_01 // Portafolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <motion.div whileHover={{ y: -20, rotateZ: -1 }} className="group relative bg-[#0d1117] border border-white/5 rounded-[4.5rem] p-14 overflow-hidden shadow-2xl transition-all">
                <div className="absolute top-0 right-0 p-12 text-9xl font-black text-white/[0.02] group-hover:text-red-600/10 transition-colors">01</div>
                <span className="text-red-500 font-mono text-xs uppercase font-bold mb-6 block tracking-widest">Mobile Architecture</span>
                <h3 className="text-6xl font-black text-white mb-10 tracking-tighter leading-none">Futbol<br/>Xperience</h3>
                <a href="https://futbolxperience-cca9d.web.app/" target="_blank" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white hover:text-red-600 transition-colors">Explorar App <span className="text-2xl transition-transform group-hover:translate-x-3">→</span></a>
              </motion.div>
              <motion.div whileHover={{ y: -20, rotateZ: 1 }} className="group relative bg-[#0d1117] border border-white/5 rounded-[4.5rem] p-14 overflow-hidden shadow-2xl transition-all">
                <div className="absolute top-0 right-0 p-12 text-9xl font-black text-white/[0.02] group-hover:text-orange-500/10 transition-colors">02</div>
                <span className="text-orange-500 font-mono text-xs uppercase font-bold mb-6 block tracking-widest">Digital Strategy & UX</span>
                <h3 className="text-6xl font-black text-white mb-10 tracking-tighter leading-none">Tamales<br/>Don Shrek</h3>
                <span className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/30 italic">Proyecto Activo <span className="text-2xl transition-transform">×</span></span>
              </motion.div>
            </div>
          </section>

          {/* FOOTER: FORMULARIO Y CONTACTO */}
          <footer id="contacto" className="pt-32 border-t border-white/5 pb-20 bg-[#010409]">
            <div className="max-w-6xl mx-auto px-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="bg-white/[0.02] border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl">
                  <h4 className="text-red-500 font-black text-[10px] uppercase tracking-[0.4em] mb-8 font-mono">// Iniciar Ticket de Proyecto</h4>
                  <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input name="from_name" type="text" placeholder="Nombre Completo" required className="bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-red-600 outline-none transition-all" />
                      <select name="service_type" className="bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm text-slate-400 focus:border-red-600 outline-none transition-all appearance-none">
                        <option value="Landing Page">Landing Page</option>
                        <option value="Soporte IT">Soporte IT / Host</option>
                        <option value="Personalización">Personalización Pro</option>
                      </select>
                      <input name="user_email" type="email" placeholder="Correo Electrónico" required className="bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-red-600 outline-none transition-all" />
                      <input name="user_phone" type="tel" placeholder="WhatsApp (10 dígitos)" required className="bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-red-600 outline-none transition-all" />
                    </div>
                    <textarea name="message" placeholder="Cuéntame sobre tu necesidad..." rows="4" required className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-red-600 outline-none transition-all resize-none"></textarea>
                    <motion.button type="submit" whileHover={{ scale: 1.02, backgroundColor: "#dc2626" }} whileTap={{ scale: 0.98 }} className="w-full py-4 bg-transparent border-2 border-red-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all">Enviar Requerimiento</motion.button>
                  </form>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-5xl font-black text-white mb-10 tracking-tighter leading-none italic uppercase">Listo para <br /> <span className="text-red-600">Construir.</span></h3>
                  <div className="space-y-8 mb-12">
                    <div className="flex flex-col gap-2"><span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Correo Oficial</span><a href="mailto:edwincorona44@gmail.com" className="text-xl font-bold text-white hover:text-red-500 transition-colors italic uppercase">edwincorona44@gmail.com</a></div>
                    <div className="flex flex-col gap-2"><span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">WhatsApp</span><a href="https://wa.me/5579436135" target="_blank" className="text-xl font-bold text-white hover:text-red-500 transition-colors italic uppercase">+52 55 7943 6135</a></div>
                  </div>
                  <div className="pt-8 border-t border-white/5 flex gap-8 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] font-mono"><span>Ecatepec, Edo. Méx</span><span>EwinCP-dev // 2026</span></div>
                </div>
              </motion.div>
            </div>
          </footer>
        </motion.main>
      </div>
    </>
  )
}