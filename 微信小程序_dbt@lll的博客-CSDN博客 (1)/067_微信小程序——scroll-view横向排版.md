# 微信小程序——scroll-view横向排版

> 原创 于 2021-01-23 09:34:05 发布 · 1.2k 阅读 · 0 · 0 · 本内容遵循CC 4.0 BY-SA版权协议 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
> 文章链接：https://blog.csdn.net/qq_43201350/article/details/112801619

**wxml文件** 

```
<scroll-view class="recommend_scroll" enable-flex scroll-x>
      <view class="sroll_item" wx:for="{{5}}">
        <image src="../../static/images/recommendSong/recommendSong.jpg"></image>
      </view>
</scroll-view>
```

**less文件** 

```
.recommend_scroll {
  display: flex;
  height: 300rpx; //此处一定要设置一个高度
  .sroll_item {
    width: 200rpx;
    margin: 0 20rpx 0 0;
    image {
      width: 200rpx;
      height: 200rpx;
      border-radius: 10rpx;
    }
  }
}
```