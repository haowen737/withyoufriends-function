import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import Axios from 'axios'

import { defaultStyle, transitionStyles } from './TransitionConfig'

const regEmail = /(@foxmail.com)|(@163.com)|(@qq.com)|(@126.com)|(@live.com)|(gmail.com)|(@yahoo.com)|(@msn.com)|(@hotmail.com)/

const NavNext = ({ onClickNext }) => {
  return (
    <a className="signin-navnext" onClick={onClickNext}>下一步</a>
  )
}

const MailInput = ({ value, onEmailChange }) => (
  <div className="mail-input-container">
    <i className="iconfont">&#xe69f;</i>
    <input
    placeholder="Email"
    value={value}
    onChange={onEmailChange}></input>
  </div>
)

export default class SignInForm extends Component {
  constructor () {
    super()
    this.state = {
      email: ''
    }
  }
  onEmailChange (ev) {
    this.setState({ email: ev.target.value })
  }
  onClickNext () {
    const { email } = this.state
    regEmail.test(email)
    ? this.postForm(email)
    : window.alert('不认识你的邮箱格式')
  }
  postForm (email) {
    Axios
      .post('/api/users/login', { email })
      .then(({ data }) => {
        const nextTick = this.props.onFormSubmited
        data.nick_name
        ? nextTick('greet', data)
        : nextTick('signUp', data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    const { signInFormIn } = this.props
    const { email } = this.state
    console.log(signInFormIn)
    return (
      <Transition in={signInFormIn} appear={true} timeout={500}>
      {(state) => (
        <div
          className="disscuss-item"
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          <MailInput value={email} onEmailChange={this.onEmailChange.bind(this)} />
          <NavNext onClickNext={this.onClickNext.bind(this)} />
        </div>
      )}
      </Transition>
    )
  }
}
