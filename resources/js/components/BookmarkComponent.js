import React from 'react';
import {Link} from 'react-router-dom'

class BookmarkComponent extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className={"row"}>
                    <div className={"col-8"}>
                        <div className="row">
                            <div className="col-12">{this.props.bookmark.title}</div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <a href={this.props.bookmark.url} target="_blank">{this.props.bookmark.url}</a>
                            </div>
                        </div>
                    </div>
                    <div className={"col-4"}>
                        <div className="row flex-row-reverse">
                            <Link to={`/${this.props.type ? 'accessing' : 'bookmarks'}/${this.props.bookmark.id}`}
                                  className={"btn formButton ml-2"} style={{marginTop: "0px"}}>Details</Link>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }

}

export default BookmarkComponent;
