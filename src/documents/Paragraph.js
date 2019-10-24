import React, {useState} from 'react';
import TextInput from './TextInput'

import Points from './Points'
import Snippets from './Snippets'
import Sentence from './Sentence'
import SentenceInput from './SentenceInput'
import SyntaxSpacer from './SyntaxSpacer'

import styles from './list.module.css'
export default (props) => {
  const [activeSyntaxInput, setActiveSyntaxInput] = useState({
    point: null,
    index: null
  })

  const removeItem = () => {
    props.removeItem({  type: 'paragraphs', id: props.data.id})
  }

  const isolateItem = () => {
    console.log(props)
    props.isolateItem(props.parentID, props.data.id)
  }

  const updateItem = (val) => {
    props.updateItem({
      type: 'paragraphs',
      item: {title: val},
      id: props.data.id
    })
  }


  const getSyntaxSentences = () => {
    const syntaxSentences = []

    props.data.points.forEach(point => {
      syntaxSentences.push(<span className={styles.pointBoundary}>[</span>)

      point.sentences.forEach((sentence, i) => {
      syntaxSentences.push(<SyntaxSpacer
        active={(
          activeSyntaxInput.point === point.id &&
          (activeSyntaxInput.index + 1 === i)
        )}
        activate={setActiveSyntaxInput}
        index={i}
        pointID={point.id}
        addItem={props.addItem}
      />)


      syntaxSentences.push(
        <span>
          <Sentence
            settings={props.settings}
            data={sentence}
            path={{...props.path, paragraphs: props.data.id}}
            mode={1}
            parentID={sentence.id}
            parentType={'points'}
            addItem={props.addItem}
            updateItem={props.updateItem}
            removeItem={props.removeItem}
          />
        </span>)
      }
    )

    syntaxSentences.push(<SyntaxSpacer
      active={(
        activeSyntaxInput.point === point.id &&
        (activeSyntaxInput.index + 1 === point.sentences.length)
      )}
      activate={setActiveSyntaxInput}
      index={point.sentences.length}
      pointID={point.id}
      addItem={props.addItem}/>)

    syntaxSentences.push(<span className={styles.pointBoundary}>]</span>)
    }
  )

    return syntaxSentences
  }



  return (
    <div className={styles.item}>

    { (props.settings.showParagraphs || !props.settings.syntaxMode) &&
      <div className={styles.header}>

        <div className={styles.title}>
          <TextInput addItemHandler={updateItem} text={props.data.title}/>
        </div>

        <div onClick={removeItem} className={styles.removeBtn}>X</div>
        <div onClick={isolateItem} className={styles.isolateBtn}> --></div>
      </div>
    }

      <div className={styles.body}>

        { props.settings.showPoints &&
          <Points
            settings={props.settings}
            data={props.data.points}
            path={{...props.path, paragraphs: props.data.id}}
            parentID={props.data.id}
            parentType={'paragraphs'}
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
            parentType={'paragraphs'}
            init={true}
            mode={1}
            addItem={props.addItem}
            />
          </span>
        }

        { props.settings.showSnippets && <Snippets
          settings={props.settings}
          data={props.data.snippets}
          path={{...props.path, paragraphs: props.data.id}}
          parentID={props.data.id}
          parentType={'paragraphs'}
          addItem={props.addItem}
          updateItem={props.updateItem}
          removeItem={props.removeItem} />}

      </div>
    </div>

  )
}