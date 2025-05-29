import React from "react";
import TicketTable from "@/pages/ticket-table";
import { useTickets } from "@/hooks/useTickets";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorIcon } from "react-hot-toast";

export default function TicketsPage() {
  const { data: tickets, isLoading, isError, error } = useTickets();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Tickets</h1>
          <Button asChild className="gap-2">
            <Link to="create-ticket">
              <Plus className="h-4 w-4" />
              <span>Create Ticket</span>
            </Link>
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ErrorIcon className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading tickets
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error.message}</p>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-100"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success State */}
        {!isLoading && !isError && (
          <>
            <div className="text-sm text-gray-500">
              Showing {tickets.length}{" "}
              {tickets.length === 1 ? "ticket" : "tickets"}
            </div>
            <TicketTable tickets={tickets} />
          </>
        )}
      </div>
    </div>
  );
}
