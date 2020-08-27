import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import Api from "../../util/Api";

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        Api().post(`/logout`).then(res => {
            localStorage.clear();
            this.props.history.push("/");
        }, error => {
            alert(error)
        });
        event.preventDefault();
    }

    render() {
        const path = this.props.location.pathname;
        return (
            <header className={"masthead"}>
                <div className={"inner"}>
                    <h3 className="masthead-brand">Bookmarks Manager</h3>
                    <nav className="nav nav-masthead justify-content-center">
                        {
                            !localStorage.getItem('access_token') &&
                            <Link className={`nav-link ${path == "/" && "active"}`} to={"/"}>Home</Link>
                        }
                        {
                            !localStorage.getItem('access_token') &&
                            <Link className={`nav-link ${path.includes("users/new") && "active"}`} to={"/register"}>Sign
                                in</Link>
                        }
                        {
                            !localStorage.getItem('access_token') &&
                            <Link className={`nav-link ${path.includes("login") && "active"}`}
                                  to={"/login"}>Login</Link>
                        }
                        {
                            localStorage.getItem('access_token') &&
                            <Link className={`nav-link ${path.includes("bookmarks") && "active"}`}
                                  to={"/bookmarks"}>My Bookmarks</Link>
                        }
                        {
                            localStorage.getItem('access_token') &&
                            <Link className={`nav-link ${path.includes("accessing") && "active"}`}
                                  to={"/accessing"}>Shared with me</Link>
                        }
                        {
                            localStorage.getItem('access_token') &&
                            <Link className={`nav-link ${path.includes("users") && "active"} `}
                                  to={'users/edit'}>{localStorage.getItem('username')}</Link>
                        }
                        {
                            localStorage.getItem('access_token') &&
                            <a className={`nav-link`} style={{cursor:"pointer"}} onClick={this.handleLogout}>Logout</a>
                        }

                    </nav>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
