import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import Axios from 'axios'

import { defaultStyle, transitionStyles } from './TransitionConfig'

const NavNext = ({ onClickNext }) => {
  return (
    <a className="signin-navnext" onClick={onClickNext}>写好了</a>
  )
}

const NameInput = ({ value, onNameChange }) => (
  <div className="mail-input-container">
    <i className="iconfont">&#xe6b8;</i>
    <input
    placeholder="昵称"
    value={value}
    onChange={onNameChange}></input>
  </div>
)

export default class SignInForm extends Component {
  constructor () {
    super()
    this.state = {
      nickName: ''
    }
  }
  onNameChange (ev) {
    this.setState({ nickName: ev.target.value })
  }
  onClickNext () {
    const { nickName } = this.state
    const { user } = this.props
    this.postForm(user.id, nickName)
  }
  postForm (id, nickName) {
    Axios
      .post('/api/users/update', { id: id, nickName })
      .then(({ data }) => {
        this.props.onFormSubmited('greet', data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  }
  render() {
    const { signUpFormIn } = this.props
    const { nickName } = this.state
    return (
      <Transition in={signUpFormIn} appear={true} timeout={500}>
        {(state) => (
          <div
            className="disscuss-item"
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            <NameInput value={nickName} onNameChange={this.onNameChange.bind(this)} />
            <NavNext onClickNext={this.onClickNext.bind(this)} />
          </div>
        )}
      </Transition>
    )
  }
}
