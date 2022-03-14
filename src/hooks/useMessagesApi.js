import axios from 'axios'
import {messageLimit, myNick} from "../consts";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {addDynamicMessages, addDynamicMessage} from "../redux/actionCreaters";
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
const { io } = require("socket.io-client");

const socket = io("wss://test-chat-backend-hwads.ondigitalocean.app", {
  transports: ["websocket"],
  upgrade: false,
});


export default function useMessagesApi() {
  const dispatch = useDispatch()
  const [hasMore, setHasMore] = useState(true)

  function fetchMessages (offset = 0, socketReceiveMessages) {
    return new Promise((resolve, reject) => {
      axios.get('https://test-chat-backend-hwads.ondigitalocean.app/api/messages', {
        params: {
          limit: messageLimit,
          skip: messageLimit * offset + socketReceiveMessages
        }
      }).then(({data}) => {
        if (data.length === 0) {
          setHasMore(false)
          resolve()
          return
        }
        dispatch(addDynamicMessages(data))
        resolve()
      }).catch(() => {
        toast.error('Ошибка запроса')
        reject()
      })
    })
  }

  function sendMessage(text) {
    const date = new Date().toISOString()
    socket.emit('message', {
      from: myNick,
      text
    }, (err) => {
      if (err) {
        toast.error('Ошибка отправки сообщения')
      }
    });
    dispatch(addDynamicMessage({
      id: uuidv4(),
      text,
      date,
      from: myNick
    }))
  }


  const listener = (data) => dispatch(addDynamicMessage(data))

  function handleMessage() {
    socket.on('message', listener)
  }
  function removeHandleMessage() {
    socket.removeListener('message', listener)
  }
  return {fetchMessages, hasMore, sendMessage, handleMessage, removeHandleMessage}
}