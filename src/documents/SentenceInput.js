import React, {useState, useRef, useEffect} from 'react'
import styled from 'styled-components'

const Wrapper = styled.span`
  display: ${({mode}) => mode === 2 ? 'flex' : 'inline'};
  margin-right: ${({mode}) => mode === 2 ? '0px' : '4px'};
  line-height: ${({mode}) => mode === 2 ? '50sspx' : 'normal'};
  margin-bottom: ${({mode}) => mode === 2 ? '8px' : '9px'};
  margin-right: ${({mode}) => mode === 2 ? '8px' : '0px'};
  padding: ${({mode}) => mode === 2 ? '10px' : '0px'};
  border-radius: 5px;
`

const Text = styled.span`
  text-align: left;
`

const Inter = styled.span`
  color: grey;
  white-space: normal;

  &:hover {
    color: black;
  }

  &:active, &:focus {
    color: black;
    border: none;
    outline: none;
  }
`

export default function(props) {

  const {
    text,
    blur,
    active,
    init,
    addItem,
    mode
  } = props

  const [newText, setNewText] = useState(text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (active) {
      inputRef && inputRef.current.focus()
    }
  }, [])

  const onChange = ({target: {innerHTML}}) => {
    setNewText(innerHTML)

    const sentenceEnd = RegExp(/[a-z](\.|\?|!)&nbsp;$/)

    if (sentenceEnd.test(innerHTML)) {
      addItemHandler()
      inputRef.current.innerHTML = ''
      setNewText('')
    }
  }

  const addItemHandler = () => {
    if (newText !== '' || newText !== '...') {
      addItem(newText)
    }
  }

  const onKeyPress = (e) => {

    if (e.keyCode === 13) {
      e.preventDefault()
      addItemHandler()
      if (init) {
        inputRef.current.innerHTML = ''
        setNewText('')
     }
    }
  }

  const onClick = () => {
    if (init) {
      inputRef.current.innerHTML = '&nbsp'
      setNewText('')
    }
  }

  const onBlur = (e) => {
    addItemHandler()

    if (blur && init) { // <- need to change from props
      // console.log('blur', e.target)
      blur()
    }

    if (init) {
      inputRef.current.innerHTML = text
      setNewText(text)
    }
  }

  return (
    <Wrapper mode={mode}>
      <Text mode={mode}>
        {
          <Inter
            ref={inputRef}
            init={init}
            onClick={onClick}
            contentEditable={true}
            dangerouslySetInnerHTML={{__html: (text || ' ')}}
            onKeyDown={onKeyPress}
            onBlur={onBlur}
            onInput={onChange}
          />
        }
      </Text>
    </Wrapper>
  )
}