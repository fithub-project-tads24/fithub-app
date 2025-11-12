<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'bookings';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'booking_date',
        'status',
        'creation_timestamp',
        'time_slots_id',
        'users_id',
        'users_user_profiles_id',
        'users_roles_id',
    ];

    protected $casts = [
        'booking_date' => 'date',
        'creation_timestamp' => 'datetime',
    ];

    public function timeSlot()
    {
        return $this->belongsTo(TimeSlot::class, 'time_slots_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function userProfile()
    {
        return $this->belongsTo(UserProfile::class, 'users_user_profiles_id');
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'users_roles_id');
    }
}
