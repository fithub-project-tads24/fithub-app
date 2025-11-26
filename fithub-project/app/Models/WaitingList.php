<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WaitingList extends Model
{
    use HasFactory;

    protected $table = 'waiting_list';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'desired_date',
        'request_timestamp',
        'time_slots_id',
    ];

    protected $casts = [
        'desired_date' => 'date',
        'request_timestamp' => 'datetime',
    ];

    public function timeSlot()
    {
        return $this->belongsTo(TimeSlot::class, 'time_slots_id');
    }
}
