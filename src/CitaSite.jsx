import React, { useEffect, useMemo, useState } from "react";
import {
  Menu, X, Instagram, Eye, Lock, MapPin, Mail, Phone, ArrowRight,
  Network, Rocket, CalendarDays, Building2, Minus, Plus, LogOut,
} from "lucide-react";
import logoFundoAzul from "./assets/logo-fundo-azul.png";
import logoAnptech2026 from "./assets/logo-anptech2026.jpeg";

/* =========================================================================
   Dados do site — equivalente ao includes/config.php da versão PHP
   ========================================================================= */

const NAV_ITEMS = [
  { label: "Início", href: "inicio" },
  { label: "Próximos Eventos", href: "eventos" },
  { label: "Anptech Summit 2026", href: "anptech" },
  { label: "Sobre Nós", href: "sobre" },
  { label: "Contato", href: "contato" },
];

const INSTAGRAM_URL = "https://www.instagram.com/cit.aracatuba/";

const EVENTOS = [
  {
    diaNum: "15", diaMes: "MAI",
    titulo: "ANPTECH Summit 2026",
    local: "Vívere Eventi, Araçatuba — SP",
    descricao:
      "Principal encontro de tecnologia e inovação da Alta Noroeste Paulista, reunindo empresas, startups, poder público e instituições de ensino em dois dias de palestras, painéis e feira de negócios.",
    destaque: true,
    href: "anptech",
  },
  {
    diaNum: "—", diaMes: "EM BREVE",
    titulo: "Rodada de Mentoria CITA Hub",
    local: "Sede do CITA, Araçatuba — SP",
    descricao:
      "Encontro mensal de orientação para startups em incubação, com mentores parceiros do ecossistema Sebrae Startups.",
    destaque: false,
    href: "contato",
  },
  {
    diaNum: "—", diaMes: "EM BREVE",
    titulo: "Noite do Empreendedor Tech",
    local: "Distrito de Inovação, Araçatuba — SP",
    descricao:
      "Networking aberto entre empresas de tecnologia, estudantes e poder público para fortalecer a cultura de inovação da região.",
    destaque: false,
    href: "contato",
  },
];

const NOTICIAS = [
  {
    titulo: "ANPTECH Summit 26 começa e reforça o polo de inovação de Araçatuba",
    fonte: "Prefeitura Municipal de Araçatuba",
    data: "13 de maio de 2026",
    resumo:
      'A Prefeitura de Araçatuba anunciou a abertura do ANPTECH Summit 26, evento gratuito realizado no Vívere Eventi nos dias 15 e 16 de maio. Com o tema "Um Distrito de Inovação em Ação", o encontro reuniu cerca de 3 mil participantes entre empresas, startups, estudantes e representantes do setor público, com palestras sobre transformação digital, inteligência artificial aplicada e carreira em tecnologia, além de uma feira de negócios com cerca de 30 expositores.',
    link: "https://aracatuba.sp.gov.br/noticias/anptech-summit-26-comea-sexta-e-refora-polo-de-inovao-em-araatuba",
  },
  {
    titulo: "UniSALESIANO destaca inovação e protagonismo acadêmico no ANPTECH Summit 2026",
    fonte: "UniSALESIANO Araçatuba",
    data: "19 de maio de 2026",
    resumo:
      "Parceiro do movimento desde sua criação, o UniSALESIANO participou do Summit — promovido pelo CITA, Centro de Inovação Tecnológica de Araçatuba — com um estande institucional que reuniu projetos de Engenharia, Desenvolvimento de Sistemas e Jogos Digitais. O evento, que reuniu mais de 2 mil visitantes, contou com a atuação de acadêmicos na organização do estande institucional, incluindo alunos de Análise e Desenvolvimento de Sistemas e de Tecnologia em Desenvolvimento de Sistemas.",
    link: "https://unisalesiano.com.br/aracatuba/unisalesiano-destaca-inovacao-e-protagonismo-estudantil-no-anptech-summit-2026/",
  },
];

