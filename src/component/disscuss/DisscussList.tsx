import * as React from 'react'
import Axios from 'axios'
import { Transition } from 'react-transition-group'

import { defaultStyle, transitionStyles } from './TransitionConfig'
import DisscussReply from './DisscussReply'

import LoadingCircle from '../../widgets/loadingCircle'

interface DisscussItemProps {
  list: any[]
  item: any
  itemIndex: any
  onClickReply: any
}

interface DisscussItemChildPorps {
  list: any[]
  children: any
  onClickReply: any
  itemIndex: any
}

interface DisscussItemChildUsersProps {
  child: any
}

interface Props {
  user: any
  history: any
}

interface State {
  list: any[]
  disscussList: any[]
  itemIn: any
  replyTo: any
  item: any
}

const DisscussItem = (props: DisscussItemProps): JSX.Element => {
  const { list, item, itemIndex, onClickReply } = props
  return (
    <Transition in={true} appear={true} timeout={(50 + (50 * itemIndex))}>
      {(state: any) => (
        <li
        className="disscuss-item"
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
          ...{transformDuration: `${itemIndex * 10 + 100}ms`}
        }}>
          <p className="disscuss-name">@{item.nick_name}</p>
          <h2 className="disscuss-content">{item.content}</h2>
          <a className="discuss-reply" onClick={() => onClickReply(list, item, itemIndex)}>回复</a>
        </li>
      )}
    </Transition>
  )
}

const DisscussItemChild = (props: DisscussItemChildPorps): JSX.Element => {
  const { list, children, onClickReply, itemIndex } = props
  return (
    <ul className="disscuss-children">
    {
      children.map((child: any, index: number) => (
        <Transition key={index} in={true} appear={true} timeout={(400 + (50 * index))}>
        {(state: any) => (
          <li
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
            ...{transformDuration: `${index * 10 + 100}ms`}
          }}>
            <DisscussItemChildUsers child={child} />
            <a className="discuss-reply" onClick={() => onClickReply(list, child, itemIndex)}>回复</a>
          </li>
        )}
        </Transition>
      ))
    }
    </ul>
  )
}

const DisscussItemChildUsers = (props: DisscussItemChildUsersProps): JSX.Element => {
  const { child } = props
  return (
    <React.Fragment>
      <span className="disscuss-children-name">{child.nick_name}</span>
      {
        (child.nick_name !== child.reply_to_name && child.reply_to)
        && (
          <React.Fragment>
            <span className="disscuss-children-reply">&nbsp;回复了&nbsp;</span>
            <span className="disscuss-children-name">{child.reply_to_name}</span>
          </React.Fragment>
        )
      }
      <span className="disscuss-children-content">{child.content}</span>
    </React.Fragment>
  )
}

const ListEmpty: React.StatelessComponent<{}> = () => (
  <div className="list-empty-container">
    <LoadingCircle />
  </div>
)

export default class DisscussList extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      list: [],
      disscussList: [],
      itemIn: null,
      replyTo: null,
      item: null
    }
    this.onClickShowReply = this.onClickShowReply.bind(this)
    this.onClickReplyCancel = this.onClickReplyCancel.bind(this)
    this.onReplySent = this.onReplySent.bind(this)
  }

  componentDidMount () {
    this.getDisscuss()
  }

  getDisscuss () {
    Axios
      .get('/api/comment/getComments')
      .then(({ data }) => {
        this.setState({ list: data.reverse() })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onClickShowReply (list: any[], item: any, itemIndex: any, child: any) {
    const { user, history } = this.props
    !user.id && history.push('/signin')
    list[itemIndex].showReply = true
    this.setState({ disscussList: list, item, replyTo: child })
  }

  onClickReplyCancel (list: any, item: any, itemIndex: any) {
    list[itemIndex].showReply = false
    this.setState({ disscussList: list })
  }

  onReplySent () {
    this.getDisscuss()
  }
  
  render() {
    const { list, replyTo } = this.state
    const { user } = this.props
    return (
      <ul className="discuss-list">
      {
        list.length
          ? list.map((item: any, i: any, innerlist: any) => (
            <React.Fragment key={i}>
              <DisscussItem
              list={innerlist}
              item={item}
              onClickReply={this.onClickShowReply}
              itemIndex={i} />
              {
                item.children.length
                ? <DisscussItemChild
                    list={innerlist}
                    children={item.children}
                    itemIndex={i}
                    onClickReply={this.onClickShowReply} />
                : null
              }
              {
                item.showReply
                && <DisscussReply
                  user={user}
                  list={innerlist}
                  item={item}
                  itemIndex={i}
                  replyTo={replyTo}
                  onClickCancel={this.onClickReplyCancel}
                  onReplySent={this.onReplySent} />
              }
            </React.Fragment>
          ))
        : <ListEmpty />
      }
      </ul>
    )
  }
}
