import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function Items({items, currentFocus, addTag}) {
    return (
            <div className='autocomplete-items' >
                {
                    items.map((item, key) =>
                        <div
                            key={key}
                            className={`item-row item-row${currentFocus === key+1 ? '-active' : ''}`}
                            onClick={() => addTag(item)}>
                            <img className='item-image' src={item.avatar_url} alt='img'/>
                            <span className='item-row-content'>{item.name}</span>
                            <span className='item-row-content'>{item.username}</span>
                        </div>
                    )
                }
            </div>
    );
}

Items.propTypes = {
    items: PropTypes.array,
    currentFocus: PropTypes.number,
    addTag: PropTypes.func
};

Items.defaultProps = {
    items: [],
    currentFocus: 0
};

export default Items;