import {createReducer} from "@reduxjs/toolkit";
import {staticItems} from "../consts";
import {
  SET_LANG,
  ADD_STATIC_MESSAGE,
  SET_CURRENT_SECTION,
  ADD_DYNAMIC_MESSAGES,
  ADD_OFFSET,
  CLEAN_DYNAMIC_MESSAGES,
  ADD_DYNAMIC_MESSAGE,
  SET_HEIGHT, SET_WIDTH
} from "./actions";

const initialState = {
  staticMessages: staticItems,
  dynamicMessages: [],
  lang: 'RU',
  currentSection: 1,
  dynamicMessagesOffset: 0,
  receiveMessageCount: 0,
  chatHeight: 360,
  chatWidth: 360
}

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_LANG, (state, action) => {
      state.lang = action.payload
    })
    .addCase(ADD_STATIC_MESSAGE, (state, action) => {
      state.staticMessages.push(action.payload)
    })
    .addCase(SET_CURRENT_SECTION, (state, action) => {
      state.currentSection = action.payload
    })
    .addCase(ADD_DYNAMIC_MESSAGES, (state, action) => {
      // duplicate check
      const lastOldMessage = state.dynamicMessages[state.dynamicMessages.length - 1]
      const firstNewMessage = action.payload[0]
      if (lastOldMessage?.id === firstNewMessage?.id) {
        action.payload.splice(0, 1)
      }
      state.dynamicMessages.push(...action.payload)
    })
    .addCase(CLEAN_DYNAMIC_MESSAGES, (state, action) => {
      state.dynamicMessages = []
      state.dynamicMessagesOffset = 0
      state.receiveMessageCount = 0
    })
    .addCase(ADD_OFFSET, (state, action) => {
      state.dynamicMessagesOffset += 1
    })
    .addCase(ADD_DYNAMIC_MESSAGE, (state, action) => {
      state.receiveMessageCount += 1
      state.dynamicMessages = [action.payload, ...state.dynamicMessages]
    })
    .addCase(SET_HEIGHT, (state, action) => {
      state.chatHeight = action.payload
    })
    .addCase(SET_WIDTH, (state, action) => {
      state.chatWidth = action.payload
    })
})