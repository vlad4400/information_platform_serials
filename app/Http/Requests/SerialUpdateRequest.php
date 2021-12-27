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
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'year' => ['required', 'integer']
        ];
    }

    public function messages()
    {
        return [
            'required' => 'Поле :attribute обязательно необходимо заполнить',
            'min' => [
                'string' => 'Поле :attribute должно содержать не меньше :min символов.'
            ],
            'integer' => 'Поле :attribute должно быть числом.'
        ];
    }

    public function attributes()
    {
        return [
            'title' => 'Название',
            'description' => 'Описание',
            'year' => 'Год'
        ];
    }
}
