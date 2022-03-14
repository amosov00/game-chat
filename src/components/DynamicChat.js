import InfiniteScroll from "react-infinite-scroll-component";
import {myNick} from "../consts";
import {SpinnerCircular} from "spinners-react";
import Message from "./Message";
import {useEffect, forwardRef} from "react";
import useMessagesApi from "../hooks/useMessagesApi";
import {useDispatch, useSelector} from "react-redux";
import {addOffset, cleanDynamicMessages} from "../redux/actionCreaters";

export const DynamicChat = forwardRef(({items}, ref) => {
  const {fetchMessages, hasMore, handleMessage, removeHandleMessage} = useMessagesApi()
  const {dynamicMessagesOffset, receiveMessageCount, chatHeight} = useSelector(s => s)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(cleanDynamicMessages())
    next().then(() => {
      handleMessage()
    })
    return () => {
      removeHandleMessage()
      dispatch(cleanDynamicMessages())
    }
  }, [])

  function next() {
    return new Promise((resolve) => {
      fetchMessages(dynamicMessagesOffset, receiveMessageCount).then(() => {
        resolve()
      })
      dispatch(addOffset())
    })
  }

  return (
    <div className="chat__messages" style={{
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column-reverse',
      height: chatHeight
    }}>
      <InfiniteScroll
        next={next}
        ref={ref}
        dataLength={items.length}
        hasMore={hasMore}
        inverse={true}
        loader={<SpinnerCircular style={{margin: '10px auto'}}/>}
        height={chatHeight}
        style={{display: 'flex', flexDirection: 'column-reverse'}}
      >
        {items.map((i) => (
          <Message
            fromMe={myNick === i.from}
            userName={i.from}
            date={i.createdAt}
            key={i.id}
          >
            {i.text}
          </Message>
        ))}
      </InfiniteScroll>
    </div>
  )
})