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
            'links' => 'nullable|array',
            'links.*.platform_id' => 'required_if:links,!=,null|exists:platforms,id',
            'links.*.username' => 'required_if:links,!=,null|string|max:255',
            'links.*.order' => 'required_if:links,!=,null|integer',
            'links.*.custom_name' => 'nullable|string|max:255',
        ];
    }
}