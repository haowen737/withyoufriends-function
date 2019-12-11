export interface ThemeState {
  name: string,
  theme?: string,
  color: string,
  btnTheme?: string,
  btnColor?: string,
  headerTheme?: string,
  musicPlayerBg?: string,
  musicPlayerColor?: string,
  poem: string[]
}

export interface StoreState {
  themeState: ThemeState,
  apis?: any,
  user?: any
}

// export interface Swagger {}
