<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SerialUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
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
            'tmdb_id' => ['required', 'integer'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'year' => ['required', 'integer'],
            'poster' => ['string', 'max:100'],
            'rate' => ['numeric']
        ];
    }
}
