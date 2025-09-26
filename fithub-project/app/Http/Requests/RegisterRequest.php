<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    public function rules(): array
        {
            return [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
                'age' => 'required|integer|min:12',
                'weight' => 'required|numeric|min:0',
                'height' => 'required|numeric|min:0',
                'sex' => 'required|string|in:male,female,other',
                'objective' => 'required|string',
                'activity_level' => 'required|string',
            ];
        }
}
