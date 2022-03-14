import collapse from '../images/collapse.svg'
import expand from '../images/expand.svg'
import {chatMenu} from "../consts";
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setLang, setCurrentSection} from "../redux/actionCreaters";

const selectedStyles = {
  color: 'white',
  borderBottom: '2px solid #23B838',
  paddingTop: '3px'
}

export default function ChatHead({onButtonsClick}) {
  const menu = useRef()
  const dispatch = useDispatch()
  const {currentSection} = useSelector(s => s)

  function scrollMenu() {
    menu.current.scroll({
      top: 0,
      left: 1000,
      behavior: 'smooth'
    });
  }

  function menuBtnClick(id) {
    dispatch(setCurrentSection(id))
  }

  function onChangeLang(value) {
    dispatch(setLang(value))
  }

  return (
    <div className="chat__head">
      <div className="chat__menu-wrapper">
        <div className="chat__menu" ref={menu}>
          {chatMenu.map(({name, id}) => {
            return (
              <button
                onClick={() => menuBtnClick(id)}
                key={id}
                style={id === currentSection ? selectedStyles : {}}
              >
                {name}
              </button>
            )
          })}
          <div style={{minWidth: 20}}/>
        </div>
        <span onClick={scrollMenu}/>
      </div>
      <div className="chat__up-buttons" >
        <select id="lang" style={{width: 'auto'}} onChange={(e) => onChangeLang(e.target.value)}>
          <option value="RU">RU</option>
          <option value="EN">EN</option>
          <option value="ZHO">ZHO</option>
        </select>
        <img src={expand} alt="expand" onClick={() => onButtonsClick(true)}/>
        <img src={collapse} alt="collapse" onClick={() => onButtonsClick(false)}/>
      </div>
    </div>
  )
}