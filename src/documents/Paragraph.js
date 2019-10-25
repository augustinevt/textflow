import React, {useState} from 'react';

import { collectionNames } from '../constants'

import TextInput from './TextInput'
import Points from './Points'
import Snippets from './Snippets'
import Sentence from './Sentence'
import SyntaxSpacer from './SyntaxSpacer'

import styles from './list.module.css'

export default (props) => {
  const [activeSyntaxInput, setActiveSyntaxInput] = useState({
    point: null,
    index: null
  })

  const removeItem = () => {
    props.removeItem({type: collectionNames.PARAGRAPHS, id: props.data.id})
  }

  const isolateItem = () => {
    props.isolateItem(props.parentID, props.data.id)
  }

  const updateItem = (val) => {
    props.updateItem({
      type: collectionNames.PARAGRAPHS,
      item: {title: val},
      id: props.data.id
    })
  }

  const getSyntaxSentences = () => {
    const syntaxSentences = []

    props.data.points.forEach(point => {
      syntaxSentences.push(
        <span
          key={`${point.id}-start`}
          className={styles.pointBoundary}>
        [
        </span>
      )

      point.sentences.forEach((sentence, i) => {
        syntaxSentences.push(<SyntaxSpacer
          active={(
            activeSyntaxInput.point === point.id &&
            (activeSyntaxInput.index + 1 === i)
          )}
          key={`sentenceSpacer-${point.id}-${i}`}
          activate={setActiveSyntaxInput}
          index={i}
          pointID={point.id}
          addItem={props.addItem}/>)

        syntaxSentences.push(

            <Sentence
              key={sentence.id}
              settings={props.settings}
              data={sentence}
              path={{...props.path, paragraphs: props.data.id}}
              mode={1}
              parentID={sentence.id}
              parentType={collectionNames.POINTS}
              addItem={props.addItem}
              updateItem={props.updateItem}
              removeItem={props.removeItem}/>

        )
      }
    )

    syntaxSentences.push(<SyntaxSpacer
      active={(
        activeSyntaxInput.point === point.id &&
        (activeSyntaxInput.index + 1 === point.sentences.length)
      )}
      key={`${point.id}-${point.sentences.length}`}
      activate={setActiveSyntaxInput}
      index={point.sentences.length}
      pointID={point.id}
      addItem={props.addItem}/>)
      
    syntaxSentences.push(
      <span key={`${point.id}-end`} className={styles.pointBoundary}>]</span>
    )
  })

  return syntaxSentences
}

  return (
    <div className={styles.item}>
      {
        (props.settings.showParagraphs || !props.settings.syntaxMode) &&
          <div className={styles.header}>

            <div className={styles.title}>
              <TextInput addItemHandler={updateItem} text={props.data.title}/>
            </div>

            <div onClick={removeItem} className={styles.removeBtn}>X</div>
            <div onClick={isolateItem} className={styles.isolateBtn}>--></div>
          </div>
      }

      <div className={styles.body}>
        { props.settings.showPoints &&
          <Points
            settings={props.settings}
            data={props.data.points}
            path={{...props.path, paragraphs: props.data.id}}
            parentID={props.data.id}
            parentType={collectionNames.PARAGRAPHS}
            addItem={props.addItem}
            updateItem={props.updateItem}
            removeItem={props.removeItem} />
        }

        { props.settings.syntaxMode && <span>
            { getSyntaxSentences() }
            { activeSyntaxInput.point }
            { activeSyntaxInput.index }
            <Sentence
            settings={props.settings}
            path={{...props.path, paragraphs: props.data.id}}
            parentID={props.data.id}
            parentType={collectionNames.PARAGRAPHS}
            init={true}
            mode={1}
            addItem={props.addItem}/>
          </span>
        }

        { props.settings.showSnippets && <Snippets
          settings={props.settings}
          data={props.data.snippets}
          path={{...props.path, paragraphs: props.data.id}}
          parentID={props.data.id}
          parentType={collectionNames.PARAGRAPHS}
          addItem={props.addItem}
          updateItem={props.updateItem}
          removeItem={props.removeItem}/>}
      </div>
    </div>
  )
}