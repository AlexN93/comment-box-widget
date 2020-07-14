import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContentEditable from "react-contenteditable";
import './styles.css';
import Items from './Items'

function TagsAutocomplete({suggestions}) {
    const [inputValue, setInputValue] = useState("");
    const [tagId, setTagId] = useState(0);
    // const [tags, setTags] = useState({});
    const valRef = useRef(inputValue);
    const [dropDownItems, setDropDownItems] = useState([]);
    const [currentFocus, setCurrentFocus] = useState(0);
    useEffect( () => {
        window.addEventListener('keydown', keyDown);

        return () => {
            window.removeEventListener('keydown', keyDown);
        }
    }, [currentFocus, dropDownItems, inputValue]);

    const onChange = ({target: {value}}) => {
        setInputValue(value);
        setCurrentFocus(0);
        valRef.current = value;

        if (!value || !value.includes("@")) {
            setDropDownItems([]);
            return;
        }
        value = value.substring(value.lastIndexOf('@') + 1);
        // const strippedValue = value.substring(0, value.indexOf('<div class="tooltip"'));
        // displayDropDown(strippedValue ? strippedValue : value);
        displayDropDown(value);
    };

    const keyDown = (event) => {
        const {keyCode} = event;
        if (!dropDownItems.length) return;
        if (keyCode === 40) {
            setCurrentFocus(currentFocus+1);
            setActive(currentFocus+1);
        } else if (keyCode === 38) {
            setCurrentFocus(currentFocus-1);
            setActive(currentFocus-1);
        } else if (keyCode === 13) {
            event.preventDefault();
            if (currentFocus > 0) {
                addTag(dropDownItems[currentFocus-1]);
            }
        }
    };

    const displayDropDown = (value) => {
        const displayedItems = [];
        for (const suggestion of suggestions) {
            if (suggestion.name.substr(0, value.length).toUpperCase() === value.toUpperCase()) {
                suggestion.suggestionLength = value.length + 1;
                displayedItems.push(suggestion);
            }
        }
        setDropDownItems(displayedItems);
    };

    const setActive = (i) => {
        if (i > dropDownItems.length) setCurrentFocus(1);
        if (i <= 0) setCurrentFocus(dropDownItems.length);
    };

    const addTag = ({username, avatar_url, name, suggestionLength}) => {
        if (suggestionLength) {
            setInputValue(inputValue.slice(0, -suggestionLength) + getTag(username, avatar_url, name));
            // setInputValue(validateTags() + getTag(username, avatar_url, name));
        } else {
            setInputValue(getTag(username, avatar_url, name));
        }
        // setTags({...tags, [tagId]: name});
        setTagId(tagId+1);
        setDropDownItems([]);
    };

    // const validateTags = () => {
    //     const el = document.createElement('html');
    //     el.innerHTML = inputValue;
    //     for (let item of el.getElementsByTagName('a')) {
    //         const tagId = item.id.replace('tag-', '');
    //         const name = tags[tagId];
    //         console.log(el.querySelector('body').innerHTML);
    //         const strippedItem = item.removeChild(item.childNodes[0]);
    //         console.log(strippedItem);
    //         // if (!strippedItem.textContent.includes(name)) {
    //         //     console.log(tagId, strippedItem.textContent, name);
    //         //     el.querySelector(`#tag-${tagId}`).remove();
    //         // }
    //     }
    //     console.log(el.querySelector('body').innerHTML);
    //     return el.querySelector('body').innerHTML;
    // };

    const getTag = (username, avatar_url, name) => {
        return `<a id='tag-${tagId}' class='tag' href='#'>@${name}&#160;<div class='tooltip' contenteditable='false'><div class='tail'></div>`
            + `<img class='tooltip-image' src='${avatar_url}'/><span class='tooltip-text'>&#160;${name}</span>`
            + `<span class='tooltip-text'>&#160;${username}</span></div></a>`;
    };

    return (
        <div className='tags-autocomplete'>
            <ContentEditable
                className='input-field'
                html={inputValue}
                onKeyDown={keyDown}
                onChange={React.useCallback(onChange)}
            />
            { dropDownItems.length ? <Items items={dropDownItems} currentFocus={currentFocus} addTag={addTag}/> : null }
        </div>
    );
}

TagsAutocomplete.propTypes = {
    suggestions: PropTypes.array
};

TagsAutocomplete.defaultProps = {
    suggestions: []
};

export default TagsAutocomplete;