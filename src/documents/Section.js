import React from 'react';

import { collectionNames } from '../constants'

import Paragraphs from './Paragraphs'
import TextInput from './TextInput'

import styles from './list.module.css'

export default (props) => {

  const path = {section: props.data.id}

  const removeItem = () => {
    props.removeItem({type: collectionNames.SECTIONS, id: props.data.id})
  }

  const isolateItem = () => {
    props.isolateItem(props.data.id)
  }

  const updateItem = (val) => {
    props.updateItem({
      type: collectionNames.SECTIONS,
      item: {title: val},
      id: props.data.id
    })
  }

  const data = props.selectedParagraph ?
    [props.selectedParagraph] :
    props.data.paragraphs

  return (
    <div className={styles.item}>
      {(!props.settings.syntaxMode && !props.selectedParagraph) &&
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
        parentType={collectionNames.SECTIONS}
        addItem={props.addItem}
        updateItem={props.updateItem}
        removeItem={props.removeItem}/>
      </div>
    </div>
  )
}