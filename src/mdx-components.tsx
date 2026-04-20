import type { MDXComponents } from 'mdx/types';
import ConceptLink from './components/ConceptLink';
import Quiz from './components/Quiz';
import PrerequisiteBadge from './components/PrerequisiteBadge';

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="font-display text-3xl font-bold text-cs-slate mt-8 mb-4 leading-tight"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-display text-2xl font-semibold text-cs-slate mt-10 mb-3 leading-snug"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-display text-xl font-medium text-cs-slate mt-8 mb-2"
      {...props}
    />
  ),
  p: (props) => (
    <p className="font-body text-base text-cs-slate leading-relaxed mb-4" {...props} />
  ),
  ul: (props) => (
    <ul className="font-body text-base text-cs-slate list-disc pl-6 mb-4 space-y-1" {...props} />
  ),
  ol: (props) => (
    <ol className="font-body text-base text-cs-slate list-decimal pl-6 mb-4 space-y-1" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => (
    <a
      className="text-cs-amber underline decoration-cs-amber/40 underline-offset-2 hover:decoration-cs-amber transition-colors"
      {...props}
    />
  ),
  code: (props) => {
    // Block code (inside <pre>) vs inline code
    const isInline = typeof props.children === 'string';
    if (isInline) {
      return (
        <code
          className="font-mono text-sm bg-cs-amber-light text-cs-amber px-1.5 py-0.5 rounded"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props) => (
    <pre
      className="bg-[#0f172a] text-[#e2e8f0] text-sm font-mono rounded-xl p-5 overflow-x-auto mb-6 leading-relaxed"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-cs-blue bg-blue-50/50 pl-4 pr-4 py-3 mb-6 rounded-r-lg font-body text-cs-slate italic"
      {...props}
    />
  ),
  table: (props) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm font-body border-collapse" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="text-left p-2 border-b-2 border-cs-cream-dark font-display font-semibold text-cs-slate" {...props} />
  ),
  td: (props) => (
    <td className="p-2 border-b border-cs-cream-dark text-cs-slate-light" {...props} />
  ),
  hr: () => <hr className="my-8 border-cs-cream-dark" />,
  strong: (props) => <strong className="font-semibold text-cs-slate" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  // Custom components available in all MDX files
  ConceptLink,
  Quiz,
  PrerequisiteBadge,
};
