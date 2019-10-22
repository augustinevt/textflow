import React, {useState, useRef} from 'react'
import styled from 'styled-components'

const Inter = styled.span`
  /* color: ${({init}) => init ? 'black' : 'grey'}; */
  color: grey;
  min-width: 34px;
  min-height: 34px;

  &:hover {
    color: black;
  }

  &:active, &:focus {
    color: black;
    border: none;
    outline: none;
    border-bottom: solid;
  }
`

export default function({text, active, id, addItemHandler, edit, init }) {

  const [newText, setNewText] = useState(text)
  const inputRef = useRef(null)

  const onChange = ({target: {innerHTML}}) => {
    setNewText(innerHTML)
  }

  const changeHandler = () => {
    if (newText !== '') {
      addItemHandler(newText)
    }
  }

  const onKeyPress = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault()
      changeHandler()
      if (init) {
        inputRef.current.innerHTML = ''
        setNewText('')
      }
    }
  }

  const onBlur = (e) => {
    changeHandler()
    if (init) {
      inputRef.current.innerHTML = text
      setNewText(text)
    }
  }

  const onClick = () => {
    if (init) {
      inputRef.current.innerHTML = '&nbsp'
      setNewText('')
    }
  }

  return (
      <Inter
        ref={inputRef}
        onClick={onClick}
        active={active}
        contentEditable={true}
        dangerouslySetInnerHTML={{__html: text}}
        onBlur={onBlur}
        onKeyDown={onKeyPress}
        onInput={onChange}
      />

  )
}
