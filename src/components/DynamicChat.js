import {InfiniteScroll} from "./InfiniteScroll";
import {myNick} from "../consts";
import {SpinnerCircular} from "spinners-react";
import Message from "./Message";
import {useEffect, forwardRef} from "react";
import useMessagesApi from "../hooks/useMessagesApi";
import {useDispatch, useSelector} from "react-redux";
import {addOffset, cleanDynamicMessages} from "../redux/actionCreaters";

export const DynamicChat = forwardRef(({items}, ref) => {
  const {fetchMessages, hasMore, handleMessage, removeHandleMessage, loading} = useMessagesApi()
  const {dynamicMessagesOffset, receiveMessageCount, chatHeight} = useSelector(s => s)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(cleanDynamicMessages())
    next()
    handleMessage()
    return () => {
      removeHandleMessage()
      dispatch(cleanDynamicMessages())
    }
  }, [])

  function next() {
    fetchMessages(dynamicMessagesOffset, receiveMessageCount)
    dispatch(addOffset())
  }

  return (
    <div className="chat__messages" style={{
      overflow: 'auto',
      display: 'flex',
      height: chatHeight,
      'flex-direction': 'column-reverse'
    }}>
      <InfiniteScroll
        next={next}
        ref={ref}
        loading={loading}
        hasMore={hasMore}
        height={chatHeight}
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