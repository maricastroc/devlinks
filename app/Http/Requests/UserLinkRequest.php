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
            'links' => 'required|array',
            'links.*.platform_id' => 'required|exists:platforms,id',
            'links.*.url' => 'required|url',
        ];
    }
}
