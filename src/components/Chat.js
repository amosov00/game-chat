import ChatHead from "./ChatHead";
import emoji from '../images/emoji.svg'
import {useEffect, useState, useCallback, useRef, useMemo} from "react";
import {StaticChat} from "./StaticChat";
import {myNick} from "../consts";
import { v4 as uuidv4 } from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {addStaticMessage, setHeight, setWidth} from "../redux/actionCreaters";
import {DynamicChat} from "./DynamicChat";
import useMessagesApi from "../hooks/useMessagesApi";

export function Chat() {
  const [inputValue, setInputValue] = useState('')
  const [initialY, setInitialY] = useState(null)
  const [initialX, setInitialX] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const {
    lang,
    staticMessages,
    currentSection,
    dynamicMessages,
    chatHeight,
    chatWidth
  } = useSelector(s => s)
  const {sendMessage} = useMessagesApi()
  const dispatch = useDispatch()
  const chatRef = useRef()



  const enterListener = useCallback((e) => {
    if ((e.code === "Enter" || e.code === "NumpadEnter") && inputValue && lang === 'RU') {
      e.preventDefault();
      setInputValue('')
      if (currentSection === 1) {
        dispatch(addStaticMessage(
          {
            id: uuidv4(),
            from: myNick,
            text: inputValue,
            createdAt: new Date().toISOString()
          }
        ))
      } else if (currentSection === 2) {
        sendMessage(inputValue)
      }
      chatRef.current.scroll({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [inputValue, staticMessages]);



  useEffect(() => {
    window.addEventListener("keydown", enterListener)
    return () => {
      window.removeEventListener("keydown", enterListener)
    }
  }, [enterListener])


  function switchChats(id) {
    if (lang === 'RU') {
      switch (id) {
        case 1: {
          return <StaticChat items={staticMessages} ref={chatRef}/>
        }
        case 2: {
          return <DynamicChat items={dynamicMessages} ref={chatRef}/>
        }
        default: {
          return <div className="chat__messages" style={{height: chatHeight}}/>
        }
      }
    } else {
      return <div className="chat__messages" style={{height: chatHeight}}/>
    }
  }


  function onMouseMoveY(e) {
    if (initialY === null) {
      setInitialY(e.clientY)
    } else {
      dispatch(setHeight(chatHeight + initialY - e.clientY))
    }
  }

  function onMouseMoveX(e) {
    if (initialX === null) {
      setInitialX(e.clientX)
    } else {
      const width = chatWidth + e.clientX - initialX
      if (width >= 360) {
        dispatch(setWidth(width))
      }
    }
  }

  useEffect(() => {
    if (initialY !== null) {
      window.addEventListener('mousemove', onMouseMoveY)
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMoveY)
    }
  }, [initialY])

  useEffect(() => {
    if (initialX !== null) {
      window.addEventListener('mousemove', onMouseMoveX)
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMoveX)
    }
  }, [initialX])


  function topKeyUp(e) {
    if (e.target.className === 'chat-first-wrapper') {
      setInitialY(null)
    }
  }
  function topKeyDown(e) {
    if (e.target.className === 'chat-first-wrapper') {
      setInitialY(e.clientY)
    }
  }
  function rightKeyUp(e) {
    if (e.target.className === 'chat-second-wrapper') {
      setInitialX(null)
    }
  }
  function rightKeyDown(e) {
    if (e.target.className === 'chat-second-wrapper') {
      setInitialX(e.clientX)
    }
  }
  const chatStyles = useMemo(() => {
    return {
      width: chatWidth,
      userSelect: initialX !== null || initialY!== null ? 'none' : 'auto'
    }
  }, [initialX, initialY, chatWidth])




  return (
    <div className="chat-first-wrapper" onMouseUp={topKeyUp} onMouseDown={topKeyDown}>
      <div className="chat-second-wrapper" onMouseUp={rightKeyUp} onMouseDown={rightKeyDown}>
        <div
          className="chat"
          style={chatStyles}
        >
          <ChatHead onButtonsClick={setIsChatOpen}/>
          {
            isChatOpen && switchChats(currentSection)
          }
          {
            isChatOpen && (
              <div className="chat__input-group">
                <input
                  type="text"
                  className="chat__input"
                  placeholder="Напишите сообщение..."
                  value={inputValue}
                  onInput={(e) => setInputValue(e.target.value)}
                />
                <img src={emoji} alt="smile" className="chat__smile"/>
              </div>
            )
          }
        </div>
      </div>
    </div>
    )
}