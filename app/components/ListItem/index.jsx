import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

function ListItem({ item, onClick }) {
    let formatTime = '';
    if(item.time) {
        formatTime = new Date(item.time).toISOString().match(/(\d{4}-\d{2}-\d{2})/)[0];
    }
    return (
        <a
            href="#"
            className="list-group-item item-component" 
            onClick={onClick}
        >
          <span className="badge">
            {formatTime}
          </span>
          <span className="item-title">{item.title}</span>
        </a>
     );
}

ListItem.propTypes = propTypes;

export default ListItem;