import React from 'react';

import { Container } from '../styles/components/Slider';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { lettersData, lettersPostsData } from '../pages/index';

interface SliderProps {
  data: lettersData[]
};

const Slider: React.FC<SliderProps> = ({ data }) => {

  const slideLeft = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 800;
  };

  const slideRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 800;
  };

  return (
    <Container>
      <MdChevronLeft size={40} className="slider-icon left" color="gray" onClick={slideLeft} />
      <div id="slider">
        {data.map((userData: lettersData, index: number) => (
          <div className="card" key={index}>
            <div><p>Id:{' '}</p>{`${userData.id}`}</div><br />
            <div><p>Name:{' '}</p>{`${userData.name}`}</div><br />
            <div><p>Username:{' '}</p>{`${userData.username}`}</div><br />
            <div><p>Email:{' '}</p>{`${userData.email}`}</div><br />
            <div><p>Address:{' '}</p>{`${userData.address}`}</div><br />
            <div><p>Phone:{' '}</p>{`${userData.phone}`}</div><br />
            <div><p>Website:{' '}</p>{`${userData.website}`}</div><br />
            <div><p>Company:{' '}</p>{`${userData.company}`}</div><br />
            <h3>{`Posts: `}</h3>
            <hr />
            {userData.posts.map((post: lettersPostsData, index: number) => (
              <div key={index}>
                <div><p>Id:{' '}</p>{`${post.id}`}</div><br />
                <div><p>Title:{' '}</p>{`${post.title}`}</div><br />
                <div><p>Body:{' '}</p>{`${post.body}`}</div><br />
                <hr />
              </div>
            ))}
          </div>
        ))}
      </div>
      <MdChevronRight size={40} className="slider-icon right" color="gray" onClick={slideRight} />
    </Container>
  );
}

export default Slider;