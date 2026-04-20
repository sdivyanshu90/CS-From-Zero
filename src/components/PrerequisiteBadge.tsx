import ConceptLink from './ConceptLink';
import { useProgressStore } from '../store/progressStore';
import syllabus from '../data/syllabus.json';

interface PrerequisiteBadgeProps {
  prerequisites: string[];
}

export default function PrerequisiteBadge({ prerequisites }: PrerequisiteBadgeProps) {
  const isComplete = useProgressStore((s) => s.isComplete);

  if (!prerequisites || prerequisites.length === 0) return null;

  const prereqItems = prerequisites
    .map((id) => syllabus.find((s) => s.id === id))
    .filter(Boolean);

  if (prereqItems.length === 0) return null;

  const allComplete = prerequisites.every((id) => isComplete(id));

  return (
    <div
      className={`mb-8 p-4 rounded-xl border text-sm font-body ${
        allComplete
          ? 'border-cs-green/30 bg-green-50/50'
          : 'border-cs-amber/30 bg-cs-amber-light/30'
      }`}
      role="note"
      aria-label="Prerequisites for this lesson"
    >
      <p className="font-semibold text-cs-slate mb-2">
        {allComplete
          ? '✅ You\'ve covered all prerequisites!'
          : 'Before this lesson, make sure you\'ve covered:'}
      </p>
      <div className="flex flex-wrap gap-2">
        {prereqItems.map((item) => {
          if (!item) return null;
          const done = isComplete(item.id);
          return (
            <span
              key={item.id}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs ${
                done
                  ? 'bg-green-100 text-green-800'
                  : 'bg-cs-amber-light text-cs-amber'
              }`}
            >
              {done && <span aria-label="completed">✅</span>}
              <ConceptLink to={item.id} label={item.title} />
            </span>
          );
        })}
      </div>
    </div>
  );
}
