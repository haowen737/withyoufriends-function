import * as React from 'react'
import { Transition } from 'react-transition-group'
import Axios from 'axios'

import { defaultFormStyle, transitionFormStyles, transitionFormInnerStyles, defaultFormInnerStyle } from './TransitionConfig'

interface Props {
  formIn: boolean
  onClickCancel: () => any
  user: any
  onFormSent: () => any
}

interface State {
  textareaValue: string
  isContentFilled: boolean
  formType: number
}

export default class DisscussForm extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      textareaValue: '',
      isContentFilled: false,
      formType: 0// 0：输入留言内容, 1: 载入中
    }
    this.onClickNext = this.onClickNext.bind(this)
    this.handleTextareaChange = this.handleTextareaChange.bind(this)
  }

  componentWillReceiveProps (nextProps: Props) {
    const { formIn } = nextProps
    document.body.style.overflow = formIn ? 'hidden' : 'auto'
  }

  componentWillUnmount () {
    document.body.style.overflow = 'auto'
  }

  handleTextareaChange (ev: any) {
    this.setState({ textareaValue: ev.target.value })
  }

  onClickNext () {
    const { textareaValue } = this.state
    if (textareaValue) {
      this.formTypeChange(1)
      // 加载用户名输入的form
    }
  }

  formTypeChange (type: number) {
    this.setState({ formType: -1 })
    setTimeout(() => {
      this.setState({ isContentFilled: true, formType: type })
      this.SendDisscuss()
    }, 600)
  }

  SendDisscuss () {
    const { textareaValue } = this.state
    const { user } = this.props
    Axios
      .post('/api/comment/addComment', {
        user,
        content: textareaValue
      })
      .then((res) => {
        this.props.onFormSent()
      })
      .catch((err) => {
        // this.$warning(err.msg)
      })
  }
  refreshForm () {
    this.setState({ formType: 0,  isContentFilled: false, textareaValue: '' })
  }

  renderButtonGroup = () => {
    const { onClickCancel } = this.props
    return (
      <div className="button-group">
      {
        <React.Fragment>
          <a onClick={onClickCancel}>我不想写了</a>
          <a onClick={this.onClickNext}>然后</a>
        </React.Fragment>
      }
      </div>
    )
  }

  renderContentInput = () => {
    const { textareaValue } = this.state

    return (
      <textarea
        value={textareaValue}
        onChange={this.handleTextareaChange}
        placeholder="在这里写你要说的话😘"
        autoFocus
      />
    )
  }
  
  render() {
    const { formIn } = this.props
    const { isContentFilled, formType } = this.state

    return (
      <Transition in={formIn} appear={true} timeout={300}>
      {
        (state: any) => (
          <div className="disscuss-form-container"
          style={{
            ...defaultFormStyle,
            ...transitionFormStyles[state]
          }}>
            <div className="disscuss-form">
            {
              isContentFilled ? (
                <Transition in={formType === 1} appear={true} timeout={300}>
                {
                  (innerState: any) => (
                    <div
                    className="disscuss-form-inner"
                    style={{
                      ...defaultFormInnerStyle,
                      ...transitionFormInnerStyles[innerState]
                    }}>
                      <div className="disscuss-sending">发送中...</div>
                    </div>
                  )
                }
                </Transition>
              ) : (
                <Transition in={formType === 0} appear={true} timeout={300}>
                {
                  (innerState: any) => (
                    <div
                    className="disscuss-form-inner"
                    style={{
                      ...defaultFormInnerStyle,
                      ...transitionFormInnerStyles[innerState]
                    }}>
                      {this.renderContentInput()}
                      {this.renderButtonGroup()}
                    </div>
                  )
                }
                </Transition>
              )
            }
            </div>
          </div>
        )
      }
    </Transition>
      
    )
  }
}
