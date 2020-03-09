import React from 'react';
import Loader from 'react-loader-spinner';
import 'semantic-ui-css/semantic.min.css';
import {
  Divider,
  Segment,
  Header,
  Checkbox,
  Input,
  TextArea, 
} from 'semantic-ui-react';
import TextareaAutosize from "react-textarea-autosize";

import './Cards.scss';
import { editCard } from '../../actions';
import firebase from 'firebase';

class EditTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleCard: {
        front: this.props.card.front,
        back: this.props.card.back,
        archived: this.props.card.archived,
        edited: [],
        completed: false,
        deleted: this.props.deleted
      }
    };
    // console.log(this.state);
  }

  archiveCard = e => {
    e.preventDefault();
    this.setState({
      singleCard: {
        ...this.state.singleCard,
        archived: !this.state.singleCard.archived
      }
    });
  };

  handleChange = e => {
    this.setState({
      singleCard: {
        ...this.state.singleCard,
        [e.target.name]: e.target.value
      }
    });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(this.state.singleCard.edited);
  //   if (prevState.singleCard.edited !== this.state.singleCard.edited) {
  //     this.props.setEditedCard(this.state.singleCard.edited);
  //   }
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('current completed', this.state.singleCard.completed);
  //   console.log('next completed', nextState.singleCard.completed);
  //   if (this.state.singleCard.completed !== nextState.singleCard.completed) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  addCardtoEdited = e => {
    console.log(this.state);
    e.preventDefault();
    this.setState(
      {
        singleCard: {
          ...this.state.singleCard,
          completed: true,
          delete: false
        }
      },
      () => {
        let card = {
          id: this.props.id,
          data: {
            front: this.state.singleCard.front,
            back: this.state.singleCard.back,
            archived: this.state.singleCard.archived
          }
        };
        let newDeck = [];
        console.log(this.props.editedDeck);
        this.props.currentDeck.map(c => {
          if (this.props.id !== c.id) {
            newDeck.push(c);
          } else {
            newDeck.push(card);
          }
        });
        this.props.addCard(newDeck);
        console.log(this.state);
      }
    );

    // setTimeout(function() {}, 1000);
    // console.log(this.state);

    // this.props.setEditedCard(this.state.singleCard.edited);
  };

  addCardtoDeleted = e => {
    e.preventDefault();
    this.setState(
      {
        singleCard: {
          ...this.state.singleCard,
          completed: false,
          delete: true
        }
      },
      () => {
        let card = {
          id: this.props.id
        };
        let newCurrentDeck = [];
        this.props.currentDeck.map(c => {
          if (c.id === card.id) {
            newCurrentDeck.push({
              id: c.id,
              data: {
                front: c.data.front,
                back: c.data.back,
                archived: c.data.archived,
                deleted: true
              }
            });
          } else {
            newCurrentDeck.push(c);
          }
        });
        if (this.props.deletedDeck.length > 0) {
          let newDeck = [...this.props.deletedDeck, card];
          this.props.deleteDeck(newDeck, newCurrentDeck);
        } else {
          this.props.deleteDeck([card], newCurrentDeck);
        }
      }
    );
  };

  handleSubmit = (e, id, deckName) => {
    e.preventDefault();
    // this.props.editCard(this.state.singleCard);
    this.props.editCard(
      this.props.editedCard,
      this.props.user,
      this.props.deckName
    );
  };

  render() {
    if (!this.props.card) {
      return (
        <div className='loader'>
          <Loader type='ThreeDots' color='#F66E00' height={80} width={80} />
        </div>
      );
    } else {
      return (
        <div className='container'>
          <div className='cardList'>
            <div className='cardData '>
              <Segment className='segments'>
                <div className='cardTop'>
                  <Header as='h5' className='headers'>
                   Front
                  </Header>
                  {/* <Checkbox
                    // style={{border: "none"}}
                    className='check'
                    checked={this.state.singleCard.checked}
                    onChange={this.archiveCard}
                  /> */}
                  <div>
                    {this.state.singleCard.archived ? (
                      <i
                        className='fas fa-folder'
                        onClick={e => this.archiveCard(e)}
                      ></i>
                    ) : (
                      <i
                        className='fas fa-folder'
                        onClick={e => this.archiveCard(e)}
                        style={{ opacity: 0.5, cursor: 'pointer' }}
                      ></i>
                    )}
                    {this.state.singleCard.deleted ? (
                      <i
                        className='fas fa-trash'
                        onClick={e => this.addCardtoDeleted(e)}
                      ></i>
                    ) : (
                      <i
                        className='fas fa-trash'
                        onClick={e => this.addCardtoDeleted(e)}
                        style={{ opacity: 0.4, cursor: 'pointer' }}
                      ></i>
                    )}
                  </div>
                </div>

                {/* <form onSubmit={this.handleSubmit}> */}
                <TextArea
                  rows={2}
                  style={{ resize: 'none' }}
                  // transparent size="massive"
                  className='defination'
                  type='text'
                  name='front'
                  placeholder='Front'
                  onChange={this.handleChange}
                  value={this.state.singleCard.front}
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
                  name='back'
                  placeholder='Back'
                  onChange={this.handleChange}
                  value={this.state.singleCard.back}
                />

                <div className='quo-btn' onClick={e => this.addCardtoEdited(e)}>
                  Update
                </div>

                {/* </form> */}
              </Segment>
            </div>
          </div>
          {/* <div className = "button">
	//                <button className = "submit" onClick = {this.handlesubmit}>submit</button>
	//              </div> */}
        </div>
      );
    }
  }
}
export default EditTemplate;
