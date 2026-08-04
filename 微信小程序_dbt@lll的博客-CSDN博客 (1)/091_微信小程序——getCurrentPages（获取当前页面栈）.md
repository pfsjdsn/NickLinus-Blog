# 微信小程序——getCurrentPages（获取当前页面栈）

> 原创 于 2021-01-25 14:25:38 发布 · 2.2k 阅读 · 1 · 0 · 本内容遵循CC 4.0 BY-SA版权协议 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
> 文章链接：https://blog.csdn.net/qq_43201350/article/details/112799371



- 获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面

- 注意：不要在 `App.onLaunch` 的时候调用 `getCurrentPages()` ，此时 `page` 还没有生成

```
let pages = getCurrentPages()
let currentPage = pages[pages.length -1]
console.log(currentPage) 此为当前页面
```