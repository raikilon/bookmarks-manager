import React from 'react';
import Api from "../../util/Api";
import UserShow from "./Show";
import LoadingComponent from "../../components/UI/LoadingComponent";


class UserList extends React.Component {


    constructor(props) {
        super(props);
        const {id} = props.match.params;
        this.state = {
            isLoading: true,
            bookmark_id: id,
        }

    }

    componentDidMount() {
        Api().get('/user').then((response) => {
            this.setState({
                users: response.data.data,
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
                    <div className={"row mb-4"}>
                        <div className={"col-12"}>
                            <h3>Choose user to share with!</h3>
                        </div>
                    </div>
                    {this.state.users.length > 0 ? this.state.users.map(user => !(user.username === localStorage.getItem("username"))
                        && <UserShow bookmark={this.state.bookmark_id} user={user} key={user.id}/>) :
                        <h2>No users to share with</h2>}
                </div>
        );
    }

}

export default UserList;


