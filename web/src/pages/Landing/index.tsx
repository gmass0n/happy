import React from 'react';

import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { logoImg } from '../../images';

import './styles.css';

const Landing: React.FC = () => {
  return (
    <div id="landing-page">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy Logo"/>

        <main>
          <h1>Leve felicidade pdara o mungo</h1>

          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Rio do Sul</strong>
          
          <span>Santa Catarina</span>
        </div>

        <Link to="/orphanages" className="enter-app">
          <FiArrowRight />
        </Link>
      </div>
    </div>
  )
}

export default Landing;