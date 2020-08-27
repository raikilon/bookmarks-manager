import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import HomeComponent from "../components/UI/HomeComponent"
import FooterComponent from "../components/UI/FooterComponent";
import Header from "./UI/Header";
import MyBookmarkList from "./Bookmark/MyList";
import MyBookmarkDetail from "./Bookmark/MyShow";
import NoMatchComponent from "../components/UI/NoMatchComponent";
import UserEdit from "./User/Form";
import BookmarkEdit from "./Bookmark/Form";
import UserLogin from "./User/Login";
import PrivateRoute from "../util/PrivateRoute";
import UserList from "./User/List";
import SharedBookmarkList from "./Bookmark/SharedList";
import SharedBookmarkDetail from "./Bookmark/SharedShow";

const routing = (
    <Router>
        <Header/>
        <main role="main" className="inner cover h-100">
            <Switch>
                <PrivateRoute path="/bookmarks/:id/edit" exact component={BookmarkEdit}/>
                <PrivateRoute path="/bookmarks/new" exact component={BookmarkEdit}/>
                <PrivateRoute path="/bookmarks/:id" exact component={MyBookmarkDetail}/>
                <PrivateRoute path="/accessing/:id" exact component={SharedBookmarkDetail}/>
                <PrivateRoute path="/accessing" exact component={SharedBookmarkList}/>
                <PrivateRoute path="/bookmarks/:id/share" exact component={UserList}/>
                <PrivateRoute path="/bookmarks" exact component={MyBookmarkList}/>
                <Route path="/register" exact component={UserEdit}/>
                <Route path="/login" exact component={UserLogin}/>
                <PrivateRoute path="/users/edit" exact>
                    <UserEdit edit={true}/>
                </PrivateRoute>
                <Route path="/" exact component={HomeComponent}/>
                <Route path="*" component={NoMatchComponent}/>
            </Switch>
        </main>
        <FooterComponent/>
    </Router>
)

if (document.getElementById('app')) {
    ReactDOM.render(routing, document.getElementById('app'));
}
