import * as React from 'react'
import Axios from 'axios'

interface Props {
  replyTo: any
  user: any
  item: any
  onReplySent: () => any
  onClickCancel: any
  list: any
  itemIndex: any
}

interface State {
  replyValue: string
}

export default class DisscussReply extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      replyValue: ''
    }
    this.onReadySendReply = this.onReadySendReply.bind(this)
    this.handleReplyChange = this.handleReplyChange.bind(this)
  }

  handleReplyChange (ev: any) {
    this.setState({ replyValue: ev.target.value })
  }

  onReadySendReply () {
    const { replyValue } = this.state
    const { replyTo, user, item } = this.props
    console.log(replyTo, user, item)
    if (!replyValue) {
      window.alert('呸！没有输入提交什么表单')
      return
    }
    if (!user || !user.nick_name) {
      window.alert('need login')
      return
    }
    this.send({
      content: replyValue,
      parentId: replyTo ? replyTo.parent_id : item.id,
      replyToUser: replyTo ? replyTo.user_id : null,
      userId: user.id
    })
  }

  send (data: any) {
    Axios
    .post('/api/comment/reply', data)
    .then((res) => {
      this.props.onReplySent()
    })
    .catch((err) => {
      // this.$warning(err.msg)
    })
  }

  render() {
    const { replyValue } = this.state
    const { item, onClickCancel, list, itemIndex, replyTo } = this.props
    console.log(replyTo)
    return (
      <div className="replydialog-container">
        <input
        value={replyValue}
        onChange={this.handleReplyChange}
        placeholder={`${replyTo ? '@' + replyTo.nick_name : '添加公开回复'}`}
        autoFocus />
        <div className="replydialog-btn-group">
          <a className="replydialog-cancel" onClick={() => onClickCancel(list, item, itemIndex)}>取消</a>
          <a className="replydialog-cancel" onClick={this.onReadySendReply}>提交</a>
        </div>
      </div>
    )
  }
}
