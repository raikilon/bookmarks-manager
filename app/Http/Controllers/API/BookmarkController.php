<?php

namespace App\Http\Controllers\API;

use App\Bookmark;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookmarkResource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookmarkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index()
    {
        return BookmarkResource::collection(auth()->user()->bookmarks);
    }


    public function isShared(Bookmark $bookmark, User $user)
    {
        return response(['contain' => $bookmark->viewers->contains($user->id)], 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:100',
            'url' => 'required|active_url',
            'description' => 'string|nullable',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $request->user()->bookmarks()->create($validator->valid());

        return response(["message" => 'Bookmark created'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Bookmark $bookmark
     * @return \Illuminate\Http\Response
     */
    public function show(Bookmark $bookmark)
    {
        $this->authorize('view', $bookmark);
        return response(['bookmark' => new BookmarkResource($bookmark)], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Bookmark $bookmark
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Bookmark $bookmark)
    {
        $this->authorize('update', $bookmark);

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:100',
            'url' => 'required|active_url',
            'description' => 'string|nullable',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $bookmark->update($validator->valid());

        $response = ['message' => 'Successful update'];
        return response($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Bookmark $bookmark
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bookmark $bookmark)
    {
        $this->authorize('update', $bookmark);
        $bookmark->delete();
        $response = ['message' => 'Successful delete'];
        return response($response, 200);
    }


}
