import React, { useState, useEffect } from "react";
import "./searchDeck.scss";
import { firestore } from "../../App";
import { Grid } from "@material-ui/core";
import "../dashboard/deckcards/deckcards.scss";
import UserFilter from "./searchFilters/UserFilter";
import SubCategoriesFilter from "./searchFilters/SubCategoriesFilter";
import MobileFilter from "./mobileFilter/MobileFilter";

const SearchDeck = () => {
  const [publicDecks, setPublicDecks] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [notFoundToggle, setNotFoundToggle] = useState(false);
  const [query, setQuery] = useState([]);
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [mobileState, setMobileState] = useState(false);
  const [preview, setPreview] = useState(false);
  const [selection, setSelection] = useState({});
  useEffect(() => {
    firestore.collection("PublicDecks").onSnapshot(snapshot => {
      const deckArr = [];
      snapshot.forEach(doc => {
        console.log(doc)
        deckArr.push(doc.data());
      });
      setPublicDecks(deckArr);
    });
  }, []);
  const notFound = () => {
    if (!query.length > 0) {
      return (
        <span className="center" data-testid='sorry'>
          <h1>Sorry, we couldn't find any search results.</h1>
          <h1>Try searching for another term</h1>
        </span>
      );
    }
  };
  // const openDeck = (deck, user) => {
  //   console.log("openDeck deck", deck, "\nopenDeck user", user);
  //   props.history.push(`/${user}/${deck}/cards`);
  //   console.log(deck);
  // };
  const handleChange = e => {
    e.preventDefault();
    setSearchField(e.target.value);
  };
  const handleSubmit = e => {
    const queryArr = [];
    const usersArr = [];
    const tagsArr = [];
    e.preventDefault();
    publicDecks.filter(deck => {
      const tagsLowerCase = deck.tags.map(item => item.toLowerCase());
      if (
        (deck.deckName &&
          deck.deckName.toLowerCase() === searchField.toLowerCase()) ||
        (deck.createdBy &&
          deck.createdBy.toLowerCase() === searchField.toLowerCase()) ||
        (deck.tags && tagsLowerCase.includes(searchField.toLowerCase()))
      ) {
        queryArr.push(deck);
        usersArr.push(deck.createdBy);
        tagsArr.push(deck.tags);
        setSearchField("");
      } else {
        setSearchField("");
        setNotFoundToggle(true);
      }
      const usersArrConcat = [].concat(...usersArr);
      const usersSet = [...new Set(usersArrConcat)];
      const tagsArrConcat = [].concat(...tagsArr);
      const tagsSet = [...new Set(tagsArrConcat)];
      const tagsSetLowerCase = tagsSet.map(item => item.toLowerCase());
      setQuery(queryArr);
      setUsers(usersSet.sort());
      setTags(tagsSetLowerCase.sort());
    });
  };
  const filterClick = (filter, value) => {
    const filteredTags = [];
    const filteredUsers = [];
    const newQuery = query.filter(deck => {
      const tagsLowerCase = deck.tags.map(item => item.toLowerCase());
      if (filter === "tags" && tagsLowerCase.includes(value.toLowerCase())) {
        filteredUsers.push(deck.createdBy);
        filteredTags.push(deck.tags);
        return deck;
      } else if (deck[filter] === value) {
        filteredUsers.push(deck.createdBy);
        filteredTags.push(deck.tags);
        return deck;
      } else {
        return null;
      }
    });
    const usersArrConcat = [].concat(...filteredUsers);
    const usersSet = [...new Set(usersArrConcat)];
    const tagsArrConcat = [].concat(...filteredTags);
    const tagsSet = [...new Set(tagsArrConcat)];
    const tagsSetLowerCase = tagsSet.map(item => item.toLowerCase());
    setUsers(usersSet);
    setTags(tagsSetLowerCase);
    setQuery(newQuery);
  };
  const categoryDiv = (<Grid item md={1} xs={12} className="category">
      {query.length > 0 ? <h2>Users</h2> : null}
      {query
        ? users.map((users, id) => (
            <UserFilter key={id} users={users} filterClick={filterClick} />
          ))
        : null}
      {query.length > 0 ? <h2>Categories</h2> : null}
      {query
        ? tags.map((tags, id) => (
            <SubCategoriesFilter
              key={id}
              tags={tags}
              filterClick={filterClick}
            />
          ))
        : null}
    </Grid>);
  const showFilter = () => {
    setMobileState(!mobileState);
  }
  const windowWidth = () => {
    if(width > 767) {
       if(query.length === 0) {
         return
       }
       else {
         return categoryDiv;
       }
    }
    else {
      if(query.length > 0) {
         return (
          <button className="filter-btn" onClick={showFilter}>Filter</button>
        )
      }
    }
  }
  const deckPreview = e => {
    setPreview(!preview);
    const parent = e.target.closest(".deckcard-div").id;
    setSelection(query[parent]);
    console.log(selection)  
  }
  return (
    <div>
      <Grid container>
        {windowWidth()}
        {mobileState ? <MobileFilter query={query} users={users} filterClick={filterClick} tags={tags} mobileState={mobileState} setMobileState={setMobileState} categoryDiv={categoryDiv}/> : null}
        <Grid item md={11} xs={12} className="cody">
          {query.length > 0 ? <h2 data-testid='users'>Users</h2> : null}
          {query
            ? users.map((users, id) => (
                <UserFilter key={id} users={users} filterClick={filterClick} />
              ))
            : null}
          {query.length > 0 ? <h2>Categories</h2> : null}
          {query
            ? tags.map((tags, id) => (
                <SubCategoriesFilter
                  key={id}
                  tags={tags}
                  filterClick={filterClick}
                />
              ))
            : null}
        </Grid>
        <Grid item md={11} xs={12}>
          <form onSubmit={handleSubmit}>
            <div className="center">
              <input
                aria-label="search-subject"
                className="center"
                type="text"
                placeholder="Search Public Decks"
                onChange={handleChange}
                value={searchField}
              />
              <button type="submit" data-testid='btn'>Find</button>
            </div>
          </form>
          <div className="decks-section">
            {notFoundToggle ? notFound() : null}
            {query
              ? query.map((item, index) => {
                  const id = Math.random();
                  return (
                    <div
                      className="deckcard-div"
                      key={id} onClick={deckPreview}
                      id={index}
                      // onClick={openDeck}
                    >
                      <div className="deck">
                        <div className="deck-card">
                          <div className="deck-info">
                            <h3 className="deck-name" data-testid='deck-name' >{item.deckName}</h3>
                          </div>
                          <div className="example-card">{item.exampleCard}</div>
                        </div>
                        <div className="mastery">
                          <h3>Created by: {item.createdBy}</h3>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default SearchDeck;