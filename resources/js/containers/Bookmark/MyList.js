import React from 'react';
import BookmarkComponent from "../../components/BookmarkComponent";
import Api from "../../util/Api";
import {Link} from "react-router-dom";
import LoadingComponent from "../../components/UI/LoadingComponent";


class MyBookmarkList extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        }

    }

    componentDidMount() {
        Api().get('/bookmark').then((response) => {
            this.setState({
                bookmarks: response.data.data,
                isLoading: false,
            })
        }, (error) => {
            alert(error)
        });
    }

    render() {

        return (
            this.state.isLoading ?
                <LoadingComponent /> :
                <div>
                    <div className="row flex-row-reverse">
                        <Link to={`/bookmarks/new`}
                              className={"btn formButton"}>New</Link>
                    </div>
                    <hr/>
                    {this.state.bookmarks.length > 0 ? this.state.bookmarks.map(bookmark => <BookmarkComponent
                        bookmark={bookmark} key={bookmark.id}/>): <h2>No Bookmarks</h2>}
                </div>
        );
    }

}

export default MyBookmarkList;


