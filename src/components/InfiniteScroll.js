import {SpinnerCircular} from "spinners-react";
import {forwardRef} from 'react'

export const InfiniteScroll = forwardRef(({children, height, loading, hasMore, next}, ref) => {

  function scroll(e) {
    const localLoadLine = e.target.scrollHeight - height - 60
    const localCurrentPosition = -e.target.scrollTop
    if (localLoadLine <= localCurrentPosition && !loading && hasMore) {
      next()
    }
  }
  return (
    <div className="infinite-scroll" onScroll={scroll} ref={ref}>
      {children}
      {hasMore && <SpinnerCircular style={{margin: '10px auto'}}/>}
    </div>
  )
})