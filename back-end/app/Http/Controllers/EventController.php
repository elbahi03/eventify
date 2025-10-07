<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;


class EventController extends Controller
{
    // list all events
    public function index()
    {
        $events = Event::all();
        return response()->json($events);
    }

    // create event
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after_or_equal:start_time   ',
            'location' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:100',
            'categorie' => 'nullable|string|max:100',
            'capacity' => 'nullable|integer|min:1',
            'status' => 'required|in:prévu,en cours,terminé,annulé',
        ]);
        $event = new Event($request->all());
        $event->user_id = $request->user()->id;
        $event->save();  
        return response()->json(['message' => 'Event created successfully', 'event' => $event], 201);
    }

    // show single event with id
    public function show($id)
    {
        $event = Event::find($id);
        if (!$event) 
            {return response()->json(['message' => 'Event not found'], 404);}
        return response()->json($event);
    }
    
    // show events by user id
    public function getUserEvents($userId){
        $events = Event::where('user_id', $userId)->get();
        return response()->json($events);
    }

    // show events by category
    public function searchByCategory($category){
        $events = Event::where('categorie', 'like', '%' . $category . '%')->get();
        return response()->json($events);
    }
    
    // update event
    public function update(Request $request, $id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }
        
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'date' => 'sometimes|required|date',
            'start_time' => 'sometimes|nullable|date_format:H:i',
            'end_time' => 'sometimes|nullable|date_format:H:i|after_or_equal:start_time',
            'location' => 'sometimes|nullable|string|max:255',
            'type' => 'sometimes|nullable|string|max:100',
            'categorie' => 'sometimes|nullable|string|max:100',
            'capacity' => 'sometimes|nullable|integer|min:1',
            'status' => 'sometimes|required|in:prévu,en cours,terminé,annulé',
        ]);

        $event->update($request->all());
        return response()->json(['message' => 'Event updated successfully', 'event' => $event]);
    }

    // delete event
    public function destroy($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $event->delete();
        return response()->json(['message' => 'Event deleted successfully']);
    }

    // searche by title
    public function searchByType($type){
        $events = Event::where('type', 'like', '%' . $type . '%')->get();
        return response()->json($events);
    }

    // searche by date ou lieu ou les deux

    public function searchByDateOrLocation(Request $request){
        $query = Event::query();

        if ($request->has('date')) {
            $query->where('date', $request->input('date'));
        }

        if ($request->has('location')) {
            $query->where('location', 'like', '%' . $request->input('location') . '%');
        }

        $events = $query->get();
        return response()->json($events);
    }

    // affiche 4 event par aleatoire
    public function randomEvents(){
        $events = Event::inRandomOrder()->take(4)->get();
        return response()->json($events);
    }
     
}
