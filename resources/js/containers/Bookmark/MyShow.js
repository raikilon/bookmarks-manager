import React from 'react';
import Api from "../../util/Api";
import {Link, withRouter} from "react-router-dom";
import BookmarkShowComponent from "../../components/BookmarkShowComponent";
import LoadingComponent from "../../components/UI/LoadingComponent";

class MyBookmarkShow extends React.Component {


    constructor(props) {
        super(props);
        const {id} = props.match.params;
        this.state = {
            title: "",
            url: "",
            description: "",
            isLoading: true,
            id: id,
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        Api().delete(`/bookmark/${this.state.id}`).then((response) => {
            this.props.history.push("/bookmarks");
        }, (error) => {
            alert(error)
        });
        event.preventDefault();
    }

    componentDidMount() {

        Api().get(`/bookmark/${this.state.id}`).then((response) => {
            this.setState({
                title: response.data.bookmark.title,
                url: response.data.bookmark.url,
                description: response.data.bookmark.description,
                id: response.data.bookmark.id,
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
                    <BookmarkShowComponent {...this.state}/>
                    <div className={"row mt-2"}>
                        <div>
                            <Link to={`/bookmarks/${this.state.id}/share`}
                                  className={"btn formButton ml-2"}>Share</Link>
                            <Link to={`/bookmarks/${this.state.id}/edit`}
                                  className="btn formButton ml-2">Edit</Link>

                            <input type={"button"} onClick={this.handleDelete}
                                   className="btn formButton ml-2" value={"Delete"}/>
                        </div>
                    </div>
                </div>
        );
    }

}

export default withRouter(MyBookmarkShow);
