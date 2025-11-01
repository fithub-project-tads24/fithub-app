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
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => [
                'sometimes', 'string', 'lowercase', 'email', 'max:255',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'password' => ['sometimes', 'string', 'min:8'],

            'age' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'weight' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'height' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'sex' => ['sometimes', 'nullable', 'string', 'max:20'],
            'objective' => ['sometimes', 'nullable', 'string', 'max:100'],
            'activity_level' => ['sometimes', 'nullable', 'string', 'max:100'],
        ];
    }
}
