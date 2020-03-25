import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from './Card';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { getCards } from '../../actions';
import poly from '../../assets/poly.png';
// import smiley from '../../assets/smiley.png';
import ModuleMetric from './MetricModule'
import { useHistory } from 'react-router-dom';
import './Cards.scss';

const Cards = props => {
  const [showModule, setShowModule] = useState(false)
  const [currentCard, setCurrentCard] = useState(0);
  const [deck, setDeck] = useState([]);
  const [sessionData, setSessionData] = useState({
    // studyDate: new Date().toDateString(),
    cardsCorrect: 0,
    cardsIncorrect: 0,
    cardsStudied: 0
  });
  const [cardStatus, setCardStatus] = useState("false");

  useEffect(() => {
    props.getCards(props.match.params.deckName, props.match.params.user);
  }, []);

  useEffect(() => {
    if (props.deckcards) {
      let filteredCards = props.deckcards.filter(card => !card.data.archived);

      setDeck(filteredCards);
    }
  }, [props.deckcards]);

  let history = useHistory();

  const counter = val => {
    console.log(val);
    setSessionData({
      ...sessionData,
      [val]: sessionData[val] + 1
    });
  };

  const submitSession = () => {
    let id = props.match.params.user
    console.log("ID", id)
    axios.get(`https://flashcards-be.herokuapp.com/api/metrics/${id}/1`)
    .then(res => {
      console.log("RESPONSE",res)
      if(res.data.length === 0) {
        axios.post(`https://flashcards-be.herokuapp.com/api/metrics/${id}`, sessionData)
        .then(res => console.log("POST RESPONSE", res))
        .catch(err => console.log(err))
      } else {
        axios.put(`https://flashcards-be.herokuapp.com/api/metrics/${id}`, sessionData)
        .then(res => console.log("PUT RESPONSE", res))
        .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
  }



 const finish = () => {
   if(sessionData.cardsCorrect == 0 && sessionData.cardsIncorrect == 0){
     return null
   } else {
     submitSession()
    setShowModule(true)
   }
   
 }

  const goNext = () => {
    let index = currentCard;
    if (currentCard >= deck.length - 1) {
      console.log('test')
      setCurrentCard(0);
     } if(currentCard == deck.length - 1){
        setShowModule(!showModule)
    } else {
      console.log('in the else')
      setCurrentCard(index + 1);
    }
 console.log('session', sessionData)
    if(cardStatus) {
      setSessionData({
        ...sessionData,
        cardsCorrect: sessionData.cardsCorrect + 1
      })
      setCardStatus("");
    } else {
      console.log('else')
      setSessionData({
        ...sessionData,
        cardsIncorrect: sessionData.cardsIncorrect + 1
      })
      setCardStatus("");
      console.log('session', sessionData);
   };
  }
  const goPrev = () => {
    let index = currentCard;
    if (currentCard <= 0) {
      setCurrentCard(deck.length - 1);
    } else {
      setCurrentCard(index - 1);
    }
  };

  if (!props.deckcards) {
    return (
      <div className="loading-background">
        <h1 className="deckName-study">{props.match.params.deckName}</h1>
        <div className="loader">
          <Loader type="ThreeDots" color="#F66E00" height={80} width={80} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="loading-background-study">
          <div className="back-button-and-header-study">
            <img
              className="back"
              src={poly}
              alt="back-arrow"
              onClick={() => history.goBack()}
            />
            <h1 className="deckNames-study" onClick={() => history.goBack()}>
              {props.match.params.deckName}
            </h1>
          </div>

          <div className="studied-cards-container">
            <div className="studied-numbers">
              <span>
                <h4 className="listCards">{deck.length}</h4>
                <p className="listCards">Cards</p>
              </span>
              <span>
                <h4 className="listCards">{sessionData.cardsCorrect}</h4>
                <p className="listCards">Correct</p>
              </span>
              <span>
                <h4 className="listCards">{sessionData.cardsIncorrect}</h4>
                <p className="listCards">Incorrect</p>
              </span>
              {/* <img className="smile" src={smiley} alt={'a smiling emoji'} /> */}
            </div>
            {/* <div className = "rightside"> */}
          </div>

          {/* </div> */}
        </div>

        {/* <div className="sessionStats">
          <span>Total: {deck.length}</span>
          <span>Cards Studied: {sessionData.cardsStudied}</span>
          <span>Correct: {sessionData.cardsCorrect}</span>
          <span>Incorrect: {sessionData.cardsIncorrect}</span>
        </div> */}

        <div>
          {props.error && <p>{props.error}</p>}

          <Card
            key={deck.id}
            card={deck[currentCard]}
            goNext={goNext}
            goPrev={goPrev}
            counter={counter}
            setCardStatus={setCardStatus}
            cardStatus={cardStatus}
            finish={finish}
          />
        </div>
        {showModule ? <ModuleMetric deck={deck} sessionData={sessionData}/>: null}
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    deckcards: state.deckcards,
    isFetching: state.isFetching,
    error: state.error
  };
};

export default connect(mapStateToProps, { getCards })(Cards);
