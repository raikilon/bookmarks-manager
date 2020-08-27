import React from 'react';
import Api from "../../util/Api";
import {withRouter} from "react-router-dom";
import BookmarkShowComponent from "../../components/BookmarkShowComponent";
import LoadingComponent from "../../components/UI/LoadingComponent";

class SharedBookmarkShow extends React.Component {

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
        // get user id
        Api().get(`/user/${localStorage.getItem("username")}`).then((response) => {
            // remove bookmarks
            Api().delete(`/share/${this.state.id}/user/${response.data.user.id}`).then((response) => {
                this.props.history.push("/accessing");
            }, (error) => {
                alert(error)
            });
        }, (error) => {
            alert(error)
        });

        event.preventDefault();
    }

    componentDidMount() {
        Api().get(`/share/${this.state.id}`).then((response) => {
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
                <LoadingComponent /> :
                <div>
                    <BookmarkShowComponent {...this.state}/>
                    <div className={"row mt-2"}>
                        <input type={"button"} onClick={this.handleDelete}
                               className="btn formButton ml-2" value={"Remove"}/>
                    </div>
                </div>
        );
    }

}

export default withRouter(SharedBookmarkShow);
