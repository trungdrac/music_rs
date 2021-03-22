import React, { Component } from 'react';
import Header from './Header';
import Home from '../homepage/Home';
import AudioPlayer from './AudioPlayer';

class Content extends Component {
    render() {
        return (
            <div className="content">
                <Header />
                <Home />
                <AudioPlayer />
            </div>
        );
    }
}

export default Content;
