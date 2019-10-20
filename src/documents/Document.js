import React, { useState } from 'react';
import { connect } from 'react-redux';

import styles from './document.module.css'

import { TextInput} from 'text-exploder-two'

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

function Articles (props) {
  // flowState
  const [flowState, setFlowState] = useState(0)
  const [selectedParagraph, setSelectedParagraph] = useState(null)
  const [selectedSection, setSelectedSection] = useState(null)


  const removeItem = ({loc}) => {
    props.dispatch({ type: "DOCUMENTS_ITEM_REMOVE", payload: { loc }})
  }

  const updateItem = ({loc, item}) => {
    props.dispatch({type: "DOCUMENTS_ITEM_UPDATE", payload: {loc, item}})
  }

  const addItem = ({loc, item}) => {
    props.dispatch({type: "DOCUMENTS_ITEM_ADD", payload: {loc, item}})
  }

  const {document: {sections, paragraphs, points, sentences, snippets}} = props

  const getJSX = (settings) => {
    const displaySections = selectedSection ?
      [selectedSection] :
      sections.order

    return (
      <div className={styles.wrapper}>

        { selectedSection && <div onClick={() => setSelectedSection(false)}>
            {sections[selectedSection].title} >>
          </div>
        }

        { selectedParagraph && <div onClick={() => setSelectedParagraph(false)}>
            {paragraphs[selectedParagraph].title}
          </div>
        }

        {
          displaySections.map((sectID) => <div className={styles.section}>

            { !selectedParagraph && <div
                className={styles.title}
                onClick={() => setSelectedSection(sectID)}>
                  <TextInput
                    addItemHandler={
                      (val) => updateItem({
                        loc: { collection: 'sections', id: sectID},
                        item: { title: val}
                      })
                    }
                    text={sections[sectID].title}
                  />
                </div>
            }

            <div
              onClick={() => removeItem({
                loc: { collection: 'sections', id: sectID}
              })}
              className="removeBtn">
              x
            </div>

            { (selectedParagraph ?
                [selectedParagraph] :
                sections[sectID].paragraphs).map((paraID) => (
                  <div className={styles.paragraph}>

                    <div
                      className={styles.title}
                      onClick={() => {
                        setSelectedSection(sectID)
                        setSelectedParagraph(paraID)
                      }}>

                      { paragraphs[paraID].title }

                    </div>

                    { settings.showPoints && paragraphs[paraID].points.map((poiID) => (
                      <div className={styles.point}>
                        { points[poiID].text }
                        { settings.showSentences && points[poiID].sentences.map((sentID) => (

                          <div className={styles.sentence}>
                            {sentences[sentID].text}
                          </div>

                        ))}
                  </div>
                ))
              }

                { settings.showSnippets && paragraphs[paraID].snippets.map((snipID) => (
                  <div className={styles.snippet}>
                    {snippets[snipID].text}
                  </div>
                ))}

              </div>)
            )}
            {settings.showSyntax && 'syntax'}
          </div>)
        }
        { !selectedSection &&
          <h1>
            <TextInput
              init={true}
              text='add section'
              addItemHandler={
                (val) => {
                  console.log(val)
                  addItem({
                    loc: {collection: 'sections'},
                    item: {title: val}
                  })
                }
              }
            />
          </h1>
        }
      </div>
    )
  }

  return (
    <div>

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
      {flowState}
      <button onClick={() => setFlowState(0)}>Skel</button>
      <button onClick={() => setFlowState(1)}>points 1</button>
      <button onClick={() => setFlowState(2)}>snippets 2</button>
      <button onClick={() => setFlowState(3)}>sentences</button>
      <button onClick={() => setFlowState(4)}>syntax</button>

      {
        getJSX(flowSettings[flowState])
      }

    </div>
  );

}

export default connect(mapStateToProps)(Articles);