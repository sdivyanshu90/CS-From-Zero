import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useProgressStore } from '../store/progressStore';
import syllabus from '../data/syllabus.json';

interface ConceptLinkProps {
  to: string;
  label?: string;
}

export default function ConceptLink({ to, label }: ConceptLinkProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const isComplete = useProgressStore((s) => s.isComplete(to));

  const item = syllabus.find((s) => s.id === to);
  const displayLabel = label || item?.title || to;
  const summary = item?.summary || '';
  const slug = item?.slug || to;

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setShowTooltip(true), 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setShowTooltip(false);
  };

  return (
    <span className="relative inline-block">
      <Link
        to={`/learn/${slug}`}
        className="inline-flex items-center gap-1 text-cs-amber underline decoration-cs-amber/40 decoration-1 underline-offset-2 hover:bg-cs-amber-light hover:decoration-cs-amber rounded px-0.5 transition-all duration-150"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label={`${displayLabel}${!isComplete ? ' (prerequisite not yet completed)' : ''}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
          <path fillRule="evenodd" d="M12.207 2.232a.75.75 0 0 0-.932.453l-5.5 16.5a.75.75 0 0 0 1.385.57l5.5-16.5a.75.75 0 0 0-.453-.932ZM2.53 7.47a.75.75 0 0 1 0 1.06L.06 10l2.47 2.47a.75.75 0 0 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Zm14.94 0a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06L19.94 10l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
        <span>{displayLabel}</span>
        {!isComplete && (
          <span className="text-xs" title="Prerequisite not yet completed" aria-label="prerequisite not yet completed">⚠️</span>
        )}
      </Link>
      {showTooltip && summary && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-sm bg-cs-slate text-white rounded-lg shadow-lg max-w-xs text-center z-50 whitespace-normal pointer-events-none"
        >
          {summary}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-cs-slate" />
        </span>
      )}
    </span>
  );
}
