import React, { Component } from 'react'
import './particel.css'

export default class ParticelCanvas extends Component {
  componentDidMount () {
    let cvs = document.getElementById('canvas')
    let ctx = cvs.getContext('2d')
    let rgb = '0'
    let extendDis = 5
    let lineDis = 100

    lineDis *= lineDis
    cvs.width = window.innerWidth
    cvs.height = window.innerHeight

    let warea = { x: null, y: null }

    // window.onmousemove = function (e) {
    //   e = e || window.event

    //   warea.x = e.clientX - cvs.offsetLeft
    //   warea.y = e.clientY - cvs.offsetTop
    // }

    // window.onmouseout = function (e) {
    //   warea.x = null
    //   warea.y = null
    // }

    let dots = []
    for (let i = 0; i < 100; i++) {
      let x = Math.random() * (cvs.width + 2 * extendDis) - extendDis
      let y = Math.random() * (cvs.height + 2 * extendDis) - extendDis
      let xa = (Math.random() * 2 - 1) / 1.5
      let ya = (Math.random() * 2 - 1) / 1.5

      dots.push({ x, y, xa, ya })
    }

    setTimeout(() => { animate() }, 100)

    function animate () {
      ctx.clearRect(0, 0, cvs.width, cvs.height)

      bubDrawLine([warea].concat(dots))

      RAF(animate)
    }

    function bubDrawLine(ndots) {
      var ndot
      dots.forEach(function(dot) {
        move(dot)
        // 循环比对粒子间的距离
        for (var i = 0; i < ndots.length; i++) {
          ndot = ndots[i]
          if (dot === ndot || ndot.x === null || ndot.y === null) continue
          var xc = dot.x - ndot.x
          var yc = dot.y - ndot.y
          // 如果x轴距离或y轴距离大于max,则不计算粒子距离
          if (xc > ndot.max || yc > lineDis) continue
          // 两个粒子之间的距离
          var dis = xc * xc + yc * yc
          // 如果粒子距离超过max,则不做处理
          if (dis > lineDis) continue
          // 距离比
          var ratio
          // 如果是鼠标，则让粒子向鼠标的位置移动
          if (ndot === warea && dis < 20000) {
            dot.x -= xc * 0.01
            dot.y -= yc * 0.01
          }
          // 计算距离比
          ratio = (lineDis - dis) / lineDis
          // 粒子间连线
          ctx.beginPath()
          ctx.lineWidth = ratio / 2
          ctx.strokeStyle = 'rgba(' + rgb + ', ' + rgb + ', ' + rgb + ', .5)'
          ctx.moveTo(dot.x, dot.y)
          ctx.lineTo(ndot.x, ndot.y)
          ctx.stroke()
        }
        // 将已经计算过的粒子从数组中删除
        ndots.splice(ndots.indexOf(dot), 1)
      })
    }

    function move(dot) {
      dot.x += dot.xa
      dot.y += dot.ya
      // 遇到边界将加速度反向
      dot.xa *= (dot.x > (cvs.width + extendDis) || dot.x < -extendDis) ? -1 : 1
      dot.ya *= (dot.y > (cvs.height + extendDis) || dot.y < -extendDis) ? -1 : 1
      // 绘制点
      ctx.fillStyle = 'rgba(' + rgb + ', ' + rgb + ', ' + rgb + ', 0.5)'
      ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1)
    }
    var RAF = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    })()
  }
  render() {
    return (
      <canvas id="canvas" style={{filter: 'blur(2px)'}}></canvas>
    )
  }
}
