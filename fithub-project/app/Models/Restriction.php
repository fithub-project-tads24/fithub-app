<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Restriction extends Model
{
    use HasFactory;

    protected $table = 'restrictions';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    public $timestamps = true;
    const UPDATED_AT = null;

    protected $fillable = [
        'reason',
        'expiration_date',
        'created_at',
        'users_id',
        'users_user_profiles_id',
        'users_roles_id',
    ];

    protected $casts = [
        'expiration_date' => 'datetime',
        'created_at' => 'datetime',
    ];

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
