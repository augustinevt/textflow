import React, { useState } from 'react';
import { connect } from 'react-redux';

import styles from './document.module.css'

import TextInput from './TextInput'
import list from './List'
import Section from './Section'

const mapStateToProps = (state) => {

  const zippedDoc = {}
  const procDoc = JSON.parse(JSON.stringify(state.document))

  zippedDoc.sections = procDoc.sections.order.map(sectID => procDoc.sections[sectID])

  zippedDoc.sections.forEach(section => {
    section.paragraphs = section.paragraphs.map(parID => ({
      ...procDoc.paragraphs[parID],
      snippets: procDoc.paragraphs[parID].snippets.map( snipID => procDoc.snippets[snipID]),
      sentences: procDoc.paragraphs[parID].sentences.map( sentID => procDoc.sentences[sentID]),
      points: procDoc.paragraphs[parID].points.map( poiID => ({
        ...procDoc.points[poiID],
        sentences: procDoc.points[poiID].sentences.map(sentID => procDoc.sentences[sentID])
      }))
    }))
  })

  return {
    document: state.document,
    zippedDoc: zippedDoc
  };
};

const flowSettings = {
  0: {showParagraphs: true},
  1: {showParagraphs: true, showPoints: true},
  2: {showParagraphs: true, showPoints: true, showSnippets: true},
  3: {showParagraphs: true, showPoints: true, showSnippets: true, showSentences: true},
  4: {syntaxMode: true}
}

// const Sections = list('sections')
// const Section = item('sections')
// const Paragraphs = list('paragraphs')
// const Paragraph = item('paragraphs')
// const Points = list('points')
// const Point = item('points')
// const Sentences = list('sentences')
// const Sentence = item('sentences')
// const Snippets = list('snippets')
// const Snippet = item('snippets')

function Articles (props) {
  const [flowState, setFlowState] = useState(4)
  const [selectedSection, setSelectedSection] = useState(null)
  const [selectedParagraph, setSelectedParagraph] = useState(null)

  const removeItem = ({type, id}) => {
    const loc = {
      collection: type,
      id
    }

    props.dispatch({ type: "DOCUMENTS_ITEM_REMOVE", payload: { loc }})
  }

  const updateItem = ({type, item, id}) => {
    console.log('document => ITEM update', type, item, id)
    const loc = {
      collection: type,
      id,
    }

    props.dispatch({type: "DOCUMENTS_ITEM_UPDATE", payload: {loc, item}})
  }

  const addItem = ({type, item, parentID=null, parentType=null}) => {
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

  const {document: {sections, paragraphs}} = props

  const isolateItem = (sectionID, paragraphID=null) => {
    const section = props.zippedDoc.sections.find(section => {

       return section.id === sectionID

    })

    setSelectedSection(section)

    if (paragraphID) {
      const paragraph = section.paragraphs.find(
        paragraph => paragraph.id === paragraphID
      )

      setSelectedParagraph(paragraph)
    }
  }

  const getJSX = (settings) => {
    return (<div className={styles.wrapper} >

      {

          (selectedSection ? [selectedSection] : props.zippedDoc.sections).map(section =>
            <Section
              settings={settings}
              data={section}
              addItem={addItem}
              updateItem={updateItem}
              removeItem={removeItem}
              isolateItem={isolateItem}
              selectedParagraph={selectedParagraph}
            />
        )
      }

      {
        !selectedParagraph && <div className={styles.newForm}>
          <TextInput
            init={true}
            text={'Add section'}
            addItemHandler={(val) => addItem({
              type: 'sections',
              item: {title: val}
            })}/>
        </div>
      }


    </div>)
  }

  const exportText = () => {
    let text = ''

    props.document.sections.order.forEach(sectionID => {
      props.document.sections[sectionID].paragraphs.forEach(paraID => {
        text += '\n\t'
        props.document.paragraphs[paraID].points.forEach(poiID => {
          props.document.points[poiID].sentences.forEach(sentID => {
            text += props.document.sentences[sentID].text
          })
        })
      })
    })

    const element = document.createElement('a')
    const file = new Blob([text], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = 'TEXT FILE.txt'
    document.body.appendChild(element)
    element.click()
  }

  return (
    <div>
      <button onClick={() => setFlowState(0)}>Skel</button>
      <button onClick={() => setFlowState(1)}>points 1</button>
      <button onClick={() => setFlowState(2)}>snippets 2</button>
      <button onClick={() => setFlowState(3)}>sentences</button>
      <button onClick={() => setFlowState(4)}>syntax</button>
      <button onClick={() => exportText()}>EXPORT</button>

      { selectedSection &&
        <div onClick={() => {
          setSelectedSection(false)
          setSelectedParagraph(false)
        }}>
          { selectedSection.title} >>
        </div>
      }

      { selectedParagraph &&
        <div onClick={() => {
          setSelectedParagraph(false)
        }}>
          { selectedParagraph.title} >>
        </div>
      }

      { getJSX(flowSettings[flowState]) }

    </div>
  );

}

export default connect(mapStateToProps)(Articles);