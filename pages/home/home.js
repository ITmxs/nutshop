/**
 * 作者：坚果技术
 * 微信：xjg13690
 */
const app = getApp()
let searchKey = '' //搜索词
Page({
  data: {
    banner: [{
        picUrl: '/image/top1.png'
      },
      {
        picUrl: '/image/top2.png'
      }
    ],
  },
  //页面可见
  onShow() {
    this.getTopBanner(); //请求顶部轮播图
    this.getHotGood()
  },
  //轮播图点击事件

  //去二手商城页
  goToMall() {
    wx.switchTab({
      url: '/pages/mall/mall',
    })

  },
  //去新发布商品列表页
  goToNew() {
    wx.navigateTo({
      url: '/pages/newGood/newGood'
    })
  },
  //地址信息
  goAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  //获取用户输入的搜索词
  getSearchKey(e) {
    searchKey = e.detail.value
  },
  //搜索点击事件
  goSearch() {
    wx.navigateTo({
      url: '/pages/search/search?searchKey=' + searchKey,
    })
  },
  //获取首页顶部轮播图
  getTopBanner() {
    wx.cloud.database().collection("lunbotu")
      .get()
      .then(res => {
        console.log("首页banner成功", res.data)
        if (res.data && res.data.length > 0) {
          //如果后台配置轮播图就用后台的，没有的话就用默认的
          this.setData({
            banner: res.data
          })
        }
      }).catch(res => {
        console.log("首页banner失败", res)
      })
  },
  //获取首页推荐位的商品
  getHotGood() {
    wx.cloud.callFunction({
      name: "getGoodList",
      data: {
        action: 'getHot'
      }
    }).then(res => {
      console.log("首页推荐商品数据", res.result)
      this.setData({
        goodList: res.result.data,
      })
    }).catch(res => {
      console.log("菜品数据请求失败", res)
    })
  },
  //去商品详情页
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?goodid=' + e.currentTarget.dataset.id
    })
  },
})