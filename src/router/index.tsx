import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LessonLayout from '../components/LessonLayout';

const contentModules = import.meta.glob('../content/**/*.mdx');

function buildLessonRoute(moduleSlug: string, lessonSlug: string) {
  const path = `../content/${moduleSlug}/${lessonSlug}.mdx`;
  const loader = contentModules[path];

  if (!loader) {
    return null;
  }

  const LazyComponent = lazy(() =>
    (loader() as Promise<{ default: React.ComponentType }>)
  );

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-cs-amber font-display text-xl">
            Loading lesson…
          </div>
        </div>
      }
    >
      <LazyComponent />
    </Suspense>
  );
}

function LessonPage() {
  // We use a wrapper component so we can read params inside the router
  // This is handled by LessonLayout which reads useParams
  return <LessonLayout />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/learn/digital-logic/what-is-information" replace />,
  },
  {
    path: '/learn/:moduleSlug/:lessonSlug',
    element: <LessonPage />,
  },
]);

export { buildLessonRoute, contentModules };
