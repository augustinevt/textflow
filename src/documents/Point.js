import React from 'react';

import { collectionNames } from '../constants'

import styles from './list.module.css'

import TextInput from './TextInput'
import Sentences from './Sentences'

export default (props) => {

  const removeItem = () => {
    props.removeItem({type: collectionNames.POINTS, id: props.data.id})
  }

  const updateItem = (val) => {
    props.updateItem({
      type: collectionNames.POINTS,
      item: {text: val},
      id: props.data.id
    })
  }

  return (
      <div className={styles.item}>
        {!props.settings.syntaxMode &&
          <div className={styles.header}>
            <div className={styles.title}>
              <TextInput addItemHandler={updateItem} text={props.data.text}/>
            </div>
            <div onClick={removeItem} className={styles.removeBtn}>X</div>
          </div>
        }
      <div>
        {(props.settings.showSentences || props.settings.syntaxMode) &&
          <Sentences
            settings={props.settings}
            data={props.data.sentences}
            path={{...props.path, points: props.data.id}}
            parentID={props.data.id}
            parentType={collectionNames.POINTS}
            addItem={props.addItem}
            updateItem={props.updateItem}
            removeItem={props.removeItem} />
        }
      </div>
    </div>
  )
}