/* eslint-disable no-multiple-empty-lines  */

import React from 'react';
import PropTypes from 'prop-types';
import Parse from 'parse';
import { DataBrowser as Data } from '@owsas/geopromos-private-api/out/DataBrowser';

import { Card } from '@owsas/geopromos-web-css';
import RenderObjectsUtils from './RenderObjectsUtils';


// Renders a card in an intelligent way,
// looking for the className of the Parse.Object
// to show, and displaying the right information
const IntelligentCard = (props) => {
  const params = RenderObjectsUtils.getInfoForObject(props.obj);
  const date = params.date && Data.getDateSinceString(params.date);

  return (
    <div style={{ display: 'block', textDecoration: 'none' }} onClick={props.onClick}>
      <Card img={params.img}>
        {/* The title of the card */}
        {params.title && <p className={`${props.ellipsis && 'ellipsis'} cardTitle`}><b>{params.title}</b></p>}

        {/* If extended, show the author */}
        {props.extended && params.author && <p className="cardAuthor">{params.author}</p>}

        {/* The price is always shown */}
        {params.price &&
        <p style={{ color: 'green' }} className="cardPrice"><b>{params.price}</b></p>
          }

        {/* The price is always shown */}
        {date && <p className="date cardDate"> <i className="fa fa-clock-o" /> {date}</p>}
      </Card>
    </div>
  );
};


// eslint-disable-next-line
IntelligentCard.defaultProps = {
  ellipsis: false,
  extended: false,
  onClick: undefined,
};

IntelligentCard.propTypes = {
  obj: PropTypes.instanceOf(Parse.Object).isRequired,
  ellipsis: PropTypes.bool,
  extended: PropTypes.bool, // shows more information
  onClick: PropTypes.func,
};

export default IntelligentCard;
