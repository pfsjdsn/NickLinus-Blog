# 微信小程序——less 中使用calc

> 原创 于 2021-01-26 18:18:31 发布 · 560 阅读 · 0 · 0 · 本内容遵循CC 4.0 BY-SA版权协议 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
> 文章链接：https://blog.csdn.net/qq_43201350/article/details/112799171

```
100vh表示屏幕高度
错误写法：
height: calc(100vh - 90rpx);
// 效果
height: 10vh;
正确写法：
height: ~'calc(100vh - 90rpx)';
//效果
height: calc(100vh - 90rpx);
```