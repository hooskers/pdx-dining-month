/** @jsx jsx */
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { jsx, css } from '@emotion/core';

import data from './src/data/restaurantData.json'

const style = css`
  color: black;
`;

const gridStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px 15px;

  > .restaurant-item {
    display: flex;
    flex-direction: column;
    min-height: 400px;
    position: relative;

    > h2 {
      margin-bottom: 0px;
    }

    > small {
      margin-bottom: 25px;
    }

    > .menu {
      color: white;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.85);
    }

    > div {
      height: 200px;
      background-size: cover;
      background-position: center center;
    }
  }
`;

const Restaurant = ({name, image, description, tags, firstCourse, secondCourse, thirdCourse}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="restaurant-item" key={name} onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{backgroundImage: `url(${image})`}} />
      <h2>{name}</h2>
      <small>{tags.join(', ')}</small>
      <span>{description}</span>
      {hovered ? <div className="menu">
        {firstCourse.map(course => <div className="course-item">{course}</div>)}
      </div> : null}
    </div>
  )
}

const Grid = () => {
  return (
    <div id="grid" css={gridStyles}>
      {data.restaurants.map(restaurant => (
        <Restaurant key={restaurant.name} {...restaurant} />
      ))}
    </div>
  )
}

const App = () => (
  <div className="App" css={style}>
    <Grid />
    {/* <h1>Hi there!!!</h1> */}
  </div>
);

console.log(data);

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
