import React, {useState} from 'react';
import styles from './list.module.css'
import SentenceInput from './SentenceInput'

export default ({pointID, addItem, index}) => {

  const [clicked, setClicked ] = useState(false)

  return <span className={styles.syntaxSentenceSpacer}>
    {clicked ?
      SentenceInput
      :
      <div onClick={() => setClicked(true)} className={styles.syntaxAdd}>+ {index}</div>
    }
  </span>
}