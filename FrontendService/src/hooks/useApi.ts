import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useOrgStore } from "@/store/org";

export function useOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const { data } = await api.get("/organizations");
      return data as { id: string; name: string; logoUrl?: string | null }[];
    },
  });
}

export function useLocations(orgId?: string) {
  return useQuery({
    queryKey: ["locations", orgId],
    enabled: !!orgId,
    queryFn: async () => {
      const { data } = await api.get(`/organizations/${orgId}/locations`);
      return data as { id: string; name: string }[];
    },
  });
}

export function useDashboard(orgId?: string, locationId?: string) {
  return useQuery({
    queryKey: ["dashboard", orgId, locationId],
    enabled: !!orgId,
    queryFn: async () => {
      const { data } = await api.get("/dashboard", {
        params: { orgId, locationId },
      });
      return data as {
        totals: { reviews: number; avgRating: number; responseRate: number };
        sentiments: { positive: number; neutral: number; negative: number };
        sources: { source: string; count: number }[];
        trend: { date: string; reviews: number; rating: number }[];
        recent: Array<{
          id: string;
          author: string;
          rating: number;
          source: string;
          text: string;
          createdAt: string;
        }>;
      };
    },
  });
}

export type Review = {
  id: string;
  author: string;
  rating: number;
  source: string;
  text: string;
  createdAt: string;
  sentiment: "positive" | "neutral" | "negative";
  status: "new" | "replied" | "dismissed";
};

export function useReviews(params: {
  orgId?: string;
  locationId?: string;
  search?: string;
  source?: string;
  sentiment?: string;
  rating?: number | null;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: ["reviews", params],
    enabled: !!params.orgId,
    queryFn: async () => {
      const { data } = await api.get("/reviews", { params });
      return data as { items: Review[]; total: number; page: number; pageSize: number };
    },
  });
}

export function useReviewDetail(id?: string) {
  return useQuery({
    queryKey: ["review", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get(`/reviews/${id}`);
      return data as Review & {
        suggestions?: string[];
        thread?: Array<{ id: string; role: "user" | "assistant"; content: string; createdAt: string }>;
      };
    },
  });
}

export function useReplyToReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: { reviewId: string; message: string }) => {
      const { data } = await api.post(`/reviews/${p.reviewId}/reply`, { message: p.message });
      return data;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["review", vars.reviewId] });
      qc.invalidateQueries({ queryKey: ["reviews"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useAnalytics(orgId?: string, locationId?: string, range?: string) {
  return useQuery({
    queryKey: ["analytics", orgId, locationId, range],
    enabled: !!orgId,
    queryFn: async () => {
      const { data } = await api.get("/analytics", { params: { orgId, locationId, range } });
      return data as {
        trend: { date: string; reviews: number; avgRating: number }[];
        distribution: { rating: number; count: number }[];
        sources: { source: string; count: number }[];
        sentiments: { label: string; value: number }[];
        responseTime: { bucket: string; value: number }[];
      };
    },
  });
}

export function useTeam(orgId?: string) {
  return useQuery({
    queryKey: ["team", orgId],
    enabled: !!orgId,
    queryFn: async () => {
      const { data } = await api.get(`/organizations/${orgId}/team`);
      return data as Array<{ id: string; name: string; email: string; role: string }>;
    },
  });
}

export function useInviteMember() {
  const qc = useQueryClient();
  const orgId = useOrgStore.getState().currentOrgId;
  return useMutation({
    mutationFn: async (p: { name: string; email: string; role: string }) => {
      const { data } = await api.post(`/organizations/${orgId}/team/invite`, p);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["team", orgId] });
    },
  });
}

export function useRemoveMember() {
  const qc = useQueryClient();
  const orgId = useOrgStore.getState().currentOrgId;
  return useMutation({
    mutationFn: async (p: { memberId: string }) => {
      const { data } = await api.delete(`/organizations/${orgId}/team/${p.memberId}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["team", orgId] });
    },
  });
}
