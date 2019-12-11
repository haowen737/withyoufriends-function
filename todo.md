## 这是工人看的笔记

### 跳转到登录 signin有几种：

1. 文章评论
2. 博客留言
3. 主动点登陆？？(目前没有想好要不要做）

signin --false--> signup
    |               |
  true              |
    |               |
     \_____________/
            |
            | welcome
            |
     history.goback

//用户登录
// login现在主要是作为检查数据库中是否存在这个用户
// withyoufriends现在并不做账号密码式的登录
// mysql中能查询到当前调用login的用户就为成功
// 否则返回为false，用户需要输入一个昵称来注册