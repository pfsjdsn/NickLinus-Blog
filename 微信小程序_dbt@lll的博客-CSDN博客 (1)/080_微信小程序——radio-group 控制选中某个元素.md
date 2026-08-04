# 微信小程序——radio-group 控制选中某个元素

> 原创 于 2020-09-12 10:51:06 发布 · 1.6k 阅读 · 0 · 2 · 本内容遵循CC 4.0 BY-SA版权协议 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
> 文章链接：https://blog.csdn.net/qq_43201350/article/details/108546652

**.wxml文件** 

```
<radio-group class="radio-group" bindchange="radioChange">
    <label class="radio">
        <radio value="1"/>
    </label>
    <label class="radio">
        <radio value="2"/>
    </label>
</radio-group>
```

**.js文件** 

```
radioChange: function (e) {
	console.log(e.detail.value)
	console.log('radio发生change事件，携带value值为：', e.detail.value)
	
},
```