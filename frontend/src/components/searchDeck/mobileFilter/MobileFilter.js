import React, { useState } from "react";
import "./MobileFilter.scss";
import styled from "styled-components";

import { Grid } from "@material-ui/core";
import UserFilter from "../searchFilters/UserFilter";
import SubCategoriesFilter from "../searchFilters/SubCategoriesFilter";

export default function MobileFilter(props) {
  const close = e => {
    e.preventDefault();
    const node = document.getElementById("target");
    node.style.animation = "fadeOut .3s forwards";

    setTimeout(() => {
      props.setMobileState(false);
    }, 300);
  };

  return (
    <div className="mf-container" id="target">
      <div className="mf-content">
        <button className="mf-close" onClick={close}>
          X
        </button>

        <Grid item md={1} xs={12} onClick={close}>
          {props.query.length > 0 ? <h2>Users</h2> : null}

          {props.query
            ? props.users.map((users, id) => (
                <UserFilter
                  key={id}
                  users={users}
                  filterClick={props.filterClick}
                />
              ))
            : null}

          {props.query.length > 0 ? <h2>Categories</h2> : null}

          {props.query
            ? props.tags.map((tags, id) => (
                <SubCategoriesFilter
                  key={id}
                  tags={tags}
                  filterClick={props.filterClick}
                />
              ))
            : null}
        </Grid>
      </div>
    </div>
  );
}