import React from 'react';

import { collectionNames } from '../constants'

import TextInput from './TextInput'
import Snippet from './Snippet'

import styles from './list.module.css'

export default (props) => {

  const addItem = (val) => props.addItem({
    type: collectionNames.SNIPPETS,
    item: {text: val},
    parentID: props.parentID,
    parentType: props.parentType
  })

  return (
      <div className={styles.list}>
      {
        props.data.map(snippet => <Snippet
          key={snippet.id}
          data={snippet}
          parentID={props.data.parentID}
          parentType={collectionNames.SNIPPETS}
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