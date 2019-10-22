import React from 'react';
import {TextInput} from 'text-exploder-two'

import Point from './Point'

import styles from './list.module.css'
export default (props) => {

  const addItem = (val) => props.addItem({
    type: 'points',
    item: {text: val},
    parentID: props.parentID,
    parentType: props.parentType
  })

  const removeItem = () => {
    props.removeItem({  type: 'points', id: props.id})
  }

  const isolateItem = () => {
    props.isolateItem({  type: 'points', id: props.id, parentID: props.parentID})
  }

  const updateItem = (val) => {
    props.updateItem({
      type: 'points',
      item: {title: val},
      id: props.id
    })
  }

  return (
      <div className={styles.list}>
          {
              props.data.map(point => <Point
                settings={props.settings}
                data={point}
                path={props.path}
                parentID={props.data.parentID}
                parentType={'paragraph'}
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