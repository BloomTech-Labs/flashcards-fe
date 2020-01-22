import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';

import { getDecks } from '../../actions';

function DeckConfirmation(props) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    let currentUserId = firebase.auth().currentUser.uid;
    setCurrentUser(currentUserId);
  }, []);
  const dispatch = useDispatch();

  const { action, colId } = props.match.params;

  const archiveDeck = async () => {
    axios
      .post(`http://localhost:5000/api/deck/archive/${currentUser}/${colId}/`)
      .then(res => {
        setTimeout(function() {
          dispatch({ type: 'ARCHIVE_SUCCESSFUL' });
          props.history.push('/dashboard');
        }, 1000);
      })
      .catch(err => {
        console.log('archive deck err', err);
      });
  };

  return (
    <div>
      <p>Sure you want to {action} this deck?</p>
      <button onClick={archiveDeck}>{action}</button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    decks: state.decks,
    isFetching: state.isFetching,
    error: state.error
  };
};

export default connect(mapStateToProps, { getDecks })(DeckConfirmation);