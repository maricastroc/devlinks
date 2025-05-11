<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserLinkRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'links' => 'present|array',
            'links.*.platform_id' => 'required|exists:platforms,id',
            'links.*.username' => 'required|string|max:255',
            'links.*.order' => 'required|integer',
            'links.*.custom_name' => 'nullable|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'links.present' => 'The links field must be present',
            'links.min' => 'At least one link must be provided',
            'links.*.platform_id.required' => 'The platform ID is required for each link',
            'links.*.username.required' => 'The username is required for each link',
            'links.*.order.required' => 'The order is required for each link',
        ];
    }
}