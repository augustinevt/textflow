import deepClone from 'clone-deep'

import {document} from './testData'

const main = (state = { documents: {}, document}, action) => {
  const newState = deepClone(state)
  const { payload } = action


  switch (action.type) {
    case "DOCUMENTS_FETCH_SUCCEEDED":
      const { documents } = action.payload;
      return { ...state, documents };

    case "DOCUMENT_FETCH_SUCCEEDED":
      const { document } = action.payload;
      return { ...state, document };

    case "DOCUMENT_ITEM_UPDATE":


      if (payload.loc.collection === 'document') {
        return { ...state, ...payload.item }
      } else {
        const newState = {...state}
        const newItem = {
          ...newState[payload.loc.collection][payload.loc.id],
          ...payload.item
        }

        newState[payload.loc.collection][payload.loc.id] = newItem

        return newState
      }

    case "DOCUMENT_ITEM_ADD":

      newState[payload.loc.collection][payload.loc.id] = {...payload.item}

      return newState


    case "DOCUMENT_ITEM_REMOVE":

      delete newState[payload.loc.collection][payload.loc.id]

      Object.keys(state.points).forEach(pointID => {
        newState.points[pointID].sentences = newState.points[pointID]
          .sentences.filter(sentenceID => sentenceID !== payload.loc.id)
      })

      return newState

    default:
      return state;
  }
};

export default main;