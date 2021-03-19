import './public/css/styles.bundle.css';
import './public/css/vendors.bundle.css';
import React, { Component } from 'react';
import SideBar from './components/SideBar';
import Header from './components/Header';
import Section from './components/Section';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import ChartsSection from './components/ChartsSection';

class App extends Component {
  render() {
    return (
      <div id="wrapper" data-scrollable="true">

        <SideBar />
        <main id="pageWrapper">
          <Header />
          {/* Page Banner [[ Find at scss/base/core.scss ]] */}
          <div className="banner bg-home" />

          {/* Begin | Main Container [[ Find at scss/base/core.scss ]] */}
          <div className="main-container" id="appRoute">
            <Section />
            <ChartsSection />
            <Section />
          </div>
          {/* End | Main Container */}
          
          <Footer />
          <AudioPlayer />
        </main>
      </div>
    );
  }
}

export default App;