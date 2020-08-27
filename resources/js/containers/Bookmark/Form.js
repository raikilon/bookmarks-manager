import React from 'react';
import Api from "../../util/Api";
import {withRouter} from 'react-router-dom'
import LoadingComponent from "../../components/UI/LoadingComponent";

class BookmarkForm extends React.Component {

    constructor(props) {
        super(props);
        const {id} = props.match.params;
        this.state = {
            title: "",
            url: "",
            description: "",
            isLoading: false,
            id: id,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        if (this.state.id) {
            this.setState({
                isLoading: true,
            })
            Api().get(`/bookmark/${this.state.id}`).then((response) => {
                this.setState({
                    title: response.data.bookmark.title,
                    url: response.data.bookmark.url,
                    description: response.data.bookmark.description,
                    isLoading: false,
                })
            }, (error) => {
                alert(error)
            });
        }
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        Api().post('/bookmark/store', {
            title: this.state.title,
            url: this.state.url,
            description: this.state.description,
        }).then((response) => {
            this.props.history.push("/bookmarks");
        }, (error) => {
            alert("Creation error")
        });
        event.preventDefault();
    }

    handleUpdate(event) {
        Api().put(`/bookmark/${this.state.id}`, {
            title: this.state.title,
            url: this.state.url,
            description: this.state.description,
        }).then((response) => {
            this.props.history.push("/bookmarks");
        }, (error) => {
            alert(error)
        });
        event.preventDefault();
    }

    render() {
        return (
            this.state.isLoading ?
                <LoadingComponent /> :
                <form onSubmit={this.state.id ? this.handleUpdate : this.handleSubmit}>
                    <div className="form-group row">
                        <div className="col-8 mx-auto">
                            <input name={"title"} value={this.state.title} placeholder={"Title"}
                                   onChange={this.handleChange} className="formStyle"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-8 mx-auto">
                            <input type={"text"} name={"url"} value={this.state.url} placeholder={"Link"}
                                   onChange={this.handleChange} className="formStyle"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-8 mx-auto">
                            <textarea name={"description"} value={this.state.description} placeholder={"Description"}
                                      onChange={this.handleChange} style={{minHeight:"200px"}} className="formStyle"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-8 mx-auto">
                            <input type="submit" className="btn formButton"
                                   value={`${this.state.id ? "Update" : "Create"}`}/>
                        </div>
                    </div>
                </form>
        );
    }

}

export default withRouter(BookmarkForm);
