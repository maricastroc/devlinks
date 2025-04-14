<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'email' => [
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'public_email' => [
                'string',
                'nullable',
                'lowercase',
                'email',
                'max:255',
            ],
            'username' => [
                'required',
                'min:3',
                Rule::unique(User::class)->ignore($this->user()->id)
            ],
            'name' => ['required', 'string'],
            'avatar_url' => [
                'nullable',
                'image',
                'mimes:jpeg,png',
                'max:5120',
            ],
        ];

        if ($this->filled('old_password') || $this->filled('new_password')) {
            $rules['old_password'] = ['required', function ($attribute, $value, $fail) {
                $user = auth()->user();
                if (!Hash::check($value, $user->password)) {
                    return $fail('The old password is incorrect.');
                }
            }];
            
            $rules['new_password'] = ['required', 'string', 'min:8'];
        }

        return $rules;
    }
}
