<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseHelpers;
use App\Http\Requests\RequestTicket;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    // Customers
    public function index()
    {
        $tickets = auth()->user()->tickets;

        return ResponseHelpers::sendSuccess('Ticket retrieved successfully', $tickets, 200);
    }

    public function show($id)
    {
        $ticket = Ticket::findOrFail($id);

        return ResponseHelpers::sendSuccess('Ticket retrieved successfully', $ticket, 200);
    }

    public function store(RequestTicket $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        $ticket = Ticket::create($validated);

        return ResponseHelpers::sendSuccess('Ticket created successfully', $ticket, 201);
    }

    // Admin
    public function getAllTickets(Request $request)
    {
        $query = Ticket::query();

        if ($request->has('status')) {
            $request->validate([
                'status' => 'in:open,in_process,closed',
            ]);
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%$search%")
                    ->orWhere('description', 'like', "%$search%");
            });
        }

        $tickets = $query->latest()->get();

        return ResponseHelpers::sendSuccess('Tickets retrieved successfully', $tickets, 200);
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:open,in_progress,closed'
        ]);

        $ticket = Ticket::findOrFail($id);
        $ticket->update([
            'status' => $validated['status']
        ]);

        return ResponseHelpers::sendSuccess('Ticket status updated successfully', $ticket, 200);
    }
}
