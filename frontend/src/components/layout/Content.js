import React, { Component } from 'react';
import Footer from './Footer';
import Header from './Header';
import Home from './homepage/Home';

class Content extends Component {
    render() {
        return (
            <div className="content">
                <Header />
                <Home />
                <Footer />
            </div>
        );
    }
}

export default Content;
