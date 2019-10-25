import React from 'react';

import { collectionNames } from '../constants'

import TextInput from './TextInput'
import styles from './list.module.css'

export default (props) => {

  const removeItem = () => {
    props.removeItem({  type: collectionNames.SNIPPETS, id: props.data.id})
  }

  const updateItem = (val) => {
    props.updateItem({
      type: collectionNames.SNIPPETS,
      item: {text: val},
      id: props.data.id
    })
  }

  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <div className={styles.title}>
          <TextInput addItemHandler={updateItem} text={props.data.text}/>
        </div>
        <div onClick={removeItem} className={styles.removeBtn}>X</div>
      </div>
    </div>
  )
}