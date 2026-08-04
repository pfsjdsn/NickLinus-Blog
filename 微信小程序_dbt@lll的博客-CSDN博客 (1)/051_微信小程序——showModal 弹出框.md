# 微信小程序——showModal 弹出框

> 原创 于 2020-09-10 09:19:10 发布 · 814 阅读 · 0 · 1 · 本内容遵循CC 4.0 BY-SA版权协议 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
> 文章链接：https://blog.csdn.net/qq_43201350/article/details/108507127

**.js文件** 

```
demo: function() {
    wx.showModal({
        title: '标题', 
        content: '提示的内容',
        confirmText: '确定', //确认按钮的文字，最多 4 个字符 
        confirmColor: '#346EFE', //确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
        showCancel: false, // 是否显示取消按钮
		cancelText: '取消' //取消按钮的文字，最多 4 个字符
		cancelColor: '#346EFE' // 取消按钮的文字颜色，必须是 16 进制格式的颜色字符串
    })
}
```