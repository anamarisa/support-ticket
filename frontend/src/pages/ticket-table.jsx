import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";

export default function TicketTable({ tickets, isAgent = false, onEditClick }) {
  return (
    <Table>
      <TableCaption>List of tickets created recently.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead className="w-[200px]">Title</TableHead>
          <TableHead className="max-w-[300px]">Description</TableHead>
          <TableHead className="w-[140px] whitespace-nowrap">Status</TableHead>
          {isAgent && (
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(tickets) && tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="truncate max-w-[200px]">
                {ticket.title}
              </TableCell>
              <TableCell className="truncate max-w-[300px]">
                {ticket.description}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <StatusBadge status={ticket.status} />
              </TableCell>
              {isAgent && (
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditClick(ticket)}
                    className="text-blue-600 hover:text-blue-800 p-0"
                  >
                    <SquarePen className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={isAgent ? 5 : 4} className="text-center">
              No tickets found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
