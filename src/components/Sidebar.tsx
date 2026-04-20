import { Link, useParams } from 'react-router-dom';
import { useProgressStore } from '../store/progressStore';
import syllabus from '../data/syllabus.json';
import ProgressBar from './ProgressBar';
import { useEffect, useRef, useState } from 'react';

interface SyllabusItem {
  id: string;
  title: string;
  moduleName: string;
  moduleNumber: number;
  slug: string;
  estimatedMinutes: number;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { moduleSlug, lessonSlug } = useParams();
  const currentSlug = moduleSlug && lessonSlug ? `${moduleSlug}/${lessonSlug}` : '';
  const isComplete = useProgressStore((s) => s.isComplete);
  const activeRef = useRef<HTMLAnchorElement>(null);

  // Group by module
  const modules = syllabus.reduce<
    Record<number, { name: string; items: SyllabusItem[] }>
  >((acc, item) => {
    if (!acc[item.moduleNumber]) {
      acc[item.moduleNumber] = { name: item.moduleName, items: [] };
    }
    acc[item.moduleNumber].items.push(item);
    return acc;
  }, {});

  const moduleNumbers = Object.keys(modules)
    .map(Number)
    .sort((a, b) => a - b);

  // Find which module the current lesson belongs to
  const currentModuleNum = moduleNumbers.find((num) =>
    modules[num].items.some((item) => item.slug === currentSlug)
  ) ?? null;

  // Controlled accordion — only one module open at a time
  const [openModule, setOpenModule] = useState<number | null>(currentModuleNum);

  // Update open module when navigating to a different module
  useEffect(() => {
    if (currentModuleNum !== null) {
      setOpenModule(currentModuleNum);
    }
  }, [currentModuleNum]);

  // Scroll active item into view when sidebar opens
  useEffect(() => {
    if (isOpen && activeRef.current) {
      activeRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [isOpen]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleModule = (num: number) => {
    setOpenModule((prev) => (prev === num ? null : num));
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[280px] max-w-[85vw] bg-white border-r border-cs-cream-dark flex flex-col transition-transform duration-300 ease-in-out lg:w-72 lg:max-w-none lg:translate-x-0 lg:z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Course navigation"
      >
        <div className="flex-shrink-0 bg-white p-4 border-b border-cs-cream-dark">
          <div className="flex items-center justify-between">
            <Link to="/" className="block">
              <h1 className="font-display text-lg font-bold text-cs-blue">
                CS Universal
              </h1>
              <p className="text-xs text-cs-slate-light font-body mt-0.5">
                Computer Science from Zero
              </p>
            </Link>
            {/* Close button — visible on mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 -mr-2 rounded-md hover:bg-cs-cream-dark transition-colors"
              aria-label="Close navigation"
            >
              <svg className="w-5 h-5 text-cs-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-3">
            <ProgressBar />
          </div>
        </div>

        <nav className="flex-1 overflow-hidden flex flex-col p-2">
          {moduleNumbers.map((num) => {
            const mod = modules[num];
            const moduleCompleted = mod.items.filter((item) =>
              isComplete(item.id)
            ).length;
            const moduleTotal = mod.items.length;
            const modulePercent = moduleTotal > 0
              ? Math.round((moduleCompleted / moduleTotal) * 100)
              : 0;
            const isOpen = openModule === num;

            return (
              <div key={num} className={`flex flex-col min-h-0 ${isOpen ? 'flex-1' : 'flex-shrink-0'}`}>
                <button
                  onClick={() => toggleModule(num)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-cs-cream-dark active:bg-cs-cream-dark transition-colors text-sm font-display font-semibold text-cs-slate select-none w-full text-left"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-mono text-cs-slate-light bg-cs-cream-dark rounded px-1.5 py-0.5 flex-shrink-0">
                      {num}
                    </span>
                    <span className="truncate">{mod.name}</span>
                  </span>
                  <span className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[10px] text-cs-slate-light font-mono">
                      {moduleCompleted}/{moduleTotal}
                    </span>
                    <svg
                      className={`w-4 h-4 text-cs-slate-light transition-transform ${isOpen ? 'rotate-90' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <>
                    {/* Module mini progress bar */}
                    <div className="mx-3 mb-1">
                      <div className="h-1 bg-cs-cream-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cs-green rounded-full transition-all duration-300"
                          style={{ width: `${modulePercent}%` }}
                        />
                      </div>
                    </div>

                    <ul className="flex-1 overflow-y-auto space-y-0.5 pb-2">
                      {mod.items.map((item) => {
                        const active = item.slug === currentSlug;
                        const done = isComplete(item.id);
                        return (
                          <li key={item.id}>
                            <Link
                              ref={active ? activeRef : undefined}
                              to={`/learn/${item.slug}`}
                              onClick={onClose}
                              className={`flex items-center gap-2 px-3 py-1.5 ml-2 rounded-md text-sm font-body transition-colors ${
                                active
                                  ? 'bg-cs-amber-light text-cs-amber font-medium border-l-2 border-cs-amber'
                                  : 'text-cs-slate-light hover:bg-cs-cream-dark hover:text-cs-slate active:bg-cs-cream-dark'
                              }`}
                              aria-current={active ? 'page' : undefined}
                            >
                              <span className="flex-shrink-0 w-4 text-center text-xs">
                                {done ? (
                                  <span aria-label="completed">✅</span>
                                ) : (
                                  <span className="text-cs-cream-dark">○</span>
                                )}
                              </span>
                              <span className="truncate">{item.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
