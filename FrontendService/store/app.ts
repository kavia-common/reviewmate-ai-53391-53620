import { create } from "zustand";

type Location = { id: string; name: string };
type AppState = {
  locations: Location[];
  setLocations: (items: Location[]) => void;
};

export const useAppStore = create<AppState>((set) => ({
  locations: [
    { id: "loc-1", name: "Downtown" },
    { id: "loc-2", name: "Airport" },
    { id: "loc-3", name: "Uptown" }
  ],
  setLocations: (items) => set({ locations: items })
}));
