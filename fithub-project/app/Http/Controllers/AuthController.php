<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Interfaces\UserProfileRepositoryInterface;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;

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

        $this->userProfileRepository->createOrUpdate($user, [
            'age' => $validatedData['age'],
            'weight' => $validatedData['weight'],
            'height' => $validatedData['height'],
            'sex' => $validatedData['sex'],
            'objective' => $validatedData['objective'],
            'activity_level' => $validatedData['activity_level'],
        ]);

        $user->load('profile');

        return response()->json([
            'message' => 'Usuário e perfil registrados com sucesso!',
            'user' => $user
        ], 201);
    }
}
