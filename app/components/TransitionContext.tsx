'use client';

import { createContext, useContext } from 'react';

type PlayTransition = (to: string) => Promise<void>;

export const TransitionContext = createContext<PlayTransition | null>(null);

export const usePageTransition = (): PlayTransition => {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    return async () => {};
  }
  return ctx;
};


