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



// <div className={styles.item}>
//   <div className={styles.title}>
//     <div onClick={() => removeItem(item.id)} className={styles.removeBtn}>X</div>
//     <TextInput addItemHandler={(val) => updateItem(val, item.id)} text={item.text}/>
//   </div>
//   <div>
//     { children && React.cloneElement(children, {...children.props, parentID: item.id}) }
//   </div>
// </div>))
// }
// <TextInput init={true} text='add item' addItemHandler={(val) => addItem(val, parentID)}/>
//</div>


// <div className={styles.setences}>
//   { true &&
//     <List
//       addItem={() => {}}
//       removeItem={() => {}}
//       updateItem={() => {}}
//       data={
//         points[poiID].sentences
//           .map(id => sentences[id])
//       }/>
//   }
// </div>
