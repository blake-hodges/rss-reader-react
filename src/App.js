import React, { Component } from 'react';
import FeedWrapper from './FeedWrapper'
import './App.css';

class App extends Component {

    render() {
        return (
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>RSS Feed Reader</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-6  col-md-8 col-sm-10 col-12">
                        <div className="feed-wrapper">
                            <FeedWrapper />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
