import { useProgressStore } from '../store/progressStore';
import syllabus from '../data/syllabus.json';

export default function ProgressBar() {
  const overallProgress = useProgressStore((s) => s.overallProgress());

  const total = syllabus.length;
  const completed = useProgressStore((s) => s.completedLessons.length);

  return (
    <div className="w-full" role="progressbar" aria-valuenow={overallProgress} aria-valuemin={0} aria-valuemax={100} aria-label={`Overall progress: ${overallProgress}%`}>
      <div className="flex items-center justify-between text-xs text-cs-slate-light mb-1">
        <span className="font-body">{completed} of {total} lessons</span>
        <span className="font-mono font-medium">{overallProgress}%</span>
      </div>
      <div className="h-2 bg-cs-cream-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-cs-amber rounded-full transition-all duration-500 ease-out"
          style={{ width: `${overallProgress}%` }}
        />
      </div>
    </div>
  );
}
