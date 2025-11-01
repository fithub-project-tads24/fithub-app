<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'sex' => ['required', Rule::in(['male', 'female'])],
            'birth_date' => ['required', 'date', 'before_or_equal:today'],
            'height' => ['required', 'integer', 'min:100', 'max:250'],
            'weight' => ['required', 'numeric', 'min:30', 'max:300'],
            'objective' => ['required', Rule::in(['lose_weight', 'gain_weight', 'maintain_weight', 'learn_basics', 'gain_flexibility', 'get_fitter'])],
            'activity_level' => ['required', Rule::in(['sedentary', 'light', 'moderate', 'active', 'very_active'])],
        ];
    }
}
