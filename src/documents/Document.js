import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Paragraph, List } from 'text-exploder-two'

const mapStateToProps = (state) => {
  return {
    document: state.document
  };
};

const flowSettings = {
  0: {showPoints: true},
  1: {showPoints: true, showSnippets: true},
  2: {showPoints: true, showSnippets: true, showSentences: true},
  3: {showSyntax: true}
}

function Articles (props) {
  // flowState
  const [flowState, setFlowState] = useState(0)
  const [selectedParagraph, setSelectedParagraph] = useState(null)
  const [selectedSections, setSelectedSection] = useState(null)


  const removeItem = ({loc, item}) => {
    props.dispatch({ type: "DOCUMENTS_ITEM_REMOVE", payload: { loc, item }})
  }

  const updateItem = ({loc, item}) => {
    props.dispatch({type: "DOCUMENTS_ITEM_UPDATE", payload: {loc, item}})
  }

  const addItem = ({loc, item}) => {
    props.dispatch({type: "DOCUMENTS_ITEM_ADD", payload: {loc, item}})
  }

  const {document: {sections, paragraphs, points, sentences, snippets}} = props

  const getJSX = (settings) => {

    return (
      <div>
        {
          sections.order.map((sectID) => <div>
            { sections[sectID].title }
            { sections[sectID].paragraphs.map((paraID) => (
              <div>
                { paragraphs[paraID].title }
                { settings.showPoints && paragraphs[paraID].points.map((poiID) => (
                  <div>
                    { points[poiID].text }
                    { settings.showSentences && points[poiID].sentences.map((sentID) => (
                      <div>
                        {sentences[sentID].text}
                      </div>
                    ))}
                  </div>
                ))}
                { settings.showSnippets && paragraphs[paraID].snippets.map((snipID) => (
                  <div>
                    {snippets[snipID].text}
                  </div>
                ))}
              </div>)
            )}
            {settings.showSyntax && 'syntax'}
          </div>)
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
      <button onClick={() => setFlowState(1)}>flesh 1</button>
      <button onClick={() => setFlowState(2)}>flesh 2</button>
      <button onClick={() => setFlowState(3)}>skin</button>

      {
        getJSX(flowSettings[flowState])
      }

    </div>
  );

}

export default connect(mapStateToProps)(Articles);