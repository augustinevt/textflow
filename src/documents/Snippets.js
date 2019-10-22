import React from 'react';
import {TextInput} from 'text-exploder-two'

import styles from './list.module.css'

import Snippet from './Snippet'


export default (props) => {

  const addItem = (val) => props.addItem({
    type: 'snippets',
    item: {text: val},
    parentID: props.parentID,
    parentType: props.parentType
  })

  const removeItem = () => {
    props.removeItem({  type: 'snippets', id: props.id})
  }

  const isolateItem = () => {
    props.isolateItem({  type: 'snippets', id: props.id, parentID: props.parentID})
  }

  const updateItem = (val) => {
    props.updateItem({
      type: '',
      item: {title: val},
      id: props.id
    })
  }


  return (
      <div className={styles.list}>
      {
        props.data.map(snippet => <Snippet
          data={snippet}
          parentID={props.data.parentID}
          parentType={'snippets'}
          addItem={props.addItem}
          updateItem={props.updateItem}
          removeItem={props.removeItem}
        />)
      }


      <div className={styles.newForm}>
        {!props.hideNew && <TextInput
          init={true}
          text={'Add Snippet'}
          addItemHandler={addItem}/>}
      </div>
    </div>
  )
}