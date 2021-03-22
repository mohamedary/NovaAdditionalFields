<?php

namespace Crayon\AdditionalFields;

use Laravel\Nova\Fields\Field;

class AdditionalFields extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'additional-fields';

    public function parent($value)
    {
        return $this->withMeta([
            'parent_value' => $value
        ]);
    }

    public function endpoint($endpoint)
    {
        return $this->withMeta([
            'endpoint' => $endpoint
        ]);
    }


    protected function fillAttributeFromRequest($request, $requestAttribute, $model, $attribute)
    {
        if ($request->exists($requestAttribute))
        {
            $model->{$attribute} = $request[$requestAttribute];
        }
    }
}
