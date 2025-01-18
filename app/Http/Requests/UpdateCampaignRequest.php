<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCampaignRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [];

        $step = $this->input('step');

        if ($step == 1) {
            $rules = [
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('campaigns')->ignoreModel($this->route('campaign'))
                ],
                'subject' => ['required', 'string', 'max:255'],
                'email_list_id' => [
                    'required',
                    'integer',
                    'exists:email_lists,id',
                ],
                'template_id' => [
                    'required',
                    'integer',
                    'exists:templates,id',
                ],
                'track_click' => [
                    'required', 'boolean'
                ],
                'track_open' => [
                    'required', 'boolean'
                ]
            ];
        }

        if ($step == 2) {
            $rules = [
                'body' => ['required'],
            ];
        }

        if ($step == 3) {
            $rules = [
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('campaigns')->ignoreModel($this->route('campaign'))
                ],
                'subject' => ['required', 'string', 'max:255'],
                'email_list_id' => [
                    'required',
                    'integer',
                    'exists:email_lists,id',
                ],
                'template_id' => [
                    'required',
                    'integer',
                    'exists:templates,id',
                ],
                'track_click' => ['required', 'boolean'],
                'track_open' => ['required', 'boolean'],
                'body' => ['required'],
                'send_at' => ['required', 'date', 'after_or_equal:today'],
            ];
        }

        return $rules;
    }
}