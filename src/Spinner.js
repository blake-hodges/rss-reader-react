import React from 'react';

function Spinner() {
    return(
        <div className="text-center">
            <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span className="pl-2">Loading...</span>
            </button>
        </div>
    )
}

export default Spinner
