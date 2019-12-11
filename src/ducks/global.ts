import { ThemeState } from '@types'
import { AnyAction } from 'redux'
/*
 * action 类型
 */
export const THEME_CHANGE = 'THEME_CHANGE'
export type THEME_CHANGE = typeof THEME_CHANGE

export interface ThemeChange {
  type: THEME_CHANGE,
  theme: ThemeState
}
/*
 * action 创建函数
 */
export const themeChange = (theme: ThemeState): ThemeChange => {
  return { type: THEME_CHANGE, theme }
}

export type WithYouAction = ThemeChange

const themeState = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case THEME_CHANGE:
      return action.theme
    default: 
      return state
  }
}

export default themeState