import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Progress } from 'semantic-ui-react'
import { getCards, getDecks } from '../../actions';
import 'semantic-ui-css/semantic.min.css'
import cardPlaceholder from './cardPlaceholder.png';
import './DeckList.scss';
import axios from 'axios';

const Deck = (props) => {
    const [exampleCard, setExampleCard] = useState(null);
    const [deckLength, setDeckLength] = useState(0);

  useEffect(() => {
    // props.getDecks();
    axios
      .get(
        `https://flashcards-be.herokuapp.com/api/demo/I2r2gejFYwCQfqafWlVy/${props.deckName}`
      )
      .then(res => {
        console.log(res.data.data[0].data.front);
        setExampleCard(res.data.data[0].data.front);
        setDeckLength(res.data.data.length);

      });
    
      
  }, []);

    return(
        <div className = "container">             
         <Link to = {`/editcard/${props.deck}/cards`} >Edit</Link>

            <div className = "deckin">          
                
                <div className = "topSection">   
                    <div className = "deckText">   
                        <Link to = {`/cards/${props.deck}/cards`} >
                        <TopCard>
                            <Words>{props.deck}  </Words>
                            <p className = "cardNum">{deckLength} cards</p>
                            
                        </TopCard>
                        </Link>
                        {/* <p className = "cardNum">{props.cards.length} cards</p> */}
                        
                    </div>
                    <div className = "cardplaceholder"> {exampleCard} </div>
                </div>
                <div className='masteryBar'>
                    <h4>Mastery</h4>
                    <Progress percent={5} size='tiny' color='orange' text-align='left'>
                        <p>3 Cards</p>
                    </Progress>
                </div>
            </div>
        </div>


    )
};

export default Deck;

const TopCard = styled.div`
    box-sizing: border-box;
    border-radius: 4px;
    text-align: center;
    margin-bottom: 35%;
    color: black;
`

const Words = styled.h3`
    text-decoration: none;
    // text-align: left;
    margin-bottom: 4%;

`
