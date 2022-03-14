import {useEffect, useMemo, useState} from "react";
import btc from '../images/btc.svg'
import ada from '../images/ada.svg'
import arms1 from '../images/arms1.svg'
import arms2 from '../images/arms2.svg'
import moment from 'moment'
export default function Message({date, children, fromMe, userName}) {
  const [styleArray, setStyleArray] = useState([])
  const [userPhoto, setUserPhoto] = useState(null)
  const [arms, setArms] = useState(null)
  const [randomInt] = useState(Math.floor(Math.random() * 10) + 1)



  function setMessageStyle() {
    if (fromMe) {
      setStyleArray([
        'chat__message--right',
        'chat__message-content--right',
        'chat__message-time--right'
      ])
    } else {
      setStyleArray([
        'chat__message--left',
        'chat__message-content--left',
        'chat__message-time--left'
      ])
    }
  }


  function setRandomValues() {
    const randomNumber = Math.random()

    if (randomNumber > 0.666) {
      setArms(arms1)
    } else if (randomNumber < 0.666 && randomNumber > 0.333) {
      setArms(arms2)
    }

    if (randomNumber < 0.5) {
      setUserPhoto(btc)
    } else {
      setUserPhoto(ada)
    }
  }

  useEffect(() => {
    setRandomValues()
    setMessageStyle()
  }, [])

  const formatedDate = useMemo(() => {
    return moment(date).format("hh:mm")
  }, [date])

  return (
    <div className={'chat__message ' + styleArray[0]}>
      <div className={'chat__message-time ' + styleArray[2]}>{formatedDate}</div>
      <div className={'chat__message-content ' + styleArray[1]}>
        {
          !fromMe && (
            <div className="chat__message-user">
              <img src={userPhoto} alt="user" className="chat__message-user-photo"/>
              <div className="chat__message-user-name">{userName}</div>
              {
                arms && (
                  <img src={arms} alt="arms" className="chat__message-user-photo"/>
                )
              }
              <div className="chat__message-user-number">{randomInt}</div>
            </div>
          )
        }
        {children}
      </div>
    </div>
  )
}