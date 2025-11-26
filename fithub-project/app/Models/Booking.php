<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_date',
        'time_slots_id',
        'status',
        'users_id',
        'users_user_profiles_id',
        'users_roles_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }
}
