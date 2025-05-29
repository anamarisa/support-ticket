import { useQuery } from "@tanstack/react-query";
import { fetchTickets } from "@/services/ticketService";
import { fetchAllTickets } from "@/services/ticketService";
import { useAuth } from "./useAuth";

export function useTickets() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["tickets", user?.id],
    queryFn: fetchTickets,
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useAllTickets() {
  return useQuery({
    queryKey: ["all-tickets"],
    queryFn: fetchAllTickets,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
