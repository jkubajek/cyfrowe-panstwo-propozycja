import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, Check, ChevronRight, Clock, Layers, Menu, ShieldCheck, X } from 'lucide-react';
import { pillars, principles, serviceFlow, theses } from './data';
import { MobileMenu, PillarSection } from './components/PolicyUI';
import type { NavItem } from './components/PolicyUI';

const pillarNav: NavItem[] = pillars.map((p) => ({ id: p.id, label: p.shortTitle, roman: p.roman }));
const nav: NavItem[] = [
  { id: 'skrot', label: 'W skrócie', roman: '→' },
  ...pillarNav
];

function scrollTo(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Hash-based deep links work on any static host (GitHub Pages, S3, Cloud Storage) without server rewrites
  if (typeof window !== 'undefined' && window.history?.replaceState) {
    const hash = id === 'top' ? '' : `#${id}`;
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`);
  }
}

const today = ['Silosy danych i powtarzanie tych samych informacji', 'Cyfrowy formularz obok ręcznego procesu', 'Projekty kończące się na pilotażu', 'Osobne zakupy podobnych narzędzi'];
const target = ['Once-only i API-first', 'Cyfrowy proces od początku do końca', 'Stałe połączenia między rejestrami', 'Wspólne komponenty i ścieżka od prototypu do wdrożenia'];

export default function App() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('skrot');
  const [menuOpen, setMenuOpen] = useState(false);
  const [flowStep, setFlowStep] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
      const sections = nav.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => el !== null);
      const current = [...sections].reverse().find((section) => section.getBoundingClientRect().top <= 180);
      if (current) setActive(current.id);
    };
    onScroll();
    const initialHash = decodeURIComponent(window.location.hash.replace('#', ''));
    if (initialHash) {
      window.setTimeout(() => document.getElementById(initialHash)?.scrollIntoView({ block: 'start' }), 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const step = serviceFlow[flowStep];

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950 selection:bg-blue-200">
      <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-slate-200" aria-hidden="true">
        <div className="h-full bg-blue-700 transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-stone-50/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
          <button onClick={() => scrollTo('top')} className="flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4" aria-label="Wróć na początek">
            <span className="grid h-8 w-8 place-items-center bg-slate-950 text-xs font-bold text-white">CP</span>
            <span className="hidden text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 md:block">Propozycja programowa</span>
          </button>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Nawigacja">
            {nav.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} aria-current={active === item.id ? 'true' : undefined} className={`rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${active === item.id ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-950'}`}>
                <span className="mr-1.5 font-mono text-xs opacity-70">{item.roman}</span>{item.label}
              </button>
            ))}
          </nav>
          <button onClick={() => setMenuOpen(true)} className="rounded-sm p-2 text-slate-800 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 lg:hidden" aria-label="Otwórz menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} nav={nav} active={active} onSelect={scrollTo} />

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-slate-200">
          <div className="absolute right-0 top-0 hidden h-full w-1/3 border-l border-slate-200 bg-slate-100 lg:block" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[2fr_1fr]">
            <div className="px-4 py-16 md:px-6 md:py-24 lg:px-8 lg:py-32">
              <div className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-800"><span className="h-px w-10 bg-blue-700" />Materiał do dyskusji</div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-6xl lg:text-7xl">Cyfrowe państwo,<br /><span className="text-blue-800">które działa jako system</span></h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-2xl">Propozycja wybranych zmian w cyfryzacji Polski.</p>
              <p className="mt-5 flex items-center gap-3 text-sm text-slate-700">
                <span className="grid h-8 w-8 place-items-center rounded-sm bg-blue-800 text-xs font-bold text-white" aria-hidden="true">JK</span>
                <span>Autor: <strong className="font-semibold text-slate-950">Jakub Kubajek</strong></span>
              </p>
              <p className="mt-8 max-w-2xl border-l-2 border-red-700 pl-5 text-sm leading-7 text-slate-700 md:text-base">Wiele elementów już istnieje lub powstaje. Wyzwaniem jest połączenie ich w trwały, interoperacyjny system i doprowadzenie do powszechnego działania.</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <button onClick={() => scrollTo('skrot')} className="inline-flex h-12 items-center gap-2 rounded-sm bg-slate-950 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4">Najważniejsze w 1 minutę <ArrowDown className="h-4 w-4" /></button>
                <button onClick={() => scrollTo('filary')} className="inline-flex h-12 items-center gap-2 rounded-sm border border-slate-400 bg-white px-5 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:border-slate-950 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4">Cztery filary <ArrowRight className="h-4 w-4" /></button>
              </div>
            </div>
            <aside className="relative flex items-end bg-slate-100 px-4 py-10 md:px-6 lg:px-8 lg:py-16">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Jak czytać</p>
                <ol className="space-y-3 text-sm leading-6 text-slate-700">
                  <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-blue-800" /><span><strong>1 min</strong> — sześć tez w skrócie</span></li>
                  <li className="flex gap-3"><Layers className="mt-0.5 h-4 w-4 shrink-0 text-blue-800" /><span><strong>5–10 min</strong> — filary i jednozdaniowe postulaty</span></li>
                  <li className="flex gap-3"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-800" /><span><strong>Szczegóły</strong> — rozwiń postulat: na czym polega, po co, zastrzeżenia</span></li>
                </ol>
                <p className="mt-6 max-w-xs text-xs leading-5 text-slate-500">To nie jest pełny program cyfryzacji ani raport o stanie wdrożeń — to selektywny zestaw priorytetów do dyskusji.</p>
              </div>
            </aside>
          </div>
        </section>

        {/* SKRÓT */}
        <section id="skrot" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24" aria-labelledby="skrot-title">
          <div className="mb-10 flex items-end justify-between gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800">W skrócie</p>
              <h2 id="skrot-title" className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">Sześć tez, które streszczają całość</h2>
            </div>
            <div className="hidden font-mono text-6xl text-slate-200 md:block" aria-hidden="true">0{theses.length}</div>
          </div>
          <ol className="grid grid-cols-1 border-l border-t border-slate-300 md:grid-cols-2 lg:grid-cols-3">
            {theses.map((item, i) => (
              <li key={item} className="min-h-36 border-b border-r border-slate-300 bg-white p-6 md:min-h-44">
                <span className="font-mono text-sm font-bold text-blue-800">0{i + 1}</span>
                <p className="mt-6 text-base font-semibold leading-7 md:text-lg">{item}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* DZIŚ / DOCELOWO */}
        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 md:pb-20 lg:px-8 lg:pb-24" aria-labelledby="problem-title">
          <h2 id="problem-title" className="mb-8 text-xl font-semibold tracking-tight md:text-2xl lg:text-3xl">Od fragmentów do wspólnego systemu</h2>
          <div className="grid grid-cols-1 overflow-hidden border border-slate-300 bg-white md:grid-cols-2">
            <div className="border-b border-slate-300 p-6 md:border-b-0 md:border-r lg:p-10">
              <p className="mb-6 font-mono text-sm font-semibold uppercase tracking-widest text-red-700">Dziś</p>
              <ul className="space-y-4">{today.map((x) => <li key={x} className="flex gap-3 text-slate-700"><X className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />{x}</li>)}</ul>
            </div>
            <div className="bg-slate-950 p-6 text-white lg:p-10">
              <p className="mb-6 font-mono text-sm font-semibold uppercase tracking-widest text-blue-300">Docelowo</p>
              <ul className="space-y-4">{target.map((x) => <li key={x} className="flex gap-3 text-slate-200"><Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />{x}</li>)}</ul>
            </div>
          </div>
        </section>

        {/* FILARY */}
        <section id="filary" className="scroll-mt-24 border-y border-slate-200 bg-white py-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800">Architektura propozycji</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">Cztery filary.<br />Jedna logika zmiany.</h2>
                <p className="mt-5 max-w-md leading-7 text-slate-600">Cyfrowe procesy → dane → AI, a równolegle krajowe kompetencje i firmy. Kolejność jest logiczna, ale prace idą równolegle — wdrożenia AI nie czekają na ukończenie wszystkich integracji.</p>
              </div>
              <div className="grid grid-cols-1 gap-px border border-slate-300 bg-slate-300 md:grid-cols-2">
                {pillars.map((p) => (
                  <button key={p.id} onClick={() => scrollTo(p.id)} className="group min-h-44 bg-stone-50 p-6 text-left transition-colors duration-200 hover:bg-blue-50 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-sm font-bold text-blue-800">{p.roman} · {p.role}</span>
                      <ArrowRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-800" />
                    </div>
                    <h3 className="mt-8 text-lg font-semibold tracking-tight md:text-xl">{p.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{p.postulates.length} postulatów</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-10 border-t border-slate-300 pt-6">
              <div className="mb-4 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-blue-800" /><span className="text-xs font-bold uppercase tracking-widest text-slate-500">Warunki wspólne dla każdego projektu</span></div>
              <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                {principles.map((p, i) => <li key={p} className="border border-slate-200 bg-stone-50 p-4 text-sm font-medium leading-6 text-slate-800"><span className="mr-2 font-mono text-xs text-blue-800">{i + 1}.</span>{p}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <div>{pillars.map((pillar, index) => <PillarSection key={pillar.id} pillar={pillar} index={index} />)}</div>

        {/* JAK TO SIĘ ŁĄCZY */}
        <section id="polaczenie" className="scroll-mt-24 bg-slate-950 py-16 text-white md:py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Jak to się łączy</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">Jedna sprawa.<br />Cały system.</h2>
                <p className="mt-5 max-w-md leading-7 text-slate-300">Przykład pokazuje zależności między filarami, nie konkretny produkt. Wybierz etap.</p>
              </div>
              <div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {serviceFlow.map((s, i) => (
                    <button key={s.title} onClick={() => setFlowStep(i)} aria-pressed={flowStep === i} className={`min-h-28 border p-5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${flowStep === i ? 'border-blue-400 bg-blue-900/50' : 'border-slate-700 bg-slate-900 hover:border-slate-500'}`}>
                      <span className="font-mono text-xs text-blue-300">{String(i + 1).padStart(2, '0')} · filar {s.pillar}</span>
                      <h3 className="mt-4 font-semibold">{s.title}</h3>
                    </button>
                  ))}
                </div>
                {step && <div className="mt-3 border-l-2 border-blue-400 bg-slate-900 p-5 text-sm leading-6 text-slate-200" aria-live="polite">{step.detail}</div>}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-300 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-28">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_0.5fr]">
              <blockquote className="text-2xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl">Nie więcej aplikacji i więcej AI, lecz mniej obowiązków dla obywatela, sprawniejszy obieg informacji, lepsze decyzje publiczne i silniejsze polskie firmy technologiczne.</blockquote>
              <div className="flex items-end"><p className="border-l-2 border-red-700 pl-4 text-sm leading-6 text-slate-600">Propozycja do dyskusji</p></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <span>Cyfrowe państwo, które działa jako system</span>
          <span>Autor: <span className="font-semibold text-slate-200">Jakub Kubajek</span></span>
          <span>Materiał selektywny • nieoficjalny • do dyskusji</span>
        </div>
      </footer>
    </div>
  );
}
