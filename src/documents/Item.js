import React from 'react';
import {TextInput} from 'text-exploder-two'

import styles from './list.module.css'

export default (type) => ({children, ...props}) => {
  const listChildren = React.Children.toArray(children)
  const textAccessor = (type === 'sentences' || type === 'snippets'||  type === 'points') ? 'text' : 'title'

  const updateItem = (val) => {
    props.updateItem({
      type,
      item: {[textAccessor]: val},
      id: props.id
    })
  }

  const removeItem = () => {
    props.removeItem({type, id: props.id})
  }

  const isolateItem = () => {
    props.isolateItem({type, id: props.id, parentID: props.parentID})
  }

  return (
    <div className={styles.item}>
      {!props.listOnly && <div className={styles.header}>
        <div className={styles.title}>
          <TextInput addItemHandler={updateItem} text={props.data[textAccessor]}/>
        </div>

        <div onClick={removeItem} className={styles.removeBtn}>X</div>
        { props.isolateItem &&
          <div onClick={isolateItem} className={styles.isolateBtn}> --></div>
        }
      </div>}
      {
        children && listChildren.map(el =>
          React.cloneElement(el, {parentID: props.data.id, parentType: type})
        )
      }
    </div>
  )
}
