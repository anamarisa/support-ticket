import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTicket } from "@/services/ticketService";
import { useNavigate } from "react-router";

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      navigate("/dashboard-customer");
    },
  });
};