<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory;

    protected $table = 'roles';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    // tabela não possui created_at/updated_at no SQL
    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    // Relações
    public function users()
    {
        return $this->hasMany(User::class, 'roles_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'users_roles_id');
    }

    public function restrictions()
    {
        return $this->hasMany(Restriction::class, 'users_roles_id');
    }
}
