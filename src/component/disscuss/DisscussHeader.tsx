import * as React from 'react'
import { Link } from 'react-router-dom'

const navList = [{
  name: '首页',
  to: '/'
}, {
  name: '博客',
  to: '/blog'
}]

const sayHi: string[] = [
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

interface State {
  greetWord: string
}

export default class DisscussHeader extends React.Component<{}, State> {
  constructor (props: {}) {
    super(props)
    this.state = {
      greetWord: ''
    }
  }

  componentDidMount () {
    this.rdSayHi()
  }

  rdSayHi () {
    const greetWord = sayHi[(Math.random() * 10).toFixed(0)]
    this.setState({ greetWord })
  }

  render() {
    const { greetWord } = this.state
    return (
      <div className="disscuss-header">
        <h1>{greetWord}</h1>
        <nav className="disscuss-nav">
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
