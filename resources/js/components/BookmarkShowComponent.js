import React from 'react';

class BookmarkShowComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className={"col-12"}>
                        <div className="h1">{this.props.title}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <a href={this.props.url} target="_blank">{this.props.url}</a>
                    </div>
                </div>
                <div className="row pt-2">
                    <div className="col-12"><h4>Description:</h4></div>
                    <div className="col-12">{this.props.description}</div>
                </div>
            </div>
        );
    }

}

export default BookmarkShowComponent;
