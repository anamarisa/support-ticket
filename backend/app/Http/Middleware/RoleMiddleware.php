<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $userRole = Auth::user()->role;
        Log::info($userRole);
        if (in_array($userRole, $roles)) {
            return $next($request);
        }

        return response()->json([
            'message' => 'Forbidden.'
        ], 403);
    }
}
