<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserProfile extends Model
{
    use HasFactory;

    protected $table = 'user_profiles';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    // migrations têm created_at e updated_at
    public $timestamps = true;

    protected $fillable = [
        'age',
        'weight',
        'height',
        'sex',
        'objective',
        'activity_level',
    ];

    protected $casts = [
        'age' => 'integer',
        'weight' => 'float',
        'height' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relações
    public function user()
    {
        return $this->hasOne(User::class, 'user_profiles_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'users_user_profiles_id');
    }

    public function restrictions()
    {
        return $this->hasMany(Restriction::class, 'users_user_profiles_id');
    }
}
