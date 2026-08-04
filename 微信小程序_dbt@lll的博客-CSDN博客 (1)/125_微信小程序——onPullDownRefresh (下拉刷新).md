# 微信小程序——onPullDownRefresh (下拉刷新)

> 原创 于 2021-01-23 09:34:45 发布 · 9.7k 阅读 · 0 · 2 · 本内容遵循CC 4.0 BY-SA版权协议 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
> 文章链接：https://blog.csdn.net/qq_43201350/article/details/112800714

思路

- onPullDownRefresh (下拉刷新)

- 1 当前页面数据置空

- 2 当前页码重置为1

- 3 重新请求页面数据接口
  */

```
  // 下拉刷新
  onPullDownRefresh() {
    console.log('我下拉刷新了');
    // 重置数组
    this.setData({
      goodsList: []
    })
    // 重置页码
    this.params.pagenum = 1
    // 发送请求
    this.getList() //请求当前页面数据
  }
```

当前文件的json文件

```
{
  "navigationBarTitleText": "商品列表",
  "enablePullDownRefresh": true,
  "backgroundTextStyle": "dark"
}
```

下拉刷新后，关闭下拉刷新的窗口

```
getList（）{
	// 请求数据后

	    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh()
}

```