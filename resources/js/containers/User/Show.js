import React from 'react';
import {withRouter} from "react-router-dom";
import Api from "../../util/Api";
import LoadingComponent from "../../components/UI/LoadingComponent";

class UserShow extends React.Component {

    constructor(props) {
        super(props);
        this.handleShare = this.handleShare.bind(this);
        this.state = {
            button: "",
            isLoading: true,
        }
    }


    componentDidMount() {
        Api().get(`/bookmark/${this.props.bookmark}/user/${this.props.user.id}`).then((response) => {
            this.setState({
                button: response.data.contain ? "Unshare" : "Share",
                isLoading: false,
            })
        }, (error) => {
            alert(error)
        });
    }

    handleShare(event) {
        Api().put(`/share/${this.props.bookmark}/user/${this.props.user.id}`).then((response) => {
            this.setState((prevState) => {
                return {
                    button: prevState.button === "Unshare" ? "Share" : "Unshare",
                }
            })
        }, (error) => {
            alert(error)
        });
        event.preventDefault();
    }

    render() {
        return (
            this.state.isLoading ?
                <LoadingComponent /> :
                <div>
                    <div className={"row"}>
                        <div className={"col-8"}>
                            <div className="row">
                                <div className="col-2">First Name:</div>
                                <div className="col-10">{this.props.user.first_name}</div>
                            </div>
                            <div className="row">
                                <div className="col-2">Last Name:</div>
                                <div className="col-10">{this.props.user.last_name}</div>
                            </div>
                            <div className="row">
                                <div className="col-2">Email:</div>
                                <div className="col-10">{this.props.user.email}</div>
                            </div>
                        </div>
                        <div className={"col-4"}>
                            <div className="row flex-row-reverse">
                                <input type={"button"} value={this.state.button} onClick={this.handleShare}
                                       className={"btn formButton ml-2"} style={{marginTop: "0px"}}/>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
        );
    }
}

export default withRouter(UserShow);
