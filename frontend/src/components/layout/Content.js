import React, { Component } from 'react';
import Header from './Header';
import Home from '../homepage/Home';
import Player from './Player';

class Content extends Component {
    render() {
        return (
            <div className="content">
                <Header />
                <Home />
                <Player />
            </div>
        );
    }
}

export default Content;
