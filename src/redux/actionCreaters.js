import { createAction } from '@reduxjs/toolkit'
import {
  ADD_STATIC_MESSAGE,
  SET_CURRENT_SECTION,
  SET_LANG,
  ADD_DYNAMIC_MESSAGES,
  ADD_OFFSET,
  CLEAN_DYNAMIC_MESSAGES,
  ADD_DYNAMIC_MESSAGE, SET_HEIGHT, SET_WIDTH,
} from "./actions";

export const setLang = createAction(SET_LANG)
export const addStaticMessage = createAction(ADD_STATIC_MESSAGE)
export const setCurrentSection = createAction(SET_CURRENT_SECTION)
export const addDynamicMessages =  createAction(ADD_DYNAMIC_MESSAGES)
export const addOffset = createAction(ADD_OFFSET)
export const cleanDynamicMessages = createAction(CLEAN_DYNAMIC_MESSAGES)
export const addDynamicMessage = createAction(ADD_DYNAMIC_MESSAGE)
export const setHeight = createAction(SET_HEIGHT)
export const setWidth = createAction(SET_WIDTH)