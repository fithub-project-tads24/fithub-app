<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Interfaces\UserProfileRepositoryInterface;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\LoginRequest;

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
        'message' => 'Usuário registrado com sucesso!',
        'user' => $user,
        'token' => $token,
    ], 201);
}

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        if (!$token = $this->authService->login($credentials)) {
        return response()->json(['error' => 'Não autorizado'], 401);
    }

    return response()->json([
        'access_token' => $token,
        'token_type' => 'bearer',
    ]);
    }
}
