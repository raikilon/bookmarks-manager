import React from 'react';
import {Link} from 'react-router-dom'

class NoMatchComponent extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-12 text-center">
                    <div className="error-template">
                        <h1>
                            Oops!</h1>
                        <h2>
                            404 Not Found</h2>
                        <div className="error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>
                        <div className="error-actions">
                            <Link to={"/"} className="btn formButton" style={{float: "none"}}>
                                <span className="glyphicon glyphicon-home"></span>
                                Take Me Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoMatchComponent;
