import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const navList = [{
  name: '首页',
  to: '/'
}, {
  name: '博客',
  to: '/blog'
}]

const sayHi = [
  '有没有兴趣一起做白日梦呀',
  '我在听,有话快说',
  '说说你的路途见闻吧',
  '你想被变成青蛙吗?',
  '天哪!你真高!',
  '祝你好运。',
  '你有什么事吗?',
  '来喝杯啤酒吗?',
  '你好，旅行者',
  '每一天，都是一个祝福',
  '哈哈哈哈...'
]

export default class DisscussHeader extends Component {
  constructor() {
    super()
    this.state = {
      greetWord: ''
    }
  }
  componentDidMount() {
    this.rdSayHi()
  }
  rdSayHi() {
    this.setState({ greetWord: sayHi[parseInt(Math.random() * 10, 10)] })
  }
  render() {
    const { greetWord } = this.state
    return (
      <div className="talk-header">
        <h1>{greetWord}</h1>
        <nav className="talk-nav">
          {
            navList.map((nav, i) => (
              <Link to={nav.to} key={i}>{nav.name}</Link>
            ))
          }
        </nav>
      </div>
    )
  }
}