const ANPTECH_PROGRAMACAO = [
  {
    dia: "Sexta-feira, 15 de maio",
    itens: [
      "10h — Cerimônia de abertura, com autoridades e lideranças da região",
      '10h30 — "Município Digital": tecnologia aplicada à gestão pública',
      '11h — "Solinftec, uma história de Araçatuba para o mundo"',
      "16h — Painel sobre a incubadora da Unesp de Ilha Solteira e cases de startups",
      "17h — Bastidores de um ex-sócio do iFood sobre empreender do zero",
    ],
  },
  {
    dia: "Sábado, 16 de maio",
    itens: [
      'Painel "A carreira e o mercado de TI"',
      "Roda de conversa com jovens profissionais de tecnologia",
      "Operação e logística de um grande e-commerce, do clique à entrega",
    ],
  },
];

const ANPTECH_NUMEROS = [
  { valor: "3 mil", legenda: "participantes esperados nos dois dias de evento" },
  { valor: "30", legenda: "empresas na feira de negócios e tecnologia" },
  { valor: "2", legenda: "dias de palestras, painéis e rodas de conversa" },
  { valor: "5", legenda: "cidades da região representadas no Summit" },
];

const PILARES = [
  {
    Icon: Network,
    titulo: "Ecossistema conectado",
    texto: "Articulação entre empresas de tecnologia, startups, universidades e poder público em um distrito de inovação regional.",
  },
  {
    Icon: Rocket,
    titulo: "Incubação CITA Hub",
    texto: "Mentoria, capacitação e conexões de mercado para startups em fase inicial, em parceria com o Sebrae Startups.",
  },
  {
    Icon: CalendarDays,
    titulo: "Eventos e formação",
    texto: "Realização e apoio a encontros como o ANPTECH Summit, aproximando estudantes, docentes e mercado de trabalho.",
  },
  {
    Icon: Building2,
    titulo: "Fortalecimento regional",
    texto: "Presença conjunta com cidades como Birigui, Penápolis, Guararapes, Andradina e Ilha Solteira, consolidando a Alta Noroeste como polo tech.",
  },
];

const FILTROS_A11Y = [
  { valor: "normal", titulo: "Padrão", desc: "Sem filtro de cor" },
  { valor: "protanopia", titulo: "Protanopia", desc: "Dificuldade com o vermelho" },
  { valor: "deuteranopia", titulo: "Deuteranopia", desc: "Dificuldade com o verde" },
  { valor: "tritanopia", titulo: "Tritanopia", desc: "Dificuldade com o azul" },
  { valor: "alto-contraste", titulo: "Alto contraste", desc: "Reforça o contraste geral" },
];

/* =========================================================================
   Fontes — Space Grotesk (display), Inter (corpo), JetBrains Mono (dados)
   ========================================================================= */

function useGoogleFonts() {
  useEffect(() => {
    const id = "cita-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

const FONT_DISPLAY = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };
const FONT_BODY = { fontFamily: "'Inter', system-ui, sans-serif" };
const FONT_MONO = { fontFamily: "'JetBrains Mono', monospace" };

/* Filtros SVG de daltonismo — mesmas matrizes usadas na versão PHP */
function FiltrosSVG() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="filtro-protanopia">
          <feColorMatrix type="matrix" values="0.567,0.433,0,0,0  0.558,0.442,0,0,0  0,0.242,0.758,0,0  0,0,0,1,0" />
        </filter>
        <filter id="filtro-deuteranopia">
          <feColorMatrix type="matrix" values="0.625,0.375,0,0,0  0.7,0.3,0,0,0  0,0.3,0.7,0,0  0,0,0,1,0" />
        </filter>
        <filter id="filtro-tritanopia">
          <feColorMatrix type="matrix" values="0.95,0.05,0,0,0  0,0.433,0.567,0,0  0,0.475,0.525,0,0  0,0,0,1,0" />
        </filter>
      </defs>
    </svg>
  );
}

/* =========================================================================
   Componente principal
   ========================================================================= */

export default function CitaSite() {
  useGoogleFonts();

  const [menuAberto, setMenuAberto] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState("inicio");
  const [modalAdmin, setModalAdmin] = useState(false);
  const [modalA11y, setModalA11y] = useState(false);

  const [a11yFiltro, setA11yFiltro] = useState("normal");
  const [a11yFonte, setA11yFonte] = useState(0); // 0..3

  const [login, setLogin] = useState({ usuario: "", senha: "" });
  const [loginErro, setLoginErro] = useState("");
  const [logado, setLogado] = useState(false);

  const [contato, setContato] = useState({ nome: "", email: "", telefone: "", perfil: "startup", mensagem: "" });
  const [contatoStatus, setContatoStatus] = useState(null); // {tipo, texto}

  function irPara(id) {
    setMenuAberto(false);
    setSecaoAtiva(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const filtroCss = useMemo(() => {
    if (a11yFiltro === "protanopia") return "url(#filtro-protanopia)";
    if (a11yFiltro === "deuteranopia") return "url(#filtro-deuteranopia)";
    if (a11yFiltro === "tritanopia") return "url(#filtro-tritanopia)";
    if (a11yFiltro === "alto-contraste") return "contrast(1.28) saturate(1.05)";
    return "none";
  }, [a11yFiltro]);

  const zoomStyle = { zoom: 1 + a11yFonte * 0.1 };

  function enviarLogin() {
    // Demonstração client-side apenas — em produção, autentique no backend.
    if (login.usuario === "admin" && login.senha === "cita2026") {
      setLogado(true);
      setLoginErro("");
      setModalAdmin(false);
    } else {
      setLoginErro("Usuário ou senha inválidos.");
    }
  }

  function enviarContato() {
    if (!contato.nome || !contato.mensagem || !/^\S+@\S+\.\S+$/.test(contato.email)) {
      setContatoStatus({ tipo: "erro", texto: "Preencha nome, e-mail válido e mensagem antes de enviar." });
      return;
    }
    setContatoStatus({ tipo: "ok", texto: "Mensagem enviada! A equipe do CITA vai retornar em breve pelo e-mail informado." });
    setContato({ nome: "", email: "", telefone: "", perfil: "startup", mensagem: "" });
  }

  return (
    <div style={{ ...FONT_BODY, filter: filtroCss }} className="bg-slate-50 text-slate-900">
      <FiltrosSVG />
      <div style={zoomStyle}>

        {/* ============================= NAV FLUTUANTE ============================= */}
        <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
          <nav className="pointer-events-auto flex items-center gap-1 bg-slate-950/80 backdrop-blur-lg border border-white/10 rounded-full p-2 shadow-2xl max-w-full">
            <button onClick={() => irPara("inicio")} className="flex items-center gap-2 px-3 py-1.5 font-semibold text-slate-50 text-sm whitespace-nowrap" style={FONT_DISPLAY}>
              <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_0_3px_rgba(249,115,22,0.25)]" />
              CITA
            </button>

            <ul className="hidden md:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => irPara(item.href)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      secaoAtiva === item.href ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CITA no Instagram"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full ml-1 flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#4f5bd5,#962fbf,#d62976,#fa7e1e,#feda75)" }}
            >
              <Instagram size={17} color="#fff" />
            </a>

            <button
              onClick={() => setMenuAberto((v) => !v)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-white"
              aria-label="Abrir menu"
            >
              {menuAberto ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>

        {menuAberto && (
          <div className="fixed top-20 left-4 right-4 z-40 md:hidden bg-slate-950/95 rounded-2xl p-3 shadow-2xl flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => irPara(item.href)}
                className="text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 flex items-center gap-2"
            >
              <Instagram size={16} /> Instagram
            </a>
          </div>
        )}

        {/* ============================= BOTÕES FLUTUANTES DIREITA ============================= */}
        <div className="fixed top-5 right-4 z-50 flex flex-col gap-2.5">
          <div className="relative group">
            <button
              onClick={() => setModalA11y(true)}
              className="w-11 h-11 rounded-full bg-slate-900 border border-slate-700 text-white flex items-center justify-center shadow-xl hover:bg-orange-500 hover:border-orange-500 transition-colors"
              aria-label="Acessibilidade para daltonismo"
            >
              <Eye size={18} />
            </button>
            <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Acessibilidade para daltonismo
            </span>
          </div>
          <div className="relative group">
            <button
              onClick={() => (logado ? setLogado(false) : setModalAdmin(true))}
              className="w-11 h-11 rounded-full bg-slate-900 border border-slate-700 text-white flex items-center justify-center shadow-xl hover:bg-orange-500 hover:border-orange-500 transition-colors"
              aria-label={logado ? "Sair do painel admin" : "Login Admin"}
            >
              {logado ? <LogOut size={18} /> : <Lock size={18} />}
            </button>
            <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {logado ? "Sair (logado como admin)" : "Login Admin"}
            </span>
          </div>
        </div>

        <main>
          {/* ============================= HERO / INÍCIO ============================= */}
          <section
            id="inicio"
            className="relative min-h-screen flex items-center overflow-hidden text-slate-50 pt-36 pb-20"
            style={{
              backgroundImage: `url(${logoFundoAzul})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-slate-950/80" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                backgroundSize: "52px 52px",
              }}
            />
            <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g stroke="#3b82f6" strokeOpacity="0.35" strokeWidth="1.2">
                <line x1="120" y1="140" x2="360" y2="260" />
                <line x1="360" y1="260" x2="640" y2="180" />
                <line x1="640" y1="180" x2="900" y2="320" />
                <line x1="360" y1="260" x2="420" y2="520" />
                <line x1="420" y1="520" x2="700" y2="600" />
                <line x1="700" y1="600" x2="960" y2="500" />
                <line x1="900" y1="320" x2="960" y2="500" />
                <line x1="120" y1="140" x2="420" y2="520" />
                <line x1="640" y1="180" x2="700" y2="600" />
              </g>
              <g fill="#f97316">
                <circle cx="120" cy="140" r="5" />
                <circle cx="900" cy="320" r="4" />
                <circle cx="700" cy="600" r="4" />
              </g>
              <g fill="#3b82f6">
                <circle cx="360" cy="260" r="4" />
                <circle cx="640" cy="180" r="4" />
                <circle cx="420" cy="520" r="4" />
                <circle cx="960" cy="500" r="4" />
              </g>
            </svg>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
              <div className="max-w-2xl">
                <p className="flex items-center gap-2.5 text-orange-500 text-xs tracking-widest uppercase mb-4" style={FONT_MONO}>
                  <span className="w-5 h-px bg-orange-500 inline-block" />
                  Distrito de Inovação de Araçatuba
                </p>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5" style={FONT_DISPLAY}>
                  Onde empresas, startups, ensino e poder público se <span className="text-orange-500">conectam</span>.
                </h1>
                <p className="text-slate-400 text-lg max-w-lg mb-8">
                  O CITA — Centro de Inovação e Tecnologia de Araçatuba articula o ecossistema tech da Alta Noroeste Paulista: incubação de startups, eventos, capacitação e conexão direta com o mercado.
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  <button onClick={() => irPara("anptech")} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors" style={FONT_DISPLAY}>
                    Ver ANPTECH Summit 2026
                  </button>
                  <button onClick={() => irPara("sobre")} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 hover:border-orange-500 hover:text-orange-500 text-slate-100 font-semibold text-sm transition-colors" style={FONT_DISPLAY}>
                    Conhecer o CITA
                  </button>
                </div>
                <div className="flex flex-wrap gap-8 border-t border-slate-800 pt-6">
                  {ANPTECH_NUMEROS.map((n) => (
                    <div key={n.legenda}>
                      <div className="text-2xl font-bold text-slate-50" style={FONT_DISPLAY}>{n.valor}</div>
                      <div className="text-xs text-slate-400 max-w-[140px]">{n.legenda}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ============================= EVENTOS ============================= */}
          <section id="eventos" className="py-24 bg-slate-50">
            <div className="max-w-6xl mx-auto px-6">
              <div className="max-w-xl mb-14">
                <p className="flex items-center gap-2.5 text-orange-500 text-xs tracking-widest uppercase mb-3.5" style={FONT_MONO}>
                  <span className="w-5 h-px bg-orange-500 inline-block" /> Agenda
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-3" style={FONT_DISPLAY}>Próximos eventos</h2>
                <p className="text-slate-500">Encontros, mentorias e imersões que aproximam o ecossistema de inovação de Araçatuba.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {EVENTOS.map((ev) => (
                  <article
                    key={ev.titulo}
                    className={`rounded-2xl p-6 flex flex-col gap-3.5 border transition-transform hover:-translate-y-1 ${
                      ev.destaque ? "bg-slate-950 text-slate-50 border-slate-950" : "bg-white border-slate-200 hover:shadow-lg"
                    }`}
                  >
                    <div style={FONT_MONO}>
                      <div className="text-2xl font-bold leading-none">{ev.diaNum}</div>
                      <div className={`text-xs tracking-wider mt-1 ${ev.destaque ? "text-orange-400" : "text-orange-500"}`}>{ev.diaMes}</div>
                    </div>
                    <h3 className="text-lg font-bold" style={FONT_DISPLAY}>{ev.titulo}</h3>
                    <div className={`flex items-center gap-1.5 text-xs ${ev.destaque ? "text-blue-300" : "text-blue-600"}`} style={FONT_MONO}>
                      <MapPin size={13} /> {ev.local}
                    </div>
                    <p className={`text-sm ${ev.destaque ? "text-slate-400" : "text-slate-500"}`}>{ev.descricao}</p>
                    <button onClick={() => irPara(ev.href)} className={`mt-auto text-sm font-semibold inline-flex items-center gap-1.5 ${ev.destaque ? "text-orange-400" : "text-orange-500"}`}>
                      Saiba mais <ArrowRight size={14} />
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ============================= ANPTECH SUMMIT ============================= */}
          <section id="anptech" className="py-24 bg-slate-100">
            <div className="max-w-6xl mx-auto px-6">
              <div
                className="relative overflow-hidden rounded-3xl text-slate-50 p-8 md:p-14 mb-14"
                style={{
                  backgroundImage: `url(${logoAnptech2026})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-slate-950/80" />
                <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-40" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.35), transparent 70%)" }} />
                <p className="relative z-10 text-orange-300 text-xs tracking-widest uppercase mb-4" style={FONT_MONO}>15 e 16 de maio · Vívere Eventi, Araçatuba</p>
                <h2 className="relative z-10 text-3xl md:text-4xl font-bold max-w-2xl mb-4" style={FONT_DISPLAY}>
                  ANPTECH Summit 2026: "Um Distrito de Inovação em Ação"
                </h2>
                <p className="relative z-10 text-slate-400 max-w-xl">
                  O principal encontro de tecnologia e inovação da Alta Noroeste Paulista integra o movimento de construção do ANPTECH — o distrito de inovação que conecta empresas, startups, instituições de ensino e poder público, transformando potencial tecnológico em novos negócios e renda para a região.
                </p>
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
                  {ANPTECH_NUMEROS.map((n) => (
                    <div key={n.legenda}>
                      <div className="text-3xl font-bold text-orange-500" style={FONT_DISPLAY}>{n.valor}</div>
                      <div className="text-xs text-slate-400">{n.legenda}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  {ANPTECH_PROGRAMACAO.map((dia) => (
                    <div key={dia.dia} className="mb-8">
                      <h4 className="text-orange-600 text-xs tracking-wide uppercase mb-4" style={FONT_MONO}>{dia.dia}</h4>
                      <ul className="flex flex-col gap-3">
                        {dia.itens.map((item) => (
                          <li key={item} className="bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-slate-800">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-orange-500 text-xs tracking-widest uppercase mb-3.5" style={FONT_MONO}>Ecossistema regional</p>
                  <h3 className="text-xl font-bold mb-4" style={FONT_DISPLAY}>Sala de aula e mercado, lado a lado</h3>
                  <p className="text-slate-500 text-sm mb-4">
                    Escolas técnicas, faculdades e universidades da região apresentam projetos desenvolvidos por alunos, aproximando a produção acadêmica local das empresas de tecnologia. Cidades como Penápolis, Birigui, Guararapes, Andradina e Ilha Solteira também marcam presença na programação e na área de exposição, reforçando a Alta Noroeste como polo de inovação.
                  </p>
                  <p className="text-slate-500 text-sm mb-6">
                    O UniSALESIANO, parceiro do movimento desde sua criação, participou com um estande institucional reunindo projetos de Engenharia, Desenvolvimento de Sistemas e Jogos Digitais — incluindo protótipos, automação, aplicativos e uma impressora 3D — com apoio direto de acadêmicos na recepção do público e apresentação dos projetos.
                  </p>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 hover:border-orange-500 hover:text-orange-500 text-slate-700 font-semibold text-sm transition-colors" style={FONT_DISPLAY}>
                    Acompanhar cobertura no Instagram
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ============================= NOTÍCIAS ============================= */}
          <section id="noticias" className="py-24 bg-slate-950 text-slate-50">
            <div className="max-w-6xl mx-auto px-6">
              <div className="max-w-xl mb-14">
                <p className="flex items-center gap-2.5 text-orange-500 text-xs tracking-widest uppercase mb-3.5" style={FONT_MONO}>
                  <span className="w-5 h-px bg-orange-500 inline-block" /> Na imprensa
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-3" style={FONT_DISPLAY}>Notícias</h2>
                <p className="text-slate-400">O que a imprensa e os parceiros do ecossistema andam falando sobre a inovação em Araçatuba.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {NOTICIAS.map((n) => (
                  <article key={n.titulo} className="border border-slate-800 hover:border-orange-500 rounded-2xl p-7 flex flex-col gap-3 transition-colors hover:-translate-y-1">
                    <span className="text-emerald-400 text-xs uppercase tracking-wide" style={FONT_MONO}>{n.fonte} · {n.data}</span>
                    <h3 className="text-xl font-bold" style={FONT_DISPLAY}>{n.titulo}</h3>
                    <p className="text-slate-400 text-sm">{n.resumo}</p>
                    <a href={n.link} target="_blank" rel="noopener noreferrer" className="mt-auto text-orange-500 text-sm font-semibold inline-flex items-center gap-1.5">
                      Ler matéria completa <ArrowRight size={14} />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ============================= SOBRE NÓS ============================= */}
          <section id="sobre" className="py-24 bg-slate-50">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
              <div>
                <p className="flex items-center gap-2.5 text-orange-500 text-xs tracking-widest uppercase mb-3.5" style={FONT_MONO}>
                  <span className="w-5 h-px bg-orange-500 inline-block" /> Quem somos
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={FONT_DISPLAY}>O ponto de encontro da inovação em Araçatuba</h2>
                <p className="text-slate-500 mb-4">
                  O CITA — Centro de Inovação e Tecnologia de Araçatuba nasceu para articular o ecossistema de tecnologia da Alta Noroeste Paulista, aproximando empresas, startups, instituições de ensino e poder público em torno de um mesmo objetivo: transformar potencial tecnológico em novos negócios, geração de renda e cultura de inovação para a região.
                </p>
                <p className="text-slate-500 mb-6">
                  Por meio do programa de incubação <strong>CITA Hub</strong>, realizado em parceria com a plataforma Sebrae Startups, o Centro oferece suporte estruturado para startups de Araçatuba e região — da validação da ideia aos primeiros passos rumo ao mercado.
                </p>
                <div className="inline-flex items-center gap-2.5 bg-slate-950 text-slate-50 px-5 py-2.5 rounded-full text-xs" style={FONT_MONO}>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Programa de Incubação CITA Hub · parceria Sebrae Startups
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {PILARES.map(({ Icon, titulo, texto }) => (
                  <div key={titulo} className="flex gap-4 p-5 bg-white border border-slate-200 rounded-2xl">
                    <div className="w-11 h-11 rounded-xl bg-slate-950 text-orange-500 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={FONT_DISPLAY}>{titulo}</h4>
                      <p className="text-sm text-slate-500 m-0">{texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================= CONTATO ============================= */}
          <section id="contato" className="py-24 bg-slate-950 text-slate-50">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[0.85fr_1.15fr] gap-14">
              <div>
                <p className="text-orange-300 text-xs tracking-widest uppercase mb-3.5" style={FONT_MONO}>Fale com o CITA</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={FONT_DISPLAY}>Vamos conversar sobre o seu projeto</h2>
                <p className="text-slate-400 mb-6">Startup em fase inicial, empresa parceira ou instituição de ensino — conte um pouco sobre a sua ideia e a equipe do CITA retorna o contato.</p>

                <div className="flex gap-3.5 py-4 border-b border-slate-800">
                  <Mail size={20} className="text-orange-500 flex-shrink-0" />
                  <div><strong className="block text-sm">E-mail</strong><span className="text-slate-400 text-sm">contato@cita.org.br</span></div>
                </div>
                <div className="flex gap-3.5 py-4 border-b border-slate-800">
                  <Phone size={20} className="text-orange-500 flex-shrink-0" />
                  <div><strong className="block text-sm">Telefone</strong><span className="text-slate-400 text-sm">(18) 3000-0000</span></div>
                </div>
                <div className="flex gap-3.5 py-4 border-b border-slate-800">
                  <MapPin size={20} className="text-orange-500 flex-shrink-0" />
                  <div><strong className="block text-sm">Onde estamos</strong><span className="text-slate-400 text-sm">Araçatuba — SP, Alta Noroeste Paulista</span></div>
                </div>
                <div className="flex gap-3.5 py-4">
                  <Instagram size={20} className="text-orange-500 flex-shrink-0" />
                  <div><strong className="block text-sm">Instagram</strong>
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-slate-100 text-sm underline">@cit.aracatuba</a>
                  </div>
                </div>
              </div>

              <div>
                {contatoStatus && (
                  <div className={`px-4 py-3.5 rounded-lg text-sm mb-4 ${contatoStatus.tipo === "ok" ? "bg-emerald-400/10 border border-emerald-400 text-emerald-300" : "bg-orange-500/10 border border-orange-500 text-orange-300"}`}>
                    {contatoStatus.texto}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400" htmlFor="nome">Nome completo</label>
                    <input id="nome" value={contato.nome} onChange={(e) => setContato({ ...contato, nome: e.target.value })}
                      className="bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-lg px-3.5 py-3 text-sm outline-none" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400" htmlFor="email">E-mail</label>
                    <input id="email" type="email" value={contato.email} onChange={(e) => setContato({ ...contato, email: e.target.value })}
                      className="bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-lg px-3.5 py-3 text-sm outline-none" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400" htmlFor="perfil">Perfil</label>
                    <select id="perfil" value={contato.perfil} onChange={(e) => setContato({ ...contato, perfil: e.target.value })}
                      className="bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-lg px-3.5 py-3 text-sm outline-none">
                      <option value="startup">Startup</option>
                      <option value="empresa">Empresa parceira</option>
                      <option value="estudante">Estudante / academia</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400" htmlFor="telefone">Telefone (opcional)</label>
                    <input id="telefone" value={contato.telefone} onChange={(e) => setContato({ ...contato, telefone: e.target.value })}
                      className="bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-lg px-3.5 py-3 text-sm outline-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-xs text-slate-400" htmlFor="mensagem">Mensagem</label>
                  <textarea id="mensagem" rows={4} value={contato.mensagem} onChange={(e) => setContato({ ...contato, mensagem: e.target.value })}
                    className="bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-lg px-3.5 py-3 text-sm outline-none resize-y" />
                </div>
                <button onClick={enviarContato} className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors" style={FONT_DISPLAY}>
                  Enviar mensagem
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* ============================= RODAPÉ ============================= */}
        <footer className="bg-slate-950 border-t border-slate-800 py-10 text-slate-400 text-sm">
          <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-slate-50 font-semibold" style={FONT_DISPLAY}>
              <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
              CITA — Centro de Inovação e Tecnologia de Araçatuba
            </div>
            <div>&copy; {new Date().getFullYear()} CITA. Todos os direitos reservados.</div>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">@cit.aracatuba</a>
          </div>
        </footer>

        {/* ============================= MODAL ADMIN ============================= */}
        {modalAdmin && (
          <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-[1000] flex items-center justify-center p-5" onClick={(e) => e.target === e.currentTarget && setModalAdmin(false)}>
            <div className="bg-slate-50 text-slate-900 rounded-3xl w-full max-w-sm p-8 relative shadow-2xl max-h-[88vh] overflow-y-auto">
              <button onClick={() => setModalAdmin(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-orange-500 hover:text-white flex items-center justify-center" aria-label="Fechar">
                <X size={16} />
              </button>
              <p className="text-orange-500 text-xs tracking-widest uppercase mb-2" style={FONT_MONO}>Área restrita</p>
              <h3 className="text-2xl font-bold mb-2" style={FONT_DISPLAY}>Login do administrador</h3>
              <p className="text-sm text-slate-500 mb-6">Acesso exclusivo para a equipe do CITA gerenciar eventos e notícias do site.</p>

              {loginErro && <div className="bg-orange-500/10 border border-orange-500 text-orange-600 px-4 py-3 rounded-lg text-sm mb-4">{loginErro}</div>}

              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-xs text-slate-500" htmlFor="admin_usuario">Usuário</label>
                <input id="admin_usuario" value={login.usuario} onChange={(e) => setLogin({ ...login, usuario: e.target.value })}
                  className="bg-white border border-slate-200 focus:border-orange-500 rounded-lg px-3.5 py-3 text-sm outline-none" />
              </div>
              <div className="flex flex-col gap-1.5 mb-2">
                <label className="text-xs text-slate-500" htmlFor="admin_senha">Senha</label>
                <input id="admin_senha" type="password" value={login.senha} onChange={(e) => setLogin({ ...login, senha: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && enviarLogin()}
                  className="bg-white border border-slate-200 focus:border-orange-500 rounded-lg px-3.5 py-3 text-sm outline-none" />
              </div>
              <p className="text-xs text-slate-400 mb-4">Demonstração: usuário <code>admin</code>, senha <code>cita2026</code>.</p>
              <button onClick={enviarLogin} className="w-full px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors" style={FONT_DISPLAY}>
                Entrar
              </button>
            </div>
          </div>
        )}

        {/* ============================= MODAL ACESSIBILIDADE ============================= */}
        {modalA11y && (
          <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-[1000] flex items-center justify-center p-5" onClick={(e) => e.target === e.currentTarget && setModalA11y(false)}>
            <div className="bg-slate-50 text-slate-900 rounded-3xl w-full max-w-sm p-8 relative shadow-2xl max-h-[88vh] overflow-y-auto">
              <button onClick={() => setModalA11y(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-orange-500 hover:text-white flex items-center justify-center" aria-label="Fechar">
                <X size={16} />
              </button>
              <p className="text-orange-500 text-xs tracking-widest uppercase mb-2" style={FONT_MONO}>Acessibilidade</p>
              <h3 className="text-2xl font-bold mb-2" style={FONT_DISPLAY}>Modo para daltonismo</h3>
              <p className="text-sm text-slate-500 mb-6">Ajuste as cores do site para o seu tipo de percepção de cor.</p>

              <div className="flex flex-col gap-2.5 mb-5">
                {FILTROS_A11Y.map((f) => (
                  <label key={f.valor} className={`flex items-center justify-between gap-3 px-4 py-3.5 border rounded-lg cursor-pointer transition-colors ${a11yFiltro === f.valor ? "border-orange-500" : "border-slate-200 hover:border-orange-500"}`}>
                    <div className="flex flex-col">
                      <strong className="text-sm">{f.titulo}</strong>
                      <span className="text-xs text-slate-500">{f.desc}</span>
                    </div>
                    <input type="radio" name="a11y-filtro" checked={a11yFiltro === f.valor} onChange={() => setA11yFiltro(f.valor)} className="w-[18px] h-[18px] accent-orange-500" />
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 px-4 py-3.5 border border-slate-200 rounded-lg mb-4">
                <span className="text-sm">Tamanho do texto</span>
                <div className="flex gap-2">
                  <button onClick={() => setA11yFonte((v) => Math.max(0, v - 1))} className="w-8 h-8 rounded-full border border-slate-200 hover:border-orange-500 flex items-center justify-center" aria-label="Diminuir texto">
                    <Minus size={14} />
                  </button>
                  <button onClick={() => setA11yFonte((v) => Math.min(3, v + 1))} className="w-8 h-8 rounded-full border border-slate-200 hover:border-orange-500 flex items-center justify-center" aria-label="Aumentar texto">
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <button onClick={() => { setA11yFiltro("normal"); setA11yFonte(0); }} className="w-full text-center py-3 rounded-lg border border-slate-200 hover:border-orange-500 hover:text-orange-500 text-sm text-slate-500 transition-colors">
                Restaurar padrão
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
