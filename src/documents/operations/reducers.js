import deepClone from 'clone-deep'

import {document} from './testData'

const main = (state = document, action) => {
  const newState = deepClone(state)
  const { payload } = action

  switch (action.type) {
    case "DOCUMENT_FETCH_SUCCEEDED":
      const { document } = action.payload;
      return document;

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

      if (payload.loc.collection === 'sections') {
        newState.sections[payload.loc.id] = {...payload.item, paragraphs: []}
        newState.sections.order.push(payload.loc.id)
        return newState
      }

      newState[payload.loc.collection][payload.loc.id] = {...payload.item}

      return newState


    case "DOCUMENT_ITEM_REMOVE":

      if (payload.loc.collection === 'sections') {
        const id = payload.loc.id

        delete newState.sections[id]

        newState.sections.order = newState.sections.order.filter(
          sectID => sectID !== id
        )

        return newState
      }


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