<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    // migrations têm created_at e updated_at
    public $timestamps = true;

    protected $fillable = [
        'name',
        'email',
        'password_hash',
        'email_verified_at',
        'remember_token',
        'user_profiles_id',
        'roles_id',
    ];

    protected $hidden = [
        'password_hash',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relações
    public function role()
    {
        return $this->belongsTo(Role::class, 'roles_id');
    }

    public function profile()
    {
        return $this->belongsTo(UserProfile::class, 'user_profiles_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'users_id');
    }

    public function restrictions()
    {
        return $this->hasMany(Restriction::class, 'users_id');
    }
}
