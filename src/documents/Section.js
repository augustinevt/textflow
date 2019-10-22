import React from 'react';
import {TextInput} from 'text-exploder-two'

import styles from './list.module.css'

import Paragraphs from './Paragraphs'

export default (props) => {

  const addItem = (val) => props.addItem({
    type: 'sections',
    item: {title: val},
    parentID: props.parentID,
    parentType: props.parentType
  })

  const removeItem = () => {
    props.removeItem({  type: 'sections', id: props.data.id})
  }

  const isolateItem = () => {
    props.isolateItem(props.data.id)
  }

  const updateItem = (val) => {
    props.updateItem({
      type: 'sections',
      item: {title: val},
      id: props.data.id
    })
  }

  const data = props.selectedParagraph ?
    [props.selectedParagraph] :
    props.data.paragraphs

  const path = {section: props.data.id}

  return (
      <div className={styles.item}>
      { (!props.settings.syntaxMode && !props.selectedParagraph) &&
          <div className={styles.header}>
            <div className={styles.title}>
              <TextInput addItemHandler={updateItem} text={props.data.title}/>
            </div>

            <div onClick={removeItem} className={styles.removeBtn}>X</div>
            <div onClick={isolateItem} className={styles.isolateBtn}> --></div>


        </div>}
      <div>

        <Paragraphs
          settings={props.settings}
          data={data}
          path={path}
          parentID={props.data.id}
          isolateItem={props.isolateItem}
          parentType={'sections'}
          addItem={props.addItem}
          updateItem={props.updateItem}
          removeItem={props.removeItem} />

      </div>
    </div>
  )
}