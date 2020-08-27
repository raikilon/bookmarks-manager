import React from 'react';

class LoadingComponent extends React.Component {

    render() {
        return (
            <div className="form-group row">
                <div className="col-4 mx-auto text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoadingComponent;
