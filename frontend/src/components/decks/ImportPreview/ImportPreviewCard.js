import React, { useState, useEffect } from 'react';
import {
    Divider,
    Segment,
    Header,
    Checkbox,
    Input,
    TextArea, 
  } from 'semantic-ui-react';


import '../../cards/Cards.scss'  
import  './ImportPreviewCard.scss'

const ImportPreviewCard = props => {




    // console.log('index', props.index)
    const [cardEditing, setCardEditing] = useState(props.card);
    const handleChanges = e => {
        const values = { ...cardEditing }
        if (e.target.name === `front${props.index}`) {
            values.front = e.target.value;
        } else {
            values.back = e.target.value;
        }
        setCardEditing(values);
    }

    const updateCard = (updateIndex) => {

        const updated = props.deck.filter((card, index) => {
            return index !== updateIndex;
        })
        const newCard = cardEditing;
        props.setDeck([...updated, newCard])
        console.log(props.index);
        console.log(props.deck);
    };


    return (
        
        
        <div className='container' id={props.id}>
          <div className='cardList'>
            <div className='cardData '>
              <Segment className='segments'>
                <div className='cardTop'>
                  <Header as='h5' className='headers'>
                   Front
                  </Header>
                </div>

                {/* <form onSubmit={this.handleSubmit}> */}
                <form onSubmit={(e) => { e.preventDefault(); updateCard(props.index) }}>
                <TextArea
                  rows={2}
                  style={{ resize: 'none' }}
                  // transparent size="massive"
                  className='defination'
                  type='text'
                  name={`front${props.index}`}
                  placeholder='Front'
                  onChange={handleChanges}
                  value={cardEditing.front}
                />

                <Divider clearing />
                <Header as='h5' style={{ marginTop: -2 }} className='headers'>
                  Back
                </Header>

                <TextArea
                  rows={2}
                  style={{ resize: 'none' }}
                  // transparent size="massive"
                  className='defination'
                  type='text'
                  name={`back${props.index}`}
                  placeholder='Back'
                  onChange={handleChanges}
                  value={cardEditing.back}
                />
                
                <div className="card-btns">
                <button className='quo-btn' type='button' onClick={() => props.deleteCard(props.id)}>
                  Delete
                </button>
                <button className='quo-btn' type='submit'>
                  Update
                </button>
                </div>
            </form>
                {/* </form> */}
              </Segment>
            </div>
          </div>
          {/* <div className = "button">
	//                <button className = "submit" onClick = {this.handlesubmit}>submit</button>
	//              </div> */}
        </div>
        
        // <form onSubmit={(e) => { e.preventDefault(); updateCard(props.index) }}>
        //     <input type="checkbox" id={props.id} onChange={() => props.checking(props.id)}/>
        //     <textarea
        //         onChange={handleChanges}
        //         name={`front${props.index}`}
        //         value={cardEditing.front}
        //     />
        //     <textarea
        //         onChange={handleChanges}
        //         name={`back${props.index}`}
        //         value={cardEditing.back}
        //     />
        
        //     <button type='submit' >Save</button>
        // </form>
    )
}

export default ImportPreviewCard;