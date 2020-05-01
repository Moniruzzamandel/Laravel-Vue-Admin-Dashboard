<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources([
    'user' => 'API\UserController',
    'category' => 'API\CategoryController'
]);

Route::put('/category/status/{category}', [
    'uses'=>'API\CategoryController@status',
    'as'=>'category.status'
] );


Route::get('/recycle-categories', 'API\CategoryController@trash')->name('categories.trash');
Route::get('/recycle-categories/{id}', 'API\CategoryController@restore')->name('categories.restore');
Route::post('/recycle-categories', 'API\CategoryController@remove')->name('categories.remove');

Route::get('/assign-categories/{url}', 'API\CategoryController@assign');

Route::get('profile', 'API\UserController@profile');
Route::put('profile', 'API\UserController@updateProfile');
