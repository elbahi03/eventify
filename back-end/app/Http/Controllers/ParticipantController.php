<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Participant;
use App\Models\Event;

class ParticipantController extends Controller
{
    // add participant to event by event id
    public function store(Request $request)
    {
        $limit = Event::find($request->event_id)->capacity;

        if ( Participant::where('event_id', $request->event_id)->count() >= $limit ) {
            return response()->json(['message' => 'Event capacity reached'], 400);
        }

        $request->validate([
            'event_id' => 'required|exists:events,id',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'nullable|string|max:10|min:10',
            'CIN' => 'required|string|max:50',
        ]);
        $participant = new Participant($request->all());
        $participant->save();
        return response()->json(['message' => 'Participant added successfully', 'participant' => $participant], 201);
    }

    // list participants by event id
    public function getEventParticipants($eventId)
    {
        $participants = Participant::where('event_id', $eventId)->get();
        return response()->json($participants);
    }

    // delete participant by id
    public function destroy($id)
    {
        $participant = Participant::find($id);
        if (!$participant) {
            return response()->json(['message' => 'Participant not found'], 404);
        }
        $participant->delete();
        return response()->json(['message' => 'Participant deleted successfully']);
    }

    // verifier avec CIN :
    public function verifyParticipant(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
            'CIN' => 'required|string|max:50',
        ]);

        $participant = Participant::where('event_id', $request->event_id)
                                  ->where('CIN', $request->CIN)
                                  ->first();

        if ($participant) {
            return response()->json(['message' => 'Participant verified', 'participant' => $participant]);
        } else {
            return response()->json(['message' => 'Participant not found'], 404);
        }
    }
}
