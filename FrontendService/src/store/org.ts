import { create } from "zustand";

export type Organization = { id: string; name: string; logoUrl?: string | null };
export type Location = { id: string; name: string };

type OrgState = {
  organizations: Organization[];
  locations: Location[];
  currentOrgId?: string;
  currentLocationId?: string;
  setOrganizations: (items: Organization[]) => void;
  setLocations: (items: Location[]) => void;
  switchOrg: (id: string) => void;
  switchLocation: (id: string) => void;
};

export const useOrgStore = create<OrgState>((set) => ({
  organizations: [],
  locations: [],
  currentOrgId: undefined,
  currentLocationId: undefined,
  setOrganizations: (items) =>
    set((s) => ({
      organizations: items,
      currentOrgId: items.length ? items[0].id : s.currentOrgId,
    })),
  setLocations: (items) =>
    set((s) => ({
      locations: items,
      currentLocationId: items.length ? items[0].id : s.currentLocationId,
    })),
  switchOrg: (id) => set({ currentOrgId: id }),
  switchLocation: (id) => set({ currentLocationId: id }),
}));
