# Laravel Nova Additional Fields

A laravel nova package that allows you to dynamically append inputs to your resources based on a database table.

## Installation

``composer require crayon/nova-additional-fields``

## Documentation

Assuming you are building an eCommerce website, and you have different types of products. It would be uncomfortable if you want the admin of the website to enter custom values for each product.

So this package allows you to define form inputs in a Nova resource;

### Migration

Product fields (Each field belongs to a category):

```php
Schema::create('product_fields', function (Blueprint $table) {
    $table->id();
    $table->json('text');
    $table->string('type');
    $table->string('name');
    $table->text('options')->nullable();
    $table->unsignedBigInteger('category_id');
    $table->softDeletes();
    $table->timestamps();

    $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
});
```

### Resource Usage
The additional fields will be loaded from an endpoint (Fields that belong to the category we selected)
```php
AdditionalFields::make('Additional Fields', 'fields')
    ->parent('category')
    ->endpoint('/api/category/{category}/fields')
    ->hideFromIndex(),
```

### Endpoint

#### Route
```php 
Route::get('/category/{category}/fields', [\App\Http\Controllers\Api\NovaHelpers\NovaCategoryController::class, 'fields']);
```
#### Controller
```php
/**
 * Get available fields by Category ID
 *
 * @param $category
 * @return mixed
 */
public function fields($category)
{
    return Category::findOrFail($category)->fields->map(fn($field) => [
        'id' => $field->id,
        'text' => $field->text,
        'type' => $field->type,
        'name' => $field->name,
        'options' => $field->options
    ]);
}
```

The fields will be loaded into your resource based on the ones you added to your database. ProductFields resource find it [here](https://github.com/crayon1337/NovaAdditionalFields/ProductFields.md)

## Conclusion

Laravel Nova is a great piece of software that will boost your productivity when it comes to building admin panels. With a little of customization through custom packages & fields. You are ready to rock 'N roll.