<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SocialLinkRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'platform_id' => 'required|exists:platforms,id',
            'value' => 'required|string|max:255', 
        ];
    }
}