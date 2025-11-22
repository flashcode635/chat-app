// 1. Define the Zustand Store
// We use the create function from zustand to define our store.

import { create } from "zustand";

// It contains the 'play' state and the 'setPlay' action.
export const useZustStore = create((set) => ({
  play: false, // Initial state: The game is not playing
  
  // Action to change the 'play' state to true
  //@ts-ignore
  setPlay: () => set(() => ({
    play: true
  })),

  // Action to reset the state (useful for demonstrating the change)
  resetPlay: () => set({ play: false }),
}));