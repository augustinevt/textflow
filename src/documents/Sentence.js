import React from 'react';
import SentenceInput from './SentenceInput'

// import Sentences from './Sentences'

import styles from './list.module.css'
export default (props) => {

  console.log('SENTENCE PROPS', props)

  const removeItem = () => {
    props.removeItem({type: 'sentences', id: props.data.id})
  }

  const updateItem = (val) => {
    if (!props.init) {
      props.updateItem({
        type: 'sentences',
        item: {text: val},
        id: props.data.id
      })
    }
  }

  const handleSentence = (val) => {
    if (props.init) {
      props.addItem({
        type: 'sentences',
        item: {text: val},
        parentID: props.parentID,
        parentType: props.parentType
      })
    } else {
      updateItem(val)
    }

    console.log('handle sentence', val)
  }


  return (
      <span>
        <span>
          <span>
            <SentenceInput
              id={props.id ? props.data.id : null}
              init={props.init}
              mode={1}
              addItem={handleSentence}
              text={props.data ? props.data.text : '...'}/>
          </span>

          {!props.settings.syntaxMode &&
            <div onClick={removeItem} className={styles.removeBtn}>X</div>
          }

      </span>
      <span>
      </span>
    </span>
  )
}