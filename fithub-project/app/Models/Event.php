<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = ['titulo', 'descricao', 'data', 'hora', 'local', 'created_by'];

    public function participants()
    {
        return $this->belongsToMany(User::class, 'event_user');
    }
}
