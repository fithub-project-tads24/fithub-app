<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TimeSlot extends Model
{
    use HasFactory;

    protected $table = 'time_slots';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'start_time',
        'end_time',
        'max_capacity',
    ];

    protected $casts = [
        'start_time' => 'string',
        'end_time' => 'string',
        'max_capacity' => 'integer',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'time_slots_id');
    }

    public function waitingLists()
    {
        return $this->hasMany(WaitingList::class, 'time_slots_id');
    }
}
