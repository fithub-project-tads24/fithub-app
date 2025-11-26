<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = ['users_id', 'data', 'hora_inicio', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }
}
