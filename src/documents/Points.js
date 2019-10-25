import React from 'react';

import { collectionNames } from '../constants'

import TextInput from './TextInput'
import Point from './Point'

import styles from './list.module.css'

export default (props) => {

  const addItem = (val) => props.addItem({
    type: collectionNames.POINTS,
    item: {text: val},
    parentID: props.parentID,
    parentType: props.parentType
  })

  return (
    <div className={styles.list}>
      {
        props.data.map(point => <Point
          key={point.id}
          settings={props.settings}
          data={point}
          parentID={props.data.parentID}
          parentType={collectionNames.PARAGRAPHS}
          addItem={props.addItem}
          updateItem={props.updateItem}
          removeItem={props.removeItem}
        />)
      }

      <div className={styles.newForm}>
        {!props.hideNew && <TextInput
          init={true}
          text={'Add Point'}
          addItemHandler={addItem}/>}
      </div>
    </div>
  )
}