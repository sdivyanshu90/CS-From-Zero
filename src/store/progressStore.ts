import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import syllabus from '../data/syllabus.json';

interface ProgressState {
  completedLessons: string[];
  markComplete: (id: string) => void;
  isComplete: (id: string) => boolean;
  overallProgress: () => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      markComplete: (id: string) => {
        set((state) => {
          if (state.completedLessons.includes(id)) return state;
          return { completedLessons: [...state.completedLessons, id] };
        });
      },
      isComplete: (id: string) => {
        return get().completedLessons.includes(id);
      },
      overallProgress: () => {
        const total = syllabus.length;
        if (total === 0) return 0;
        return Math.round((get().completedLessons.length / total) * 100);
      },
    }),
    {
      name: 'cs-universal-progress',
    }
  )
);
