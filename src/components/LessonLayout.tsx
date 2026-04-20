import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Sidebar from './Sidebar';
import { useProgressStore } from '../store/progressStore';
import syllabus from '../data/syllabus.json';
import { mdxComponents } from '../mdx-components';

const contentModules = import.meta.glob('../content/**/*.mdx');

// Lookup the module folder mapping
const moduleMap: Record<string, string> = {
  'digital-logic': 'module-1-digital-logic',
  architecture: 'module-3-architecture',
  'prog-ds': 'module-4-prog-ds',
  algorithms: 'module-5-algorithms',
  theory: 'module-6-theory',
  compilers: 'module-7-compilers',
  os: 'module-8-os',
  dbms: 'module-9-dbms',
  networks: 'module-10-networks',
};

export default function LessonLayout() {
  const { moduleSlug, lessonSlug } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [LessonContent, setLessonContent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const currentSlug = `${moduleSlug}/${lessonSlug}`;

  const currentItem = syllabus.find((s) => s.slug === currentSlug);
  const currentIndex = syllabus.findIndex((s) => s.slug === currentSlug);
  const prevItem = currentIndex > 0 ? syllabus[currentIndex - 1] : null;
  const nextItem =
    currentIndex < syllabus.length - 1 ? syllabus[currentIndex + 1] : null;

  const markComplete = useProgressStore((s) => s.markComplete);
  const isComplete = useProgressStore((s) => s.isComplete);
  const lessonDone = currentItem ? isComplete(currentItem.id) : false;

  // Load MDX content when route params change
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLessonContent(null);

    const folder = moduleMap[moduleSlug || ''] || moduleSlug;
    const path = `../content/${folder}/${lessonSlug}.mdx`;
    const loader = contentModules[path];

    if (loader) {
      (loader() as Promise<{ default: React.ComponentType }>).then((mod) => {
        if (!cancelled) {
          setLessonContent(() => mod.default);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }

    window.scrollTo(0, 0);

    return () => { cancelled = true; };
  }, [moduleSlug, lessonSlug]);

  return (
    <div className="flex min-h-screen bg-cs-cream">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-cs-cream-dark px-4 py-3">
          <div className="flex items-center gap-3 max-w-prose mx-auto">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-md hover:bg-cs-cream-dark active:bg-cs-cream-dark transition-colors"
              aria-label="Open navigation"
            >
              <svg className="w-5 h-5 text-cs-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex-1 min-w-0">
              {currentItem && (
                <>
                  <p className="text-xs text-cs-slate-light font-mono truncate">
                    Module {currentItem.moduleNumber} · {currentItem.moduleName}
                  </p>
                  <h1 className="text-sm sm:text-base font-display font-semibold text-cs-slate truncate">
                    {currentItem.title}
                  </h1>
                </>
              )}
            </div>

            {currentItem && (
              <div className="flex items-center gap-2 sm:gap-3 text-xs text-cs-slate-light font-mono flex-shrink-0">
                <span>{currentItem.estimatedMinutes} min read</span>
                <span className="hidden sm:inline">
                  {useProgressStore.getState().overallProgress()}%
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 px-4 py-8">
          <article className="max-w-prose mx-auto">
            {loading ? (
              <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-pulse text-cs-amber font-display text-xl">
                  Loading lesson…
                </div>
              </div>
            ) : LessonContent ? (
              <MDXProvider components={mdxComponents}>
                <LessonContent />
              </MDXProvider>
            ) : (
              <div className="text-center py-20">
                <h2 className="font-display text-2xl text-cs-slate mb-2">
                  Lesson Not Found
                </h2>
                <p className="text-cs-slate-light font-body">
                  This lesson hasn't been created yet. Check back soon!
                </p>
              </div>
            )}

            {/* Bottom navigation */}
            <div className="mt-12 pt-6 border-t border-cs-cream-dark flex items-center justify-between gap-4">
              {prevItem ? (
                <Link
                  to={`/learn/${prevItem.slug}`}
                  className="flex items-center gap-2 text-sm text-cs-slate-light hover:text-cs-amber transition-colors font-body"
                >
                  <span>←</span>
                  <span className="truncate max-w-[200px]">{prevItem.title}</span>
                </Link>
              ) : (
                <div />
              )}

              <button
                onClick={() => {
                  if (currentItem) markComplete(currentItem.id);
                }}
                disabled={lessonDone}
                className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all flex-shrink-0 ${
                  lessonDone
                    ? 'bg-cs-green/10 text-cs-green cursor-default'
                    : 'bg-cs-amber text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-cs-amber focus:ring-offset-2'
                }`}
                aria-label={lessonDone ? 'Lesson completed' : 'Mark lesson as complete'}
              >
                {lessonDone ? '✅ Completed' : 'Mark Complete'}
              </button>

              {nextItem ? (
                <Link
                  to={`/learn/${nextItem.slug}`}
                  className="flex items-center gap-2 text-sm text-cs-slate-light hover:text-cs-amber transition-colors font-body"
                >
                  <span className="truncate max-w-[200px]">{nextItem.title}</span>
                  <span>→</span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
