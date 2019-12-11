import * as React from 'react'

const surfaceWidth = window.innerWidth
const surfaceHeight = window.innerHeight

export default class GreetCanvas extends React.Component {

  private ctx: any

  componentDidMount() {
    const canvas: any = document.getElementById("greetCanvas");
    this.ctx = canvas.getContext('2d')
    this.drawLine()
  }

  screenCenter = () => ({
      x: surfaceWidth / 2,
      y: surfaceHeight / 2
  })

  screenLeftCenter = () => ({
    x: 0,
    y: surfaceHeight / 2
  })

  screenRightCenter = () => ({
    x: surfaceWidth,
    y: surfaceHeight / 2
  })

  randomPosition = (lx: number, ly: number) => {
    return [ lx + Math.random() * 10, ly + Math.random() * 10 ]
  }

  drawLine = () => {
    // const center = this.screenCenter()
    const startPosition = this.screenLeftCenter()
    const endPosition = this.screenRightCenter()
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#a0f2ff9a';
    this.ctx.moveTo(startPosition.x, startPosition.y);
    this.ctx.lineTo(...this.randomPosition(startPosition.x, startPosition.y));
    this.ctx.lineTo(200,20);
    this.ctx.lineTo(endPosition.x, endPosition.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  render() {
    return (
      <canvas width={surfaceWidth} height={surfaceHeight} id="greetCanvas" />
    )
  }
}
