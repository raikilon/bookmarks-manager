import React from 'react';
import BookmarkComponent from "../../components/BookmarkComponent";
import Api from "../../util/Api";
import LoadingComponent from "../../components/UI/LoadingComponent";


class SharedBookmarkList extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        }

    }

    componentDidMount() {
        Api().get('/share').then((response) => {
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
                <LoadingComponent/> :
                <div>
                    <hr/>
                    {this.state.bookmarks.length > 0 ?
                        this.state.bookmarks.map(bookmark =>
                            <BookmarkComponent type={"shared"} bookmark={bookmark} key={bookmark.id}/>
                        )
                        :
                        <h2>No Shared Bookmarks</h2>
                    }
                </div>
        );
    }

}

export default SharedBookmarkList;


