import {InfiniteScroll} from "./InfiniteScroll";
import {myNick} from "../consts";
import {SpinnerCircular} from "spinners-react";
import Message from "./Message";
import {forwardRef} from "react";
import {useSelector} from "react-redux";

export const StaticChat = forwardRef(({items}, ref) => {
  const {chatHeight} = useSelector(s => s)
  return (
    <div className="chat__messages" style={{
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column-reverse',
      height: chatHeight
    }}>
      <InfiniteScroll
        next={() => {}}
        ref={ref}
        hasMore={false}
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
        )).reverse()}
      </InfiniteScroll>
    </div>
  )
})