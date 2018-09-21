// index.js
Page({
  data: {
    // 新闻类别 {代号， 名称}， 可自主添加或删除
    categories: [
      {cat: 'gn', name: '国内'}, 
      {cat: 'gj', name: '国际'},
      {cat: 'cj', name: '财经'},
      {cat: 'yl', name: '娱乐'},
      {cat: 'js', name: '军事'},
      {cat: 'ty', name: '体育'}, 
      {cat: 'other', name: '其他'},
    ],    
    currentCat: "gn",
    newsList: {},
  },
  // 事件处理函数
  onLoad: function () {
    this.getNews(this.data.currentCat) 
  },
  onPullDownRefresh () {
    this.getNews(this.data.currentCat, wx.stopPullDownRefresh)
  },
  // 获取新闻
  getNews: function(cat, callback) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {"type": cat},
      success: res => {
        let newsList = res.data.result
        for ( let i in newsList) {
          let dateStr = newsList[i].date
          let app = getApp()
          newsList[i].date = app.resolveTimeStr(dateStr)
          // 如果没有图片，使用默认图片代替
          if (!newsList[i].firstImage)
            newsList[i].firstImage = "/images/default.jpg"
        }
        this.setData({
          newsList: newsList,
          currentCat: cat  // 成功后再切换目录，避免目录与新闻不同。
        })
        wx.hideLoading()  // complete中的hideLoading会在success和fail后调用，会报错：showLoading必须与hideLoading配对使用,所以放这里        
        wx.showToast({
          title: '为您带来了' + newsList.length + '条新闻~',
          icon: 'none'
        })
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败0.0',
          icon: 'none',
        })
      },
      complete: res => {
        typeof callback === 'function' && callback()
      }
    })
  },
  // 切换新闻分类
  changeCat: function(event) {
    let cat = event.target.dataset.cat
    if (cat !== this.data.currentCat){
      this.getNews(cat);
    }
  },
  // 跳转到详情页面
  detail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  }
})
