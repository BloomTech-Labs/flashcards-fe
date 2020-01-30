import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

import './profileSettings.scss';
import poly from '../../assets/poly.png'

const OrangeRadio = withStyles({
  root: {
    color: orange[600],
    '&$checked': {
      color: orange[600]
    }
  },
  checked: {},
})(props => <Radio color="default" label="MobileOrDesktop" {...props} />);

const OrangeInput = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'rgba(106, 92, 85, 0.5)'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgba(106, 92, 85, 0.5)'
    }
  }
})(TextField);


const Settings = props => {
  const [preferences, setPreferences] = useState({});
  let history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        let user = firebase.auth().currentUser.uid;
        axios.get(`https://flashcards-be.herokuapp.com/api/users/${user}`)
          .then(res => {
            setPreferences(res.data.data)
          })
          .catch(err => {
            console.log('get user err', err)
          })
      } else {
        return null
      }
    });  
  }, []);

  const nonCheckChange = e => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value
    });
  };

  const radioChange = e => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = e => {
    e.preventDefault();
    axios.put(`https://flashcards-be.herokuapp.com/api/users/${firebase.auth().currentUser.uid}`, {changes: preferences})
      .then(res => {
        props.history.push('/dashboard')
      })
      .catch(err => {
        console.log('put err', err)
      })
  };

  return (
    <>
      <div className='settings-header-container'>
        <div className='header-back-selectors-container'>
          <div className='back-button'>
            <img
              className='back-arrow'
              src={poly}
              alt='back-arrow'
              onClick={() => history.goBack()}
            />
            <h2 className='preferences-back' onClick={() => history.goBack()}>Preferences</h2>
          </div>
          <div className='selector-container'>
            <span className='selector-text'>Demo deck</span>
            <span className='selector-text'>Log Out</span>
          </div>
        </div>
          
        <div className='name-pic-container'>
          {firebase.auth().currentUser ? 
          <>
            <h2 className='users-name'>{firebase.auth().currentUser.displayName}</h2>
            <img src={firebase.auth().currentUser.photoURL} alt='profile pic' className='profile-pic' /> 
          </>
          : null}
        </div>
      </div>

      <form className='profile-form'>
        <h2 className='pref-h2'>User Preferences</h2>
        <p>Which subjects do you use flashcards for most often?</p>
        <OrangeInput
          // className='subject-input'
          label={'Subjects'}
          type='text'
          name='favSubjects'
          helperText="List subjects you most frequently study"
          value={preferences.favSubjects}
          onChange={nonCheckChange}
        />
        
        <p>How frequently do you want to study?</p>
        <select name='studyFrequency' onChange={nonCheckChange} className='subject-input'>
          <option hidden='' value={preferences.studyFrequency}>{!preferences.studyFrequency ? 'Please select one' : preferences.studyFrequency}</option>
          <option value='Once a day'>Once a day</option>
          <option value='Twice a Day'>Twice a day</option>
          <option value='Once a week'>Once a week</option>
          <option value='Twice a week'>Twice a week</option>
          <option value='Three times a week'>Three times a week</option>
          <option value='Everyday'>Everyday</option>
          <option value='Other'>Other</option>
        </select>
        <p>Do you prefer studying on a mobile or desktop device?</p>
        <RadioGroup className='radio-container' name='MobileOrDesktop'>
          <div>
            <OrangeRadio
              id='mobileId'
              type='radio'
              label='Mobile'
              name='MobileOrDesktop'
              value='Mobile'
              onChange={radioChange}
              checked={preferences.MobileOrDesktop === 'Mobile' ? true : false}
            /><label for='mobileId'>Mobile</label>
            
          </div>
          <div>
            <OrangeRadio
              id='deskId'
              type='radio'
              name='MobileOrDesktop'
              value='Desktop'
              onChange={radioChange}
              checked={preferences.MobileOrDesktop === 'Desktop' ? true : false}
            />
            <label for='deskId'>Desktop</label>
          </div>
        </RadioGroup>
       
        <p>Do you prefer to study by</p>
        <select name='technique' onChange={nonCheckChange} className='subject-input'>
          <option hidden='' value={preferences.technique}>{!preferences.technique ? 'Please select one' : preferences.technique}</option>
          <option value='Listening'>Listening</option>
          <option value='Doing'>Doing</option>
          <option value='Reading'>Reading</option>
          <option value='Writing'>Writing</option>
          <option value='Other'>Other</option>
        </select>

        

        <p>How often would you like to recieve notifications?</p>
        <select name='notificationFrequency' onChange={nonCheckChange} className='subject-input'>
          <option hidden='' value={preferences.notificationFrequency}>{!preferences.notificationFrequency ? 'Please select one' : preferences.notificationFrequency}</option>
          <option value="When I haven't met my goal in a day">
            When I haven't met my goal in a day
          </option>
          <option value="When I haven't met my goal in a week">
            When I haven't met my goal in a week
          </option>
          <option value='Everyday'>Everyday</option>
          <option value="Don't send me notifications">
            Don't send me notifications
          </option>
        </select>

        <p>Do you prefer to study from decks that are</p>
        <RadioGroup className='radio-container' name='customOrPremade'>
          <div>
            <OrangeRadio
            id='preId'
            type='radio'
            name='customOrPremade'
            value='pre-made'
            onChange={radioChange}
            checked={preferences.customOrPremade === "pre-made" ? true : false}
            />
            <label for='preId'>Pre-made</label>
          </div>
        
          <div>
            <OrangeRadio
              id='customId'
              type='radio'
              name='customOrPremade'
              value='custom'
              onChange={radioChange}
              checked={preferences.customOrPremade === 'custom' ? true : false}
            />
            <label for='customId'>Custom</label >
          </div>
        
        </RadioGroup>
        <div className='button-container'>
          <button onClick={submitForm} className='bottom-button'>Save</button>
        </div>
      </form>
    </>
  );
};

export default Settings;
