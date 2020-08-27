<?php

namespace App\Policies;

use App\Bookmark;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BookmarkPolicy
{
    use HandlesAuthorization;


    /**
     * Determine whether the user can view the model.
     *
     * @param \App\User $user
     * @param \App\Bookmark $bookmark
     * @return mixed
     */
    public function view(User $user, Bookmark $bookmark)
    {
        return $user->id == $bookmark->user->id;
    }


    /**
     * Determine whether the user can view the model.
     *
     * @param \App\User $user
     * @param \App\Bookmark $bookmark
     * @return mixed
     */
    public function viewShare(User $user, Bookmark $bookmark)
    {
        return $bookmark->viewers->contains($user->id);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param \App\User $user
     * @param \App\Bookmark $bookmark
     * @return mixed
     */
    public function update(User $user, Bookmark $bookmark)
    {
        return $user->id == $bookmark->user->id;
    }


    /**
     * Determine whether the user can delete the model.
     *
     * @param \App\User $user
     * @param \App\Bookmark $bookmark
     * @return mixed
     */
    public function delete(User $user, Bookmark $bookmark)
    {
        return $user->id == $bookmark->user->id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param \App\User $user
     * @param \App\Bookmark $bookmark
     * @return mixed
     */
    public function deleteShare(User $user, Bookmark $bookmark)
    {
        return $bookmark->viewers->contains($user->id);
    }


}
