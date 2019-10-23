import React from 'react';
import TextInput from './TextInput'

import Paragraph from './Paragraph'

import styles from './list.module.css'
export default (props) => {

  const addItem = (val) => props.addItem({
    type: 'paragraphs',
    item: {title: val},
    parentID: props.parentID,
    parentType: props.parentType
  })

  return (
    <div className={styles.list}>
      {
        props.data.map(paragraph => <Paragraph
          settings={props.settings}
          data={paragraph}
          path={props.path}
          parentID={props.parentID}
          parentType={'sections'}
          addItem={props.addItem}
          isolateItem={props.isolateItem}
          updateItem={props.updateItem}
          removeItem={props.removeItem}
        />)
      }

      <div className={styles.newForm}>
        {!props.hideNew && <TextInput
          init={true}
          text={'Add Paragraph'}
          addItemHandler={addItem}/>}
      </div>

    </div>

  )
}