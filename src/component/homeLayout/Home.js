import React from 'react';

import './home.css';
import Footer from './Footer';
import Header from './Header';

const Home = () => {
  return (
    <div>
      <Header/>

      <section className="image-section">
        {/* <img src="your-image-path.jpg" alt="Investment Graphic" /> */}
      </section>

      <section className="quote-section">
        <div className="quote-content">
          <h1>주식시장은 인내심 있는 사람에게서 인내심 없는 사람에게로 돈이 이동하는 곳이다.</h1>
          <p>워렌 버핏</p>
          {/* <a href="#" className="button">이동하기</a> */}
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default Home;
