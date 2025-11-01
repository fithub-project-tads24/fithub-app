<?php

namespace App\Http\Controllers;

use App\Interfaces\RoleRepositoryInterface;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RoleController extends Controller
{
    public function __construct(private RoleRepositoryInterface $roles)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->query('per_page', 15);
        $page = (int) $request->query('page', 1);
        $result = $this->roles->paginate($perPage, $page);
        return response()->json($result);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required','string','max:50','unique:roles,name'],
        ]);

        $role = $this->roles->create($data);
        return response()->json($role, 201);
    }

    public function show(Role $role): JsonResponse
    {
        return response()->json($role);
    }

    public function update(Request $request, Role $role): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required','string','max:50', Rule::unique('roles','name')->ignore($role->id)],
        ]);

        $role = $this->roles->update($role, $data);
        return response()->json($role);
    }

    public function destroy(Role $role): JsonResponse
    {
        $this->roles->delete($role);
        return response()->json(null, 204);
    }
}
