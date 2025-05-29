import React, { useState } from "react";
import TicketTable from "@/pages/ticket-table";
import { useAllTickets } from "@/hooks/useTickets";
import { updateTicket } from "@/services/ticketService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TicketDetailModal from "@/pages/ticket-detail-modal";

export default function AllTicket() {
  const queryClient = useQueryClient();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: ({ ticketId, newStatus }) =>
      updateTicket(ticketId, { status: newStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tickets"] });
      setIsModalOpen(false);
    },
    onError: (err) => {
      console.error("Failed to update status:", err);
      alert("Failed to update status. Please try again.");
    },
  });

  const handleOpenModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = (ticketId, newStatus) => {
    mutation.mutate({ ticketId, newStatus });
  };

  const { data: tickets, isLoading, isError, error } = useAllTickets();

  if (isLoading) return <p>Loading tickets...</p>;
  if (isError) return <p>Error loading tickets: {error.message}</p>;

  return (
    <>
      <TicketTable
        tickets={tickets}
        isAgent={true}
        onEditClick={handleOpenModal}
      />
      <TicketDetailModal
        isOpen={isModalOpen}
        ticket={selectedTicket}
        onClose={() => setIsModalOpen(false)}
        onStatusChange={handleStatusUpdate}
        isUpdating={mutation.isPending}
      />
    </>
  );
}