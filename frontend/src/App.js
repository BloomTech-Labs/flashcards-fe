import React, { useState, useRef } from 'react';
import { useOnClickOutside } from './hooks/hooks';
import firebase from 'firebase';
//import dashNav from './components/dashNav';
import Burger from './components/Burger';
import Menu from './components/menu/menu';
import { theme } from './components/theme';
import { Route } from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import { ThemeProvider } from 'styled-components';
import Login from './components/login/login.js';
import Dashboard from './components/dashboard/dashboard';
import Settings from './components/profileSettings/profileSettings';
import DashNav from './components/dashNav/dashNav';

//components
import DeckList from './components/decks/DeckList';
import Cards from './components/cards/Cards';
import Marketing from './components/marketing/Marketing';
import DeckForm from './components/decks/DeckForm';
import Privacy from './components/Privacy/privacy';
import DeckConfirmation from './components/confirmation/DeckConfirmation';
import ArchiveDecks from './components/archiveDecks/ArchiveDecks';
import ArchivedDeckView from './components/archivedDeckView/archivedDeckView';
import EditCard from './components/cards/EditCard';
import NewCard from './components/cards/NewCard';
import DeckImport from './components/decks/DeckImport';

let firebaseApiKey;
let firebaseAuthDomain;
let firebaseMeasurementId;
let firebaseProjectId;
let firebaseAppId;

// if (process.env.NODE_ENV !== 'production') {
firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
firebaseAuthDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
firebaseMeasurementId = process.env.REACT_APP_MEASUREMENT_ID;
firebaseProjectId = process.env.REACT_APP_PROJECT_ID;
firebaseAppId = process.env.REACT_APP_APP_ID;
// } else {
//   firebaseApiKey = process.env.FIREBASE_API_KEY;
//   firebaseAuthDomain = process.env.FIREBASE_AUTH_DOMAIN;
//   firebaseMeasurementId = process.env.FIREBASE_MEASUREMENT_ID;
//   firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
//   firebaseAppId = process.env.FIREBASE_APP_ID;
// }

const config = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  measurementId: firebaseMeasurementId,
  projectId: firebaseProjectId,
  appId: firebaseAppId
};
firebase.initializeApp(config);
firebase.analytics();

function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = 'main-menu';

  useOnClickOutside(node, () => setOpen(false));

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(res => {
        setOpen(false);
      });
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <div ref={node}>
          <FocusLock disabled={!open}>
            <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
            <Menu
              open={open}
              setOpen={setOpen}
              id={menuId}
              logout={logout}
              closeMenu={closeMenu}
            />
          </FocusLock>
          {/* //Links here */}
          <Route path="/" render={props => {
            return <DashNav {...props}/>
          }}/>
          <Route exact path='/' component={Marketing} />
          <Route exact path='/decklist' component={DeckList} />
          <Route
            exact
            path='/editcard/:deckName'
            render={props => <EditCard {...props} />}
          />
          <Route
            path='/:user/:deckName/cards'
            render={props => <Cards {...props} />}
          />
          <Route path='/login' render={props => <Login {...props} />} />
          <Route
            exact
            path='/dashboard'
            render={props => <Dashboard {...props} />}
          />
          <Route path='/preferences' component={Settings} />
          <Route
            path='/create-deck'
            render={props => <DeckForm {...props} />}
          />
          <Route
            path='/import-deck'
            render={props => <DeckImport {...props} />}
          />
          <Route path='/privacy' component={Privacy} />
          <Route
            path='/confirmation/:type/:colId/:action'
            render={props => <DeckConfirmation {...props} />}
          />
          <Route
            exact
            path='/archived-decks'
            render={props => <ArchiveDecks {...props} />}
          />
          <Route
            path='/archived-decks/:colId'
            render={props => <ArchivedDeckView {...props}/>}  />
          <Route path = '/editcard/:deckName/cards' render ={props => <EditCard {...props}/>} />
          <Route path = '/editcard/:deckName/newcards' render = {props => <NewCard {...props}/>} />
          {/* //Switch Here */}
        </div>
      </>
    </ThemeProvider>
  );
}
export default App;
