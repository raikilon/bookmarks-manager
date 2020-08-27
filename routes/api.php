<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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


Route::post('/login', 'API\AuthController@login');
Route::post('/register', 'API\AuthController@register');

Route::middleware('auth:api')->group(function () {

    Route::get('/share', 'API\ShareController@index');
    Route::delete('/share/{bookmark}/user/{user}', 'API\ShareController@destroy');
    Route::put('/share/{bookmark}/user/{user}', 'API\ShareController@update');
    Route::get('/share/{bookmark}', 'API\ShareController@show');

    Route::get('/user', 'API\UserController@index');
    Route::post('/logout', 'API\AuthController@logout');
    Route::get('/user/{username}', 'Api\UserController@show');
    Route::put('/user/{user}', 'Api\UserController@update');

    Route::get('/bookmark', 'API\BookmarkController@index');
    Route::get('/bookmark/{bookmark}/user/{user}', 'Api\BookmarkController@isShared');
    Route::post('/bookmark/store', 'API\BookmarkController@store');
    Route::get('/bookmark/{bookmark}', 'API\BookmarkController@show');
    Route::put('/bookmark/{bookmark}', 'API\BookmarkController@update');
    Route::delete('/bookmark/{bookmark}', 'API\BookmarkController@destroy');
});



//Route::view('/{path?}','app');
