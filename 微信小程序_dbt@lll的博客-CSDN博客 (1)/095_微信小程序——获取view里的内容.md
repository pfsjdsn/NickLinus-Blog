# 微信小程序——获取view里的内容

> 原创 于 2020-09-10 09:21:22 发布 · 2.5k 阅读 · 1 · 2 · 本内容遵循CC 4.0 BY-SA版权协议 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
> 文章链接：https://blog.csdn.net/qq_43201350/article/details/108507149

**wxml文件** 

```
<view bindtap="selectDistrict" data-text="{{content}}" data-id="{{id}}">{{content}}</view>
```

**.js文件** 

```
data: {
 content:'我是内容',
 id: 1
}
  selectDistrict: function (e) {
      console.log(e.currentTarget.dataset.id) // 1
      console.log(e.currentTarget.dataset.text) //我是内容
  },
```