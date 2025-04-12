<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserLinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'links' => 'nullable|array',
            'links.*.platform_id' => 'required_if:links,!=,null|exists:platforms,id',
            'links.*.url' => 'required_if:links,!=,null|url',
            'links.*.order' => 'required_if:links,!=,null|integer',
        ];
    }
}
