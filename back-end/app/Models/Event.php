<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
        'start_time',
        'end_time',
        'location',
        'type',
        'categorie',
        'capacity',
        'status',
        'user_id',
    ];

    public function user()
{
    return $this->belongsTo(User::class);
}

    public function participants()
    {
        return $this->hasMany(Participant::class);
    }

}