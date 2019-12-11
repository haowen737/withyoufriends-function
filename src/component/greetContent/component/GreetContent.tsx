import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ThemeState } from '@types'

import useTypeWritter from 'react-typewriter-hook'

import style from '../style'

export interface Props {
  theme: ThemeState
}

interface TypeWritterProps {
  name: string
}

function TypeWritterWrapper({ name }: TypeWritterProps) {
  const word = useTypeWritter(name)

  return (
    <span className="type-writter">{word}</span>
  )
}

export default class GreetContent extends React.Component<Props, any> {
  // private ereaseSelf: any
  // private penSelf: any

  constructor (props: Props) {
    super(props)
    this.state = {
    }
  }

  renderTypeWritter(): JSX.Element {
    const { color, name } = this.props.theme
    return (
      <p className="type-writter-wrapper">
        Make it
        <br className="hero-title-br"/>
        <span>&nbsp;</span>
        <TypeWritterWrapper name={name || ''} />
      </p>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className={style}>
          {this.renderTypeWritter()}
          <p className="heroSummary">Code · Design · Create · Capture · Inspire</p>
        </div>
        <br />
      </React.Fragment>
    )
  }
}
