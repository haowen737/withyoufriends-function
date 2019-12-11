const poem1 = [
  'life is only as beautiful... as you make it',
  'there is something beautiful about the past',
  'and about the way it haunts us.',
  'The way we pass through the moments',
  'like walking through the doors. ',
  'Our memories are ghost, ',
  'and they will always remind us of all the things we no longer have.',
  'thanks for the adventure. now go have a new one!'
]

const poem2 = [
  'All of my friends are settling down ',
  'They\'re only kids but they\'re married now ',
  'Let\'s follow the lights, follow the crowd ',
  'Baby we gotta get out ',
  'Let\'s get outta this town ',
  'I want an ocean view, somewhere ',
  'As long as I\'m next to you, I don\'t care ',
  'I don\'t wanna live my life in circles ',
  'I just wanna find an empty road ',
  'Let\'s get away form here, let\'s go ',
  'Nothing ever changes here, I know ',
  'Another day, another year, same old ',
  'I don\'t wanna live my life in circles ',
  'I wanna find an empty road '
]
const poem3 = [
  '喜欢一张白色的mixtape能随时陪伴她 在她的iPod里播放 当每次离开家',
  'shit 照片里的她每个眼神都fucked up 之外 侧脸有点胖胖的 短裤包著她的butt',
  '她说她有感受 有时还会感动',
  '那些韵脚轻点到她的笑点打中她的痛',
  '台南台北有她的fever 梦想不是dealer 出入不用visa 品质从不cheaper',
  '温哥华 荷兰 她都smoke 巴赛隆纳 泰北 她都chill',
  'she a stoner , 在烟雾中活著对你吐著说著',
  '" 该死的 人生苦短为何要疑惑呢？"',
  '广播催促她走 不再有约束了她懂',
  '没忘了把这首带走 也许会是她的寄托',
  '或是流泪的理由 慢慢想起那曾经',
  '吸了最后一口 听著这副歌她往后一走'
]
const poem4 = [
  '思维从脑海闪过拿起笔条件反射捕获下所有的经过因为不想浪费每时每刻',
  '从不给人生留下遗憾',
  '路还没走一半',
  '梦想不移换不习惯 如灵感从不离散',
  '也有过低落想起种种衣食无忧',
  '想平凡了此余生为何梦里喋喋无休',
  '我走的每一处每一路每一步都终将成为动力',
  '身上的每道疤每道痂施加梦想重力',
  '开始明白失败后他拍我肩膀的用意',
  '--我的世界 by NaCho & Chey E'
]

const theme = [{
  name: 'Detailed.',
  // theme: '#ececec',
  titleColor: '#212121',
  color: '#a8a8a7',
  btnTheme: '#000',
  btnColor: '#fff',
  headerTheme: '#666',
  musicPlayerBg: '#c0c8ce',
  musicPlayerColor: '#fff',
  poem: poem1
}, {
  name: 'Cool.',
  // theme: '#39393b',
  color: '#919191',
  btnTheme: '#000',
  btnColor: '#fff',
  headerTheme: '#fff',
  musicPlayerBg: '#959595',
  musicPlayerColor: '#fff',
  poem: poem3
}, {
  name: 'Creative.',
  // theme: '#f9efe6',
  color: '#afa7a1',
  btnTheme: '#000',
  btnColor: '#fff',
  headerTheme: '#666',
  musicPlayerBg: '#ffcece',
  musicPlayerColor: '#fff',
  poem: poem2
}, {
  name: 'Inspired.',
  // theme: '#6f8fa8',
  titleColor: '#fff',
  color: '#b1c3d1',
  btnTheme: '#000',
  btnColor: '#fff',
  headerTheme: '#fff',
  musicPlayerBg: '#989898',
  musicPlayerColor: '#fff',
  poem: poem4
}]

const blogTheme = {
  musicPlayerBg: '#c2c2c2',
  musicPlayerColor: '#fff',
  musicPlayerHide: true
}

const meTheme = {
  musicPlayerBg: '#c2c2c2',
  musicPlayerColor: '#fff',
  musicPlayerHide: true
}

export { theme as ThemeEnum, blogTheme as BlogTheme, meTheme as MeTheme }