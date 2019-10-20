import uuid from 'uuid'

import reducer from './reducers';

let document = {
  id: "doc1",
  title: "Actor Network Theory",
  sentences: {
    'sent1': {id: 'sent1', text: 'The quick red fox jumped over the brown dog.'},
    'sent2': {id: 'sent2', text: 'The dog did\'t react.'}
  },
  snippets: {
    'snip1': {id: 'snip1', text: 'More research on foxes'},
    'snip2': {id: 'snip2', text: 'What is the dogs name?'}
  },
  points: {
    'point1': { id: "point1", text: "Quick Anectdote", sentences: ['sent1']},
    'point2': { id: "point2", text: "Quick Anectdote", sentences: ['sent2']}
  },
  paragraphs: {
    'para1': {id: 'para1', title: 'Introduce ANT', points: ['point1', 'point2'] }
  },
  sections: {
    order: ['sect1'],
    'sect1': { id: 'sect1', title: 'SECTION ONE', paragraphs: ['para1']}
  }
}


test('updates an document title', () => {

  const action = {
    type: 'DOCUMENT_ITEM_UPDATE',
    payload: {
      loc: {
        collection: 'document',
        id: 'doc1'
      },
      item: {title: "Introduce Governance"}
    }
  }
  const initialState = JSON.parse(JSON.stringify(document))
  const desiredState = {...initialState,  title: 'Introduce Governance'}

  const newState = reducer(initialState, action)

  expect(newState).toEqual(desiredState)

});

test('updates a sentence', () => {
  const action = {
    type: 'DOCUMENT_ITEM_UPDATE',
    payload: {
      loc: {
        collection: 'sentences',
        id: 'sent1'
      },
      item: {text: "Crazy how foxes can jump"}
    }
  }

  const initialState = JSON.parse(JSON.stringify(document))
  const desiredState = {...initialState, sentences: {
    ...document.sentences,
    'sent1': { id: 'sent1', text: 'Crazy how foxes can jump'}
  }}

  const newState = reducer(initialState, action)

  expect(newState).toEqual(desiredState)
});

test('updates a snippet', () => {
  const action = {
    type: 'DOCUMENT_ITEM_UPDATE',
    payload: {
      loc: {
        collection: 'snippets',
        id: 'snip2'
      },
      item: {text: "What is the dog's name? Maybe Bruno?"}
    }
  }

  const initialState = JSON.parse(JSON.stringify(document))
  const desiredState = {...initialState, snippets: {
    ...document.snippets,
    'snip2': { id: 'snip2', text: 'What is the dog\'s name? Maybe Bruno?'}
  }}

  const newState = reducer(initialState, action)

  expect(newState).toEqual(desiredState)
});

test('add a snippet', () => {
  const id = uuid()
  const desiredState = 'What is the dog\'s name? Maybe Bruno?'
  const action = {
    type: 'DOCUMENT_ITEM_ADD',
    payload: {
      loc: {
        collection: 'snippets',
        belongs_to: '',
        id: id
      },
      item: {id, text: desiredState}
    }
  }

  const initialState = JSON.parse(JSON.stringify(document))
  const newState = reducer(initialState, action)

  expect(newState.snippets[id].text).toEqual(desiredState)
});

/// SECTIONS
test('add a section', () => {
  const action = {
    type: 'DOCUMENT_ITEM_ADD',
    payload: {
      loc: {
        collection: 'sections',
        id: 'sect2'
      },
      item: {id: 'sect2', title: 'SECTION TWO'}
    }
  }

  const initialState = JSON.parse(JSON.stringify(document))
  const desiredState = JSON.parse(JSON.stringify(document))

  desiredState.sections = {
    order: ['sect1', 'sect2'],
    'sect1': { id: 'sect1', title: 'SECTION ONE', paragraphs: ['para1']},
    'sect2': { id: 'sect2', title: 'SECTION TWO', paragraphs: []},

  }

  const newState = reducer(initialState, action)

  expect(newState).toEqual(desiredState)
});


test('remove a section', () => {
  const action = {
    type: 'DOCUMENT_ITEM_REMOVE',
    payload: {
      loc: {
        collection: 'sections',
        id: 'sect1'
      }
    }
  }

  const initialState = JSON.parse(JSON.stringify(document))
  const desiredState = JSON.parse(JSON.stringify(document))

  desiredState.sections = {
    order: []
  }

  const newState = reducer(initialState, action)

  expect(newState).toEqual(desiredState)
});

test.only('updates a section', () => {
  const action = {
    type: 'DOCUMENT_ITEM_UPDATE',
    payload: {
      loc: {
        collection: 'sections',
        id: 'sect1'
      },
      item: {id: 'sect1', title: 'SECTION ONE!!!'}
    }
  }

  const initialState = JSON.parse(JSON.stringify(document))
  const desiredState = JSON.parse(JSON.stringify(document))
  desiredState.sections.sect1.title = 'SECTION ONE!!!'

  const newState = reducer(initialState, action)

  expect(newState).toEqual(desiredState)
});


///  END SECTIONS

test('adds sentence to a point by update', () => {
    const action = {
      type: 'DOCUMENT_ITEM_UPDATE',
      payload: {
        loc: {
          collection: 'points',
          id: 'point1'
        },
        item: {sentences: ['sent1', "sent3"]}
      }
    }

    const initialState = JSON.parse(JSON.stringify(document))
    const desiredState = {...initialState, points: {
      ...document.points,
      'point1': {
        id: "point1",
        text: "Quick Anectdote",
        sentences: ['sent1', 'sent3']
      }
    }}

    const newState = reducer(initialState, action)
    expect(newState).toEqual(desiredState)
});

test('removes sentence of point by update', () => {
    const action = {
      type: 'DOCUMENT_ITEM_UPDATE',
      payload: {
        loc: {
          collection: 'points',
          id: 'point1'
        },
        item: {sentences: []}
      }
    }

    const initialState = JSON.parse(JSON.stringify(document))
    const desiredState = {...initialState, points: {
      ...document.points,
      'point1': {
        id: "point1",
        text: "Quick Anectdote",
        sentences: []
      }
    }}

    const newState = reducer(initialState, action)

    expect(newState).toEqual(desiredState)
});

test('removes sentence', () => {

  const action = {
    type: 'DOCUMENT_ITEM_REMOVE',
    payload: {
      loc: {
        collection: 'sentences',
        id: 'sent1'
      }
    }
  }

  const initialState = JSON.parse(JSON.stringify(document))
  const desiredState = {
    ...JSON.parse(JSON.stringify(document)),
    points: {
    ...initialState.points,
    'point1': {
      id: "point1",
      text: "Quick Anectdote",
      sentences: []
    }
  }}

  delete desiredState['sentences']['sent1']

  const newState = reducer(initialState, action)

  expect(newState).toEqual(desiredState)
});


