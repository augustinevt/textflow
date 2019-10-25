import React, {useState} from 'react';

import { collectionNames } from '../constants'

import styles from './list.module.css'
import SentenceInput from './SentenceInput'

export default ({pointID, addItem, index, activate, active}) => {

  const [clicked, setClicked ] = useState(false)

  const addSentence = (val) => {
    addItem({
      locIndex: index,
      type: collectionNames.SENTENCES,
      item: {text: val},
      parentID: pointID,
      parentType: collectionNames.POINTS
    })
    setClicked(false)
    activate({point: pointID, index})
  }

  const onClick = () => {
    setClicked(true)
    activate({point: pointID, index})
  }

  const blur = () => {
    // activate({point: null, index: null})
  }

  return <span className={styles.syntaxSentenceSpacer}>
    {clicked || active ?
      <SentenceInput
        blur={blur}
        addItem={addSentence}
        mode={1} init={true}
        active={active || clicked}/>
    :
      <div onClick={onClick} className={styles.syntaxAdd}>+ {index}</div>
    }
  </span>
}