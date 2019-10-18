// export const document = {
//   id: "doc1",
//   title: "Actor Network Theory",
//   sentences: [
//     {id: 'sent1', text: 'The quick red fox jumped over the brown dog.'},
//     {id: 'sent2', text: 'The dog did\'t react.'}
//   ],
//   snippets: [
//     {id: 'snip1', text: 'More research on foxes'},
//     {id: 'snip2', text: 'What is the dogs name?'}
//   ],
//   points: [
//     {
//       id: "point1",
//       text: "Quick Anectdote",
//       sentences: ['sent1']
//     },
//     {
//       id: "point2",
//       text: "Quick Anectdote",
//       sentences: ['sent2']
//     }
//   ],
//   paragraphs: [
//     {id: 'para1', points: ['point1', 'point2'] }
//   ],
//   sections: [
//     {
//       id: "sect1",
//       paragraphs: ['para1']
//     }
//   ]
// }

export const document = {
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
    'sect1': { id: "sect1", paragraphs: ['para1']}
  }
}

/*

  Was thinking of using arrays, but since the use is more likly to load one document and work for a while, I think optimizing for render is better than storage...

  so, yes, each request will build the object from array or the client will do it... which is a little weird, but it really wont be a as big of a hit as it will be a gain for the rendering functions that will be used most intensely...

*/