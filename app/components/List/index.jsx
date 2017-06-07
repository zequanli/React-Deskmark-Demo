import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem';

const propTypes = {
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};

function List({ items, onSelect }) {
    let itemList = items.map(
        item => (
            <ListItem 
              item={item} 
              key={item.id} 
              onClick={() => onSelect(item.id)}
            />
        )
    );

    return (
        <div className="list-component list-group">
            {itemList}
        </div>
    );
}

List.propTypes = propTypes;

export default List;