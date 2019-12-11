import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import DisscussHeader from './DisscussHeader'
import DisscussForm from './DisscussForm'
import DisscussList from './DisscussList'

import { themeChange, WithYouAction } from '../../ducks/global'
import { BlogTheme } from '../../Hero.service'
import { ThemeState, StoreState } from '@types'

import './Disscuss.css'

interface Props {
  themeChange: any
  user: any
  history: any
}
  
interface State {
  formIn: boolean
  replyTo: any
}

interface Disscuss {
  disscussList: DisscussList | null
  disscussForm: DisscussForm | null
}

class Disscuss extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      formIn: false,
      replyTo: null
    }
    this.disscussList = null
    this.disscussForm = null
    this.onClickAdd = this.onClickAdd.bind(this)
    this.onFormSent = this.onFormSent.bind(this)
    this.onClickCancel = this.onClickCancel.bind(this)
  }
  componentDidMount () {
    this.props.themeChange(BlogTheme)
  }
  onClickAdd () {
    const { user, history } = this.props
    user.id
      ? this.setState({ formIn: true })
      : history.push('/signin')
  }
  onClickCancel () {
    this.setState({ formIn: false })
  }
  onFormSent () {
    this.disscussList && this.disscussList.getDisscuss()
    this.setState({ formIn: false })
    setTimeout(() => {
      this.disscussForm && this.disscussForm.refreshForm()
    }, 2000)
  }

  renderDisscussAdd = () => {
    const { formIn } = this.state

    return (
      <a
        style={formIn ? {transform: `translate3d(0, 100px, 0)`} : {}}
        className="disscuss-add"
        onClick={this.onClickAdd}>留言</a>
    )
  }
  render() {
    const { formIn } = this.state
    const { user, history } = this.props
    return (
      <div className="disscuss-layout">
        <DisscussHeader />
        {this.renderDisscussAdd()}
        <DisscussForm
          user={user}
          formIn={formIn}
          onFormSent={this.onFormSent}
          onClickCancel={this.onClickCancel}
          ref={form => {this.disscussForm = form}} />
        <DisscussList
          user={user}
          history={history}
          ref={list => {this.disscussList = list}} />
      </div>
    )
  }
}

const mapStateToProps = (state: StoreState) => ({
  theme: state.themeState,
  user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch<WithYouAction>) => ({
  themeChange: (theme: ThemeState) => { dispatch(themeChange(theme)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Disscuss)
