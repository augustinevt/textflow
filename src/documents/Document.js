import React, { useState } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    document: state.document
  };
};

function Articles (props) {
  // flowState

  console.log(props)


  const removeItem = ({loc, item}) => {
    props.dispatch({ type: "DOCUMENTS_ITEM_REMOVE", payload: { loc, item }})
  }

  const updateItem = ({loc, item}) => {
    props.dispatch({type: "DOCUMENTS_ITEM_UPDATE", payload: {loc, item}})
  }

  const addItem = ({loc, item}) => {
    props.dispatch({type: "DOCUMENTS_ITEM_ADD", payload: {loc, item}})
  }

  return (
    <div>
      Doument
    {
      /*
      -----

      ( if section or paragraph is selected... contrain range)

      * skel

        for each section
          { section header }

          list paragraphs
            show points (black)

      * research / flesh

        for each section

          list paragraphs
            show points (grey)
            show snippets (black)

      * sketch

        for each section

          list paragraphs
            show points (gray)
            show snippets (gray)
            show sentence points (black)

      * skin

        for each sections

          list paragraphs
            show sentences in syntax form




      -----
        // if flow is skell -> list the sections and the paragaphs / points
          // add paragraph
          // add point

        // if flow is flesh -> show snippets

        // if flow is flesh 2 -> show sentence under points

        // if syntax -> show syntax
      */

    }
    </div>
  );

}

export default connect(mapStateToProps)(Articles);