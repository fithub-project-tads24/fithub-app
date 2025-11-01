<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Interfaces\UserProfileRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UpdateUserRequest;

class AuthController extends Controller
{
    protected $authService;
    protected $userProfileRepository;

    public function __construct(
        AuthService $authService,
        UserProfileRepositoryInterface $userProfileRepository
    ) {
        $this->authService = $authService;
        $this->userProfileRepository = $userProfileRepository;
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $validatedData = $request->validated();

        $user = $this->authService->register([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'],
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
        'token_type' => 'bearer',
        'user' => $user,
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
        {
        $credentials = $request->validated();

            if (!$token = $this->authService->login($credentials)) {
            return response()->json(['error' => 'Não autorizado'], 401);
            }

        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'user' => $request->user(),
        ]);
}

    public function deleteAccount(): JsonResponse
    {
        $user = request()->user();
        if (! $user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $this->authService->deleteAccount($user);
        return response()->json(['message' => 'Account deleted']);
    }

    public function update(UpdateUserRequest $request): JsonResponse
    {
        $user = $request->user();
        $updated = $this->authService->updateUser($user, $request->validated());
        return response()->json($updated);
    }
}
