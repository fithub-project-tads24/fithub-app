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
            'email' => ['sometimes', 'email', Rule::unique('users', 'email')->ignore($userId)],

            'password' => ['sometimes', 'nullable', 'string', 'min:8'],

            'age' => ['nullable', 'integer'],
            'weight' => ['nullable', 'numeric'],
            'height' => ['nullable', 'numeric'],
            'sex' => ['nullable', 'string'],
            'objective' => ['nullable', 'string'],
            'activity_level' => ['nullable', 'string'],
        ];
    }
}
