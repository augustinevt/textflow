import React, {useState} from 'react';
import styles from './list.module.css'
import SentenceInput from './SentenceInput'

export default ({pointID, addItem, index}) => {

  const addSentence = (val) => {
    addItem({
      locIndex: index,
      type: 'sentences',
      item: {text: val},
      parentID: pointID,
      parentType: 'points'
    })
  }


  const [clicked, setClicked ] = useState(false)

  return <span className={styles.syntaxSentenceSpacer}>
    {clicked ?
      <SentenceInput addItem={addSentence} mode={1} init={true} active={true}/>
      :
      <div onClick={() => setClicked(true)} className={styles.syntaxAdd}>+ {index}</div>
    }
  </span>
}