import { useState } from 'react';

interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  lessonId: string;
}

export default function Quiz({ questions, lessonId }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];
  const isCorrect = selectedAnswer === current?.answer;

  const handleSelect = (optionIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(optionIndex);
    setShowResult(true);
    if (optionIndex === current.answer) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setFinished(true);
      // markComplete is called from LessonLayout when the user clicks "Mark Complete"
    }
  };

  if (finished) {
    return (
      <div className="my-8 p-6 bg-cs-cream-dark rounded-xl border border-cs-amber/20" role="region" aria-label="Quiz results">
        <h3 className="font-display text-xl font-semibold text-cs-slate mb-2">
          Quiz Complete!
        </h3>
        <p className="text-cs-slate-light font-body">
          You got <span className="font-semibold text-cs-amber">{correctCount}</span> out of{' '}
          <span className="font-semibold">{questions.length}</span> correct.
        </p>
        {correctCount === questions.length && (
          <p className="mt-2 text-cs-green font-medium">Perfect score! You've mastered this topic.</p>
        )}
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="my-8 p-6 bg-cs-cream-dark rounded-xl border border-cs-amber/20" role="region" aria-label={`Quiz question ${currentIndex + 1} of ${questions.length}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-cs-slate">
          Check Your Understanding
        </h3>
        <span className="text-sm text-cs-slate-light font-mono">
          {currentIndex + 1}/{questions.length}
        </span>
      </div>

      <p className="text-cs-slate font-body text-base mb-4">{current.q}</p>

      <div className="space-y-2" role="radiogroup" aria-label="Answer options">
        {current.options.map((option, i) => {
          let btnClass =
            'w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 font-body text-sm ';

          if (!showResult) {
            btnClass +=
              'border-cs-cream-dark hover:border-cs-amber hover:bg-white cursor-pointer';
          } else if (i === current.answer) {
            btnClass += 'border-cs-green bg-green-50 text-cs-green';
          } else if (i === selectedAnswer) {
            btnClass += 'border-cs-red bg-red-50 text-cs-red';
          } else {
            btnClass += 'border-cs-cream-dark opacity-60';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={btnClass}
              role="radio"
              aria-checked={selectedAnswer === i}
              aria-label={option}
            >
              <span className="font-mono text-xs mr-2 opacity-60">
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`mt-4 p-3 rounded-lg text-sm font-body ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`} role="alert">
          <p className="font-semibold mb-1">
            {isCorrect ? '✅ Correct!' : '❌ Not quite.'}
          </p>
          <p>{current.explanation}</p>
        </div>
      )}

      {showResult && (
        <button
          onClick={handleNext}
          className="mt-4 px-5 py-2 bg-cs-amber text-white rounded-lg font-body font-medium text-sm hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cs-amber focus:ring-offset-2"
        >
          {currentIndex + 1 < questions.length ? 'Next Question →' : 'See Results'}
        </button>
      )}
    </div>
  );
}
