<?php

namespace App\Http\Controllers\API;

use App\Bookmark;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookmarkResource;
use App\User;
use Illuminate\Http\Request;

class ShareController extends Controller
{

    public function index()
    {
        return BookmarkResource::collection(auth()->user()->accessing);
    }

    public function show(Bookmark $bookmark)
    {
        $this->authorize('viewShare', $bookmark);
        return response(['bookmark' => new BookmarkResource($bookmark)], 200);
    }

    public function update(Bookmark $bookmark, User $user)
    {
        $this->authorize('update', $bookmark);
        $bookmark->viewers()->toggle($user->id);
        $response = ['message' => 'Successful share'];
        return response($response, 200);
    }

    public function destroy(Bookmark $bookmark, User $user)
    {
        $this->authorize('deleteShare', $bookmark);
        $bookmark->viewers()->detach($user->id);
        $response = ['message' => 'Successful delete'];
        return response($response, 200);
    }
}
