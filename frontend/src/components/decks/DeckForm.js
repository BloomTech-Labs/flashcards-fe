import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { postDecks } from '../../actions';
import './DeckForm.scss';
import TextField from '@material-ui/core/TextField';
import Tags from './Tags';
import poly from '../../assets/poly.png';
import polyy from '../../assets/polyy.png';
import { withStyles } from '@material-ui/core/styles';
import notebook from '../../assets/notebook.png';
import graduate from '../../assets/graduate.png';
import audio from '../../assets/audio.png';
import Footer from '../footer/Footer';


const OrangeInput = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'rgba(106, 92, 85, 0.5)',

    },
    '@media (min-width: 1000px)' : {
      width: '50%',
      fontSize:'12rem'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgba(106, 92, 85, 0.5)',

    },
    
  }
})(TextField);

const DeckForm = props => {
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('');
  const [tags, setTags] = useState([]);
  const [newDecks, setNewDecks] = useState([{ front: '', back: '' }]);
  // const [currentCard, setCurrentCard] = useState(0)

  const handleChanges = (index, event) => {
    const values = [...newDecks];

    if (event.target.name === 'front') {
      values[index].front = event.target.value;
    } else {
      values[index].back = event.target.value;
    }

    setNewDecks(values);
  };

  const handleName = e => {
    let name = e.target.name;

    setNewName({
      ...newName,
      [name]: e.target.value
    });
    
  };

  const handleIcon = e => {
    let name = e.target.name;
    setNewIcon(e.target.value);
  };

  const handleAdd = () => {
    const values = [...newDecks];
    values.unshift({ front: '', back: '' });
    setNewDecks(values);
  };

  const handleRemove = index => {
    const values = [...newDecks];
    values.splice(index, 1);
    setNewDecks(values);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // only returns filled cards
    const subDeck = newDecks.filter(card => {
      return card.front && card.back;
    });
    if (!newName.deckName) {
      // insures deckname is filled
      alert('Please add a Deck Name');
    } else {
      props.postDecks(subDeck, newName, tags, newIcon);
      // gives time for firestore to update so that deck shows up in dashboard
      setTimeout(() => {
        props.history.push(`/dashboard`);
      }, 400);
    }
  };

  const addTags = event => {
    event.preventDefault();
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      // selectedTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };

  const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };

  // const selectedTags  =  {tags}

  return (
    
    <div>
{/*       
           <section className='study-data'> */}
        {/* <div className='timeline-selectorss'>
          <span>Today</span>
          <span>This Week</span>
          <span>Lifetime</span>
        </div> */}
        {/* <div className = "study">
        <h3 className='decks'>{newDecks.length}</h3>
        <h4 className='cardWord'>Cards</h4>
        </div> */}

      {/* </section> */}
      <div className='loading-background'>
        <div className = "first">
        <img
          className='backk'
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAaCAYAAACD+r1hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACZSURBVHgBnZTtDUAwFEXLBB3BCEawERuwgRVsYAQjGMEIRrhepZKSftznJPL+nJPGI60MCQDrZkXKjYyNcW9ZngMeJtgRUJJnfMjJIyKk5B4JYnKLDCaykZMK8FlfNpBpGTkMVpA4eYCCWg6wRouEC3tC+NI7HajX+uvDBVGnCnw0qAIfTaogtW5TQpxNG7x+TPU1QwXPSW5eQ3iFPuLAcgAAAAAASUVORK5CYII="
          alt='back arrow'
          onClick={() => props.history.goBack()}
        />
        <img
          className='back'
          src={poly}
          alt='back arrow'
          onClick={() => props.history.goBack()}
        />

        <h1 className='deckName-add'>Create New Deck</h1>
        </div>
        {/* <div className = "rightside"> */}
        <div className='number'>
          <h3 className='smile-form'>{newDecks.length}</h3>
          <h4 className='mastered'>Cards</h4>
        </div>
        <div className='studied'>
{/*           

            <h1 className='numberrr'>87</h1>
          
          <div className='text'>
            <h1 className = "mastereddd">87</h1>
            <span className='mastered-text'>Mastered</span>
          </div> 
        </div> */}
        </div>
      </div>
     
      <div>
        <div className='page'>
          <div className='form'>
            <form className='cardForm'>
              <p className='deckInfo'>Deck Info</p>
              <div className='deck-input-wrapper'>
              <div className='inputHolders'>
                <OrangeInput
                  label='Deck Name'
                  type='text'
                  onChange={handleName}
                  name='deckName'
                  variant='outlined'
                  className='deck-name-input'
                  // placeholder = "Deck Name"
                />

                <div className='iconHolder'>
                  <OrangeInput
                    label='Icon'
                    className='iconField'
                    type='text'
                    onChange={handleIcon}
                    name='icon'
                    variant='outlined'
                  />
                  <button className='create-edit' type='button'>Edit Icon</button>
                </div>
              </div>

              <div className='tagHolder'>
                <Tags tags={tags} addTags={addTags} removeTags={removeTags} />
              </div>
              </div>
              <div className='radio-wrapper'>
                <label><input type='radio' id='public' name='public-toggle' value='public'/>Public</label>
                <label><input type='radio' id='private' name='public-toggle' value='private'/>Private</label>
              </div>

              <h3 className='flashcards'>Flashcards</h3>

              <div className='new'>New card</div>
              <div className='top'>
                {newDecks.forEach((newDeck, index) => (
                  <Fragment key={`${newDeck}~${index}`}>
                    <div className='topCard'>
                      <label htmlFor='front' className='frontLabel'>
                        Front
                      </label>
                      <textarea
                        className='frontCard'
                        type='text'
                        onChange={event => handleChanges(index, event)}
                        name='front'
                        placeholder='Term'
                        value={newDeck.front}
                        multiline={true}
                      />

                      <div className='backHolder'>
                        <label htmlFor='back' className='backLabel'>
                          Back
                        </label>
                        <textarea
                          className='backCard'
                          type='text'
                          onChange={event => handleChanges(index, event)}
                          name='back'
                          value={newDeck.back}
                          placeholder='Definition'
                        />
                      </div>

                      <button type='button' onClick={() => handleRemove(index)}>
                        X
                      </button>
                    </div>

                    {/* <button
                type = "button"
                onClick = {() => handleAdd()}>
                    Add Card
                </button> */}
                  </Fragment>
                ))}
              </div>
            </form>
          </div>

          <form onSubmit={handleSubmit} className='cardFormBottom'>
            {newDecks.map((newDeck, index) => (
              <Fragment key={`${newDeck}~${index}`}>
                <div className='card'>
                  <div className='removeHolder'>
                    <button
                      type='button'
                      className='remove'
                      onClick={() => handleRemove(index)}
                    >
                      X
                    </button>
                  </div>

                  <label htmlFor='front' className='frontLabel'>
                    Front
                  </label>
                  <textarea
                    className='frontCard'
                    type='text'
                    onChange={event => handleChanges(index, event)}
                    name='front'
                    // placeholder = "Term"
                    value={newDeck.front}
                  />

                  <div className='backHolder'>
                    <label htmlFor='back' className='backLabel'>
                      Back
                    </label>
                    <textarea
                      className='backCard'
                      type='text'
                      onChange={event => handleChanges(index, event)}
                      name='back'
                      value={newDeck.back}
                      // placeholder = "Definition"
                    />
                  </div>
                </div>
                {index === 0 ? (
                  <div className='buttonHolders'>
                    <button
                      type='button'
                      className='add'
                      onClick={() => handleAdd()}
                    >
                      Add card
                    </button>

                    <button
                      className='save'
                      // onSubmit = {handleSubmit}
                      // onClick = {() => props.history.push(`/decklist`)}
                      onClick={handleSubmit}
                    >
                      Save deck
                    </button>
                    <div className='created'>Cards in decks</div>
                  </div>
                ) : null}
                {/* <button
                            type = "button"
                            onClick = {() => handleAdd()}>
                                Add Card
                            </button> */}
              </Fragment>
            ))}
          </form>
        </div>
      </div>
      <Footer />
      {/* <div className = "studystuff">
        <div className = "studywords">
          <h3 className ="bigStudy">Study Tips</h3>
          <h4 className = "other">and other bits</h4>
        </div>
        <div className = "note">
          <img className = "notebook" src = {notebook} alt = {'a notebook'} />
          <p className = "notewords">What exactly is spaced-repition and how it can help you</p>
        </div>
        <div className = 'grad'>
          <img className = "gradpic" src = {graduate} alt = {'a graduate world'} />
          <p className = "gradwords">Harvard University is taking a new approach to learning using mNeme</p>
        </div>
        <div className = "aud">
          <img className = "audpic" src = {audio} alt = {'a person listening to audio'} />
          <p className = "audwords">Discover what mNeme has in store for the future</p>
        </div>
      </div> */}
    </div>
  );
};

export default connect(null, { postDecks })(DeckForm);
