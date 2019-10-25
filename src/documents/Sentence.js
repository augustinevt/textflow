import React from 'react';

import { collectionNames } from '../constants'

import SentenceInput from './SentenceInput'
import styles from './list.module.css'

export default (props) => {

  const removeItem = () => {
    props.removeItem({type: collectionNames.SENTENCES, id: props.data.id})
  }

  const updateItem = (val) => {
    if (!props.init) {
      props.updateItem({
        type: collectionNames.SENTENCES,
        item: {text: val},
        id: props.data.id
      })
    }
  }

  const handleSentence = (val) => {
    if (props.init) {
      props.addItem({
        type: collectionNames.SENTENCES,
        item: {text: val},
        parentID: props.parentID,
        parentType: props.parentType
      })
    } else {
      updateItem(val)
    }
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
              text={props.data ? props.data.text : ''}/>
          </span>

          {!props.settings.syntaxMode &&
            <div onClick={removeItem} className={styles.removeBtn}>X</div>
          }

      </span>
    </span>
  )
}