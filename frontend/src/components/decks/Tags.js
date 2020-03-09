import React from 'react';

const Tags = props => {
  //TAGS
console.log(props.tags)
  return (
    <div className='tags-input'>
      <ul id='tags'>
        {props.tags.map((tag, index) => (
          <li key={index} className='tag'>
            <span className='tag-title'>{tag}</span>
            <span
              className='tag-close-icon'
              onClick={() => props.removeTags(index)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
      <input
        className='tagss'
        type='text'
        placeholder={props.tags < 1 ? 'Kinitec Molecular Theory, Acid Naming, etc.' : null}
        onKeyUp={event => (event.key === 'Enter' ? props.addTags(event) : null)}
      />
    </div>
  );
};

export default Tags;