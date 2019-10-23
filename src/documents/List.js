// import React from 'react';
// // import {TextInput} from 'text-exploder-two'
//
// import styles from './list.module.css'
// export default (type) => ({children, ...props}) => {
//   const listChildren = React.Children.toArray(children)
//   const textAccessor = (type === 'sentences' || type === 'snippets'||  type === 'points') ? 'text' : 'title'
//
//   const addItem = (val) => props.addItem({
//     type,
//     item: {[textAccessor]: val},
//     parentID: props.parentID,
//     parentType: props.parentType
//   })
//
//   return (
//     <div className={styles.list}>
//       <div>
//         {children && listChildren.map(el =>
//           React.cloneElement(el, {parentID: props.parentID, parentType: type}))}
//       </div>
//       <div className={styles.newForm}>
//         {!props.hideNew && <TextInput
//           init={true}
//           text={`Add ${type}`}
//           addItemHandler={addItem}/>}
//       </div>
//     </div>
//   )
// }



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
