<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;

    protected $table = 'user_profiles';

    // LIBERAR OS CAMPOS PARA ESCRITA
    protected $fillable = [
        'age',
        'weight',
        'height',
        'sex',
        'objective',
        'activity_level'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'user_profiles_id');
    }
}
