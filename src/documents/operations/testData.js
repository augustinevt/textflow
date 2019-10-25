export const document = {
  id: "doc1",
  title: "Actor Network Theory",
  sentences: {
    'sent1': {id: 'sent1', parentPoint: 'point1', text: 'The quick red fox jumped over the brown dog.'},
    'sent2': {id: 'sent2', text: 'The dog did\'t react.'},
    'sent3': {id: 'sent3', text: 'This sentences doesn\'t hava a point'},
    'sent4': {id: 'sent4', text: 'Silly sentence is the duck.'}
  },
  snippets: {
    'snip1': {id: 'snip1', text: 'More research on foxes'},
    'snip2': {id: 'snip2', text: 'What is the dogs name?'}
  },
  points: {
    'point1': { id: "point1", text: "Quick Anectdote", sentences: ['sent1', 'sent3']},
    'point2': { id: "point2", text: "Quick Anectdote", sentences: ['sent2', 'sent4']}
  },
  paragraphs: {
    'para1': {id: 'para1', title: 'Introduce ANT', points: ['point1', 'point2'], snippets: ['snip1', 'snip2'], sentences: ['sent1', 'sent2', 'sent3']}
  },
  sections: {
    order: ['sect1', 'sect2'],
    'sect1': { id: "sect1", title: 'Introductory Section', paragraphs: ['para1']},
    'sect2': { id: "sect2", title: 'Second Section', paragraphs: ['para1']}
  }
}

/*

  Was thinking of using arrays, but since the use is more likly to load one document and work for a while, I think optimizing for render is better than storage...

  so, yes, each request will build the object from array or the client will do it... which is a little weird, but it really wont be a as big of a hit as it will be a gain for the rendering functions that will be used most intensely...

*/