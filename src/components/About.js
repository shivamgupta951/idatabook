import React from 'react';
import Backgroundimage from '../images/Background_image.png';

const About = () => {
  const backgroundStyle = {
    backgroundImage: `url(${Backgroundimage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '92vh',
    width: '100vw',
  };

  return (
    <div style={backgroundStyle}>
      {/* Add your content here */}
    </div>
  );
};

export default About;
