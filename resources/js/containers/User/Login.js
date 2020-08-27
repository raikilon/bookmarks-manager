import React from 'react';
import Api from "../../util/Api";
import {withRouter} from 'react-router-dom'

class UserLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        Api().post('/login', {
            username: this.state.username,
            password: this.state.password,
        }).then((response) => {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('username', response.data.user.username);
            this.props.history.push("/bookmarks");
        }, (error) => {
            alert(error.message);
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <div className="col-4 mx-auto">
                        <input type={"text"} name={"username"} value={this.state.username}
                               placeholder={"Username"}
                               onChange={this.handleChange} className="formStyle"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 mx-auto">
                        <input type={"password"} name={"password"} value={this.state.password}
                               placeholder={"Password"}
                               onChange={this.handleChange} className="formStyle"/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-4 mx-auto">
                        <input type="submit" className="btn formButton" value={"Login"}/>
                    </div>
                </div>
            </form>
        );
    }
}

export default withRouter(UserLogin);
