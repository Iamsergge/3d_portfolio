import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../assets/icons/arrow.svg';

const InfoBox = ({ text, link, btnText }) => (
  <div className='info-box'>
    <p className="font-medium sm:text-xl text-center">{text}</p>
    <Link to={link} className='neo-brutalism-white neo-btn'>
      {btnText}
      <img src={arrow} className='w-4 h-4 object-contain' alt="arrow" />
    </Link>
  </div>
);

const renderContent = {
  1: (
    <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
      Hi, I am <span className='font-semibold'>Serge</span>👋
      <br />
      web and Mobile Developer from South Africa
    </h1>
  ),
  2: (
    <InfoBox
      text="Worked with Mlab Southern Africa and picked up many skills along the way"
      link="/about"
      btnText="Learn more"
    />
  ),
  3: (
    <InfoBox
      text="Led multiple projects to success over a year. Curious about the impact?"
      link="/projects"
      btnText="Visit my portfolio"
    />
  ),
  4: (
    <InfoBox
      text="Need a project done or looking for a dev? I'm just a keystroke away"
      link="/contact"
      btnText="Let's talk"
    />
  ),
};

const stageMapping = {
  1: 4,
  2: 3,
  3: 4,
  4: 1,
};

const HomeInfo = ({ currentStage }) => {
  const nextStage = stageMapping[currentStage] || 1;
  return renderContent[nextStage] || null;
};

export default HomeInfo;
