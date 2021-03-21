import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="heading">
                    <div className="d-flex flex-wrap align-items-end">
                        <div className="flex-grow-1">
                            <h4>Top Charts</h4>
                            <p>Listen top chart</p>
                        </div>
                        <a href="songs.html" className="btn btn-sm btn-pill btn-air btn-primary">View All</a>
                    </div>
                    <hr />
                </div>
                <div className="row">
                    
                </div>
            </div>
        );
    }
}

export default Home;
