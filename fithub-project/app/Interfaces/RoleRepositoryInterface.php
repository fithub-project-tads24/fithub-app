<?php

namespace App\Interfaces;

use App\Models\Role;

interface RoleRepositoryInterface
{
    public function paginate(int $perPage = 15, int $page = 1): array;

    public function all(): iterable;

    public function find(int $id): ?Role;

    public function create(array $data): Role;

    public function update(Role $role, array $data): Role;

    public function delete(Role $role): bool;
}
