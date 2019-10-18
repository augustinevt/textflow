import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    document: state.document
  };
};

function Articles (props) {
  // paragraphs
  // sections
  // points
  // sentences
  // snippets

  useEffect(() => {
    props.dispatch({type: "DOCUMENTS_FETCH_REQUESTED", payload: {}});
  },[])

  const removeItem = ({loc, item}) => {
    props.dispatch({type: "DOCUMENTS_ITEM_REMOVE", payload: {loc, item}})
  }

  const updateItem = ({loc, item}) => {
    props.dispatch({type: "DOCUMENTS_ITEM_UPDATE", payload: {loc, item}})
  }

  const addItem = ({loc, item}) => {
    props.dispatch({type: "DOCUMENTS_ITEM_ADD", payload: {loc, item}})
  }

  return (
    <div>
      {

      }
    </div>
  );

}

export default connect(mapStateToProps)(Articles);