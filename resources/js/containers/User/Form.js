import React from 'react';
import Api from "../../util/Api";
import {withRouter} from 'react-router-dom'
import LoadingComponent from "../../components/UI/LoadingComponent";

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            email: "",
            isLoading: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        if (this.props.edit) {
            this.setState({
                isLoading: true,
            })
            Api().get(`/user/${localStorage.getItem("username")}`).then((response) => {
                this.setState({
                    firstName: response.data.user.first_name,
                    lastName: response.data.user.last_name,
                    email: response.data.user.email,
                    id: response.data.user.id,
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
        Api().post('/register', {
            first_name: this.state.firstName,
            last_name: this.state.firstName,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
        }).then((response) => {
            this.props.history.push("/login");
        }, (error) => {
            alert("Registration error")
        });
        event.preventDefault();
    }

    handleUpdate(event) {
        Api().put(`/user/${this.state.id}`, {
            first_name: this.state.firstName,
            last_name: this.state.firstName,
            email: this.state.email,
        }).then((response) => {
            alert(response.data.message)
        }, (error) => {
            alert(error)
        });
        event.preventDefault();
    }

    render() {
        return (
            this.state.isLoading ?
                <LoadingComponent /> :
                <form onSubmit={this.props.edit ? this.handleUpdate : this.handleSubmit}>
                    <div className="form-group row">
                        <div className="col-4 mx-auto">
                            <input type={"text"} name={"firstName"} value={this.state.firstName}
                                   placeholder={"First Name"}
                                   onChange={this.handleChange} className="formStyle"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-4 mx-auto">
                            <input type={"text"} name={"lastName"} value={this.state.lastName} placeholder={"Last Name"}
                                   onChange={this.handleChange} className="formStyle"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-4 mx-auto">
                            <input type={"email"} name={"email"} value={this.state.email} placeholder={"Email"}
                                   onChange={this.handleChange} className="formStyle"/>
                        </div>
                    </div>
                    {
                        !this.props.edit &&
                        <div className="form-group row">
                            <div className="col-4 mx-auto">
                                <input type={"text"} name={"username"} value={this.state.username}
                                       placeholder={"Username"}
                                       onChange={this.handleChange} className="formStyle"/>
                            </div>
                        </div>
                    }
                    {
                        !this.props.edit &&
                        <div className="row">
                            <div className="col-4 mx-auto">
                                <input type={"password"} name={"password"} value={this.state.password}
                                       placeholder={"Password"}
                                       onChange={this.handleChange} className="formStyle"/>
                            </div>
                        </div>
                    }
                    <div className="form-group row">
                        <div className="col-4 mx-auto">
                            <input type="submit" className="btn formButton"
                                   value={`${this.props.edit ? "Update" : "Sign in"}`}/>
                        </div>
                    </div>
                </form>
        );
    }
}

export default withRouter(UserForm);
