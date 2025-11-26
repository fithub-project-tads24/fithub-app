<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restriction extends Model
{
    use HasFactory;

    protected $table = 'restrictions';

    protected $fillable = [
        'reason',
        'expiration_date',
        'users_id',
        'users_user_profiles_id',
        'users_roles_id'
    ];

    protected $casts = [
        'expiration_date' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }
}
