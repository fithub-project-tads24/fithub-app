<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->user()?->id;
        return [
            // Campos do Usuário
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', Rule::unique('users', 'email')->ignore($userId)],

            // Campos do Perfil (EXATAMENTE COMO NO BANCO)
            'age' => ['sometimes', 'nullable', 'integer'],
            'weight' => ['sometimes', 'nullable', 'numeric'],
            'height' => ['sometimes', 'nullable', 'numeric'],
            'sex' => ['sometimes', 'nullable', 'string'],
            'objective' => ['sometimes', 'nullable', 'string'],
            'activity_level' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
