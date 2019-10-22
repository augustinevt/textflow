import React from 'react';
import {TextInput} from 'text-exploder-two'

// import Sentences from './Sentences'

import styles from './list.module.css'
export default (props) => {

  const removeItem = () => {
    props.removeItem({  type: 'snippets', id: props.data.id})
  }


  const updateItem = (val) => {
    props.updateItem({
      type: 'snippets',
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
      <div>
      </div>
    </div>
  )
}