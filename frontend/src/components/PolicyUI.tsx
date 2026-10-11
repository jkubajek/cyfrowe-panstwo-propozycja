import * as Accordion from '@radix-ui/react-accordion';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronDown, Database, Landmark, Network, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import type { Pillar, Postulate } from '../data';
import { applications, automationFlow, dataInfrastructureFlow, missionFlow } from '../data';

export type NavItem = { id: string; label: string; roman: string };

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nav: NavItem[];
  active: string;
  onSelect: (id: string) => void;
};

export function MobileMenu({ open, onOpenChange, nav, active, onSelect }: MobileMenuProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-slate-950/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[80] w-[min(88vw,380px)] bg-stone-50 p-6 shadow-2xl focus:outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-sm font-bold uppercase tracking-widest">Nawigacja</Dialog.Title>
            <Dialog.Close className="rounded-sm p-2 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700">
              <X className="h-5 w-5" /><span className="sr-only">Zamknij</span>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Przejdź do wybranej części propozycji</Dialog.Description>
          <nav className="mt-10 space-y-2">
            {nav.map((item) => (
              <button key={item.id} onClick={() => { onSelect(item.id); onOpenChange(false); }} className={`flex w-full items-center gap-4 border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${active === item.id ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-300 bg-white hover:border-slate-500'}`}>
                <span className="w-6 font-mono text-xs opacity-70">{item.roman}</span>
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Icon({ name }: { name: Pillar['icon'] }) {
  const cls = 'h-6 w-6';
  if (name === 'database') return <Database className={cls} />;
  if (name === 'sparkles') return <Sparkles className={cls} />;
  if (name === 'landmark') return <Landmark className={cls} />;
  return <Network className={cls} />;
}

function ApplicationMatrix() {
  return (
    <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {applications.map((item) => (
        <Dialog.Root key={item.title}>
          <Dialog.Trigger asChild>
            <button className="group flex min-h-20 items-end justify-between gap-3 border border-slate-300 bg-stone-50 p-4 text-left transition-colors duration-200 hover:border-blue-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700">
              <span className="font-semibold leading-5">{item.title}</span>
              <span className="text-xl text-blue-800 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-[70] bg-slate-950/60 backdrop-blur-sm" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-[80] w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-2xl focus:outline-none md:p-8">
              <div className="flex justify-between gap-6">
                <Dialog.Title className="text-2xl font-semibold">{item.title}</Dialog.Title>
                <Dialog.Close className="h-9 w-9 shrink-0 rounded-sm border border-slate-300 p-2 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700">
                  <X className="h-4 w-4" /><span className="sr-only">Zamknij</span>
                </Dialog.Close>
              </div>
              <Dialog.Description className="mt-6 text-base leading-7 text-slate-700">{item.text}</Dialog.Description>
              <p className="mt-6 border-l-2 border-blue-700 pl-4 text-sm text-slate-500">Klasa zastosowań do rozważenia — nie opis istniejącego wdrożenia.</p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ))}
    </div>
  );
}

/** Przepływ: pionowo na telefonie, poziomo od tabletu — bez przewijania w bok. */
function StepFlow({ items, label, footnote }: { items: string[]; label: string; footnote?: string }) {
  return (
    <div className="mt-5 border border-slate-300 bg-white p-4 md:p-5" aria-label={label}>
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-800">{label}</p>
      <ol className="flex flex-col gap-1 md:flex-row md:items-stretch md:gap-0">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item} className="flex flex-1 flex-col md:flex-row md:items-center">
              <div className={`flex min-h-12 flex-1 items-center gap-3 border p-3 text-sm font-semibold leading-5 md:min-h-24 md:flex-col md:items-start md:justify-between ${last ? 'border-blue-800 bg-blue-800 text-white' : 'border-slate-300 bg-stone-50 text-slate-800'}`}>
                <span className="font-mono text-[10px] opacity-60">{String(i + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </div>
              {!last && (
                <span className="self-center text-slate-400 md:px-1" aria-hidden="true">
                  <span className="md:hidden">↓</span><span className="hidden md:inline">→</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {footnote && <p className="mt-4 text-xs leading-5 text-slate-500">{footnote}</p>}
    </div>
  );
}

function PostulateContent({ item }: { item: Postulate }) {
  return (
    <div className="pb-6 pr-2 md:pl-14 md:pr-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-800">Na czym polega</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{item.essence}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-800">Po co</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{item.purpose}</p>
        </div>
      </div>
      {item.caveat && (
        <div className="mt-5 border-l-2 border-red-700 bg-red-50/40 px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-800">{item.caveatTitle ?? 'Ważne zastrzeżenie'}</p>
          <p className="mt-1 text-sm leading-6 text-slate-700">{item.caveat}</p>
        </div>
      )}
      {item.kind === 'data-flow' && <StepFlow items={dataInfrastructureFlow} label="Stały przepływ danych" footnote="Dane mogą pozostawać u gestorów lub w kontrolowanej warstwie analitycznej." />}
      {item.kind === 'matrix' && <ApplicationMatrix />}
      {item.kind === 'flow' && <StepFlow items={automationFlow} label="Podział pracy: AI i człowiek" />}
      {item.kind === 'mission' && <StepFlow items={missionFlow} label="Ścieżka programu misyjnego" footnote="Ostatni etap — zakup i wdrożenie — jest częścią programu od początku, nie późniejszym dodatkiem." />}
    </div>
  );
}

export function PillarSection({ pillar, index }: { pillar: Pillar; index: number }) {
  const [open, setOpen] = useState<string[]>([]);
  const allValues = pillar.postulates.map((_, i) => `${pillar.id}-${i}`);
  const allOpen = open.length === allValues.length;
  const shaded = index % 2 === 1;

  return (
    <section id={pillar.id} className={`scroll-mt-20 border-b border-slate-300 py-16 md:py-20 lg:py-28 ${shaded ? 'bg-slate-100' : 'bg-stone-50'}`} aria-labelledby={`${pillar.id}-title`}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 md:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:gap-10 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-6 flex h-12 w-12 items-center justify-center bg-slate-950 text-white"><Icon name={pillar.icon} /></div>
          <p className="font-mono text-sm font-bold text-blue-800">FILAR {pillar.roman} · {pillar.role}</p>
          <h2 id={`${pillar.id}-title`} className="mt-3 max-w-sm text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">{pillar.title}</h2>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-600">{pillar.summary}</p>
          <button
            onClick={() => setOpen(allOpen ? [] : allValues)}
            className="mt-6 inline-flex items-center gap-2 rounded-sm border border-slate-400 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 transition-colors hover:border-slate-950 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${allOpen ? 'rotate-180' : ''}`} />
            {allOpen ? 'Zwiń szczegóły' : 'Rozwiń wszystkie szczegóły'}
          </button>
        </div>
        <Accordion.Root type="multiple" value={open} onValueChange={setOpen} className="border-t border-slate-400">
          {pillar.postulates.map((item, i) => (
            <Accordion.Item key={item.title} value={`${pillar.id}-${i}`} className="border-b border-slate-300">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-start gap-4 py-5 pr-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-700 md:py-6">
                  <span className="mt-1 w-8 shrink-0 font-mono text-xs text-slate-500 md:w-10">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1">
                    <span className="block text-base font-semibold tracking-tight md:text-lg">{item.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">{item.lead}</span>
                  </span>
                  <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <PostulateContent item={item} />
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
