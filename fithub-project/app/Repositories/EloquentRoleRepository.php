<?php

namespace App\Repositories;

use App\Interfaces\RoleRepositoryInterface;
use App\Models\Role;

class EloquentRoleRepository implements RoleRepositoryInterface
{
    public function paginate(int $perPage = 15, int $page = 1): array
    {
        $query = Role::query();
        $total = $query->count();
        $data = $query->forPage($page, $perPage)->get();
        return compact('data', 'total');
    }

    public function all(): iterable
    {
        return Role::all();
    }

    public function find(int $id): ?Role
    {
        return Role::find($id);
    }

    public function create(array $data): Role
    {
        return Role::create($data);
    }

    public function update(Role $role, array $data): Role
    {
        $role->fill($data);
        $role->save();
        return $role;
    }

    public function delete(Role $role): bool
    {
        return (bool) $role->delete();
    }
}
