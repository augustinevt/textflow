import React from 'react';
import TextInput from './TextInput'

import Sentences from './Sentences'

import styles from './list.module.css'
export default (props) => {

  const addItem = (val) => props.addItem({
    type: 'points',
    item: {title: val},
    parentID: props.parentID,
    parentType: props.parentType
  })

  const removeItem = () => {
    props.removeItem({  type: 'points', id: props.data.id})
  }


  const updateItem = (val) => {
    props.updateItem({
      type: 'points',
      item: {text: val},
      id: props.data.id
    })
  }

  return (
      <div className={styles.item}>
      { !props.settings.syntaxMode &&
        <div className={styles.header}>
          <div className={styles.title}>
            <TextInput addItemHandler={updateItem} text={props.data.text}/>
          </div>

          <div onClick={removeItem} className={styles.removeBtn}>X</div>

      </div>}
      <div>

        { (props.settings.showSentences || props.settings.syntaxMode) &&
          <Sentences
            settings={props.settings}
            data={props.data.sentences}
            path={{...props.path, points: props.data.id}}
            parentID={props.data.id}
            parentType={'points'}
            addItem={props.addItem}
            updateItem={props.updateItem}
            removeItem={props.removeItem} />
        }

      </div>
    </div>
  )
}