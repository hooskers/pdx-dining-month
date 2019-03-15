/** @jsx jsx */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { jsx, css } from '@emotion/core';

import data from './src/data/restaurantData.json';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const cardMediaStyles = css`
  height: 200px;
  background-size: cover;
  background-position: center center;
`;

const cardContentStyles = css`
  padding: 0px !important;
`;

const tabContainerStyles = css`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const TabContainer = ({ children }) => (
  <div css={tabContainerStyles}>{children}</div>
);

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

const Restaurant = ({
  name,
  image,
  description,
  tags,
  firstCourse,
  secondCourse,
  thirdCourse,
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, value) => {
    setTabIndex(value);
  };

  return (
    <Card>
      <CardHeader title={name} />
      <CardMedia image={image} css={cardMediaStyles} />
      <CardContent css={cardContentStyles}>
        <AppBar position="static">
          <Tabs value={tabIndex} onChange={handleChange} scrollButtons="on">
            <Tab label="Description" />
            <Tab label="Menu" />
          </Tabs>
        </AppBar>
        {tabIndex === 0 && <TabContainer>{description}</TabContainer>}
        {tabIndex === 1 && (
          <div>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                First Course
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>{firstCourse}</ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                Second Course
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>{secondCourse}</ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                Third Course
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>{thirdCourse}</ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Grid = () => {
  return (
    <div id="grid" css={gridStyles}>
      {data.restaurants.map(restaurant => (
        <Restaurant key={restaurant.name} {...restaurant} />
      ))}
    </div>
  );
};

const App = () => (
  <div className="App" css={style}>
    <Grid />
  </div>
);

console.log(data);

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
