import { create } from "zustand";

export type ReviewSource = "google" | "yelp" | "facebook" | "all";
export type Sentiment = "positive" | "neutral" | "negative" | "all";

type ReviewsState = {
  search: string;
  source: ReviewSource;
  sentiment: Sentiment;
  rating: number | null;
  setSearch: (s: string) => void;
  setSource: (s: ReviewSource) => void;
  setSentiment: (s: Sentiment) => void;
  setRating: (r: number | null) => void;
};

export const useReviewsStore = create<ReviewsState>((set) => ({
  search: "",
  source: "all",
  sentiment: "all",
  rating: null,
  setSearch: (s) => set({ search: s }),
  setSource: (s) => set({ source: s }),
  setSentiment: (s) => set({ sentiment: s }),
  setRating: (r) => set({ rating: r }),
}));
