import React from 'react';
import TextInput from './TextInput'

import styles from './list.module.css'

import Sentence from './Sentence'


export default (props) => {

  const addItem = (val) => {
    props.addItem({
      type: 'sentences',
      item: {text: val},
      parentID: props.parentID,
      parentType: props.parentType
    })
  }

  return (
      <div className={styles.list}>
      {
        props.data.map(sentence => <Sentence
          settings={props.settings}
          data={sentence}
          parentID={props.data.id}
          parentType={'points'}
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