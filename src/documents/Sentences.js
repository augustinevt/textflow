import React from 'react';

import { collectionNames } from '../constants'

import TextInput from './TextInput'
import Sentence from './Sentence'

import styles from './list.module.css'

export default (props) => {

  const addItem = (val) => {
    props.addItem({
      type: collectionNames.SENTENCES,
      item: {text: val},
      parentID: props.parentID,
      parentType: props.parentType
    })
  }

  return (
      <div className={styles.list}>
      {
        props.data.map(sentence => <Sentence
          key={sentence.id}
          settings={props.settings}
          data={sentence}
          parentID={props.data.id}
          parentType={collectionNames.POINTS}
          addItem={props.addItem}
          updateItem={props.updateItem}
          removeItem={props.removeItem}
        />)
      }

      { !props.settings.syntaxMode &&
        <div className={styles.newForm}>
          {!props.hideNew && <TextInput
            init={true}
            text={'Add sentences'}
            addItemHandler={addItem}/>}
        </div>
      }
    </div>
  )
}