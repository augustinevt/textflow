import React, { useState } from 'react';
import { connect } from 'react-redux';

import styles from './document.module.css'

// import { TextInput} from 'text-exploder-two'
import list from './List'
import item from './Item'

const mapStateToProps = (state) => {
  return {
    document: state.document
  };
};

const flowSettings = {
  0: {},
  1: {showPoints: true},
  2: {showPoints: true, showSnippets: true},
  3: {showPoints: true, showSnippets: true, showSentences: true},
  4: {showSyntax: true}
}

const Sections = list('sections')
const Section = item('sections')
const Paragraphs = list('paragraphs')
const Paragraph = item('paragraphs')
const Points = list('points')
const Point = item('points')
const Sentences = list('sentences')
const Sentence = item('sentences')
const Snippets = list('snippets')
const Snippet = item('snippets')

function Articles (props) {

  const [flowState, setFlowState] = useState(3)
  const [selectedParagraph, setSelectedParagraph] = useState(null)
  const [selectedSection, setSelectedSection] = useState(null)

  const removeItem = ({type, id}) => {
    //
    // (loc.id === selectedParagraph) &&
    //   setSelectedParagraph(false)
    //
    // (loc.id === selectedSection) &&
    //   setSelectedParagraph(false)

    const loc = {
      collection: type,
      id
    }

    props.dispatch({ type: "DOCUMENTS_ITEM_REMOVE", payload: { loc }})
  }

  const updateItem = ({type, item, id}) => {
    const loc = {
      collection: type,
      id,
    }

    props.dispatch({type: "DOCUMENTS_ITEM_UPDATE", payload: {loc, item}})
  }

  const addItem = ({type, item, parentID=null, parentType=null}) => {

    console.log('ADD ITEM YEAH!')
    const loc = {
      collection: type,
    }

    if (parentID) {
      loc.belongs_to = {
        collection: parentType,
        id: parentID
      }
    }

    props.dispatch({type: "DOCUMENTS_ITEM_ADD", payload: {loc, item}})
  }

  const isolateItem = ({type, id, parentID}) => {
    if (type === 'paragraphs') {
      setSelectedSection(parentID)
      setSelectedParagraph(id)
    } else if (type === 'sections') {
      setSelectedSection(id)
    }
  }

  const {document: {sections, paragraphs, points, sentences, snippets}} = props

  const getJSX = (settings) => {
    return (<div className={styles.wrapper} >
      <Sections
        addItem={addItem}
        hideNew={(selectedParagraph || selectedSection)}>
          {(selectedSection ? [selectedSection] : sections.order).map(sectID => <Section
            listOnly={!!selectedParagraph}
            id={sectID}
            updateItem={updateItem}
            removeItem={removeItem}
            isolateItem={isolateItem}
            data={sections[sectID]}>

              <Paragraphs addItem={addItem}>
                {(selectedParagraph ?
                  [selectedParagraph] :
                  sections[sectID].paragraphs).map(paraID => <Paragraph
                    id={paraID}
                    updateItem={updateItem}
                    removeItem={removeItem}
                    isolateItem={isolateItem}
                    data={paragraphs[paraID]}>

                    {settings.showPoints && <Points addItem={addItem}>
                      {paragraphs[paraID].points.map(poiID => <Point
                        id={poiID}
                        updateItem={updateItem}
                        removeItem={removeItem}
                        data={points[poiID]}>

                        {settings.showSentences && <Sentences addItem={addItem}>
                          {points[poiID].sentences.map(sentID => <Sentence
                            id={sentID}
                            updateItem={updateItem}
                            removeItem={removeItem}
                            data={sentences[sentID]}/>
                          )}
                        </Sentences>}

                      </Point>)}
                    </Points>}

                      {settings.showSnippets && <Snippets addItem={addItem}>
                        {paragraphs[paraID].snippets.map(snipID => <Snippet
                          id={snipID}
                          updateItem={updateItem}
                          removeItem={removeItem}
                          data={snippets[snipID]}>
                        </Snippet>)}
                      </Snippets>}

              </Paragraph>)}
            </Paragraphs>
          </Section>)}
      </Sections>

    </div>)
  }

  return (
    <div>
      <button onClick={() => setFlowState(0)}>Skel</button>
      <button onClick={() => setFlowState(1)}>points 1</button>
      <button onClick={() => setFlowState(2)}>snippets 2</button>
      <button onClick={() => setFlowState(3)}>sentences</button>
      <button onClick={() => setFlowState(4)}>syntax</button>

      { selectedSection && <div onClick={() => setSelectedSection(false)}>
          {sections[selectedSection] && sections[selectedSection].title} >>
        </div>
      }

      { selectedParagraph && <div onClick={() =>
          setSelectedParagraph(false)}>
            {
              paragraphs[selectedParagraph] &&
                paragraphs[selectedParagraph].title
            }
        </div>
      }

      { getJSX(flowSettings[flowState]) }

    </div>
  );

}

export default connect(mapStateToProps)(Articles);