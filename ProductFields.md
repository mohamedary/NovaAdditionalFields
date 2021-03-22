## Resource

```php
<?php

namespace App\Nova;

use App\Models\ProductField;
use Benjaminhirsch\NovaSlugField\Slug;
use Benjaminhirsch\NovaSlugField\TextWithSlug;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Select;

class ProductFields extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static string $model = ProductField::class;

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'name',
    ];

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'name';

    /**
     * Get the fields displayed by the resource.
     *
     * @param Request $request
     * @return array
     */
    public function fields(Request $request): array
    {
        return [
            TextWithSlug::make(__('Text'), 'text')
                ->translatable()
                ->sortable()
                ->slug('name')
                ->rules(['required', 'string', 'unique:product_fields,text->en']),

            Select::make(__('Type'), 'type')->options([
                'text' => 'Text',
                'checkbox' => 'Boolean',
                'number' => 'Number',
                'textarea' => 'Textarea',
            ])->rules(['required', 'string', 'max:191']),

            Slug::make(__('Name'), 'name')
                ->required(['required', 'string', 'max:191']),

            BelongsTo::make('Category')->searchable(),
        ];
    }

    /**
     * Get the cards available for the request.
     *
     * @param Request $request
     * @return array
     */
    public function cards(Request $request)
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param Request $request
     * @return array
     */
    public function filters(Request $request)
    {
        return [];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param Request $request
     * @return array
     */
    public function lenses(Request $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param Request $request
     * @return array
     */
    public function actions(Request $request)
    {
        return [];
    }
}

```

I used ``composer require benjaminhirsch/nova-slug-field`` to automatically generate a name for the field.

## Model

```php 
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductField extends Model
{
    use HasFactory, SoftDeletes;

    protected $casts = ['options' => 'array'];

    /**
     * Get the main category.
     *
     * @return BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
```