import deepClone from 'clone-deep'

import {document} from './testData'

const initModels = {
  'sections': {title: 'default', paragraphs: []},
  'paragraphs': {title: 'default', points: [], snippets: [], sentences: []},
  'points': {text: 'default', sentences: []},
  'sentences': {text: 'default'},
  'snippets': {text: 'default'}
}

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
        newState.sections.order.push(payload.item.id)

        return newState
      }

      if (payload.loc.belongs_to) {
        newState[payload.loc.belongs_to.collection][payload.loc.belongs_to.id][payload.loc.collection].push(payload.loc.id)
      }

      newState[payload.loc.collection][payload.loc.id] = {...initModels[payload.loc.collection], ...payload.item}

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

      // this needs to be simplified
      // It's okay to be expensive here... the use case does not anticipate
      // intense use of remove and it's better to be thorgouh
      Object.keys(newState).forEach(collection => {
        Object.keys(newState[collection]).forEach(itemID =>{
          if (state[collection][itemID][payload.loc.collection]) {
            newState[collection][itemID][payload.loc.collection] = newState
              [collection][itemID][payload.loc.collection]
              .filter(childID => childID !== payload.loc.id)
          }
        })
      })

      return newState

    default:
      return state;
  }
};

export default main;