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
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {"type": cat},
      success: res => {
        let newsList = res.data.result
        let today = new Date()
        for ( let i in newsList) {
          // 若新闻在当天发布，显示小时和分钟，否则显示日期
          let date = new Date(newsList[i].date)
          today.setDate(today.getDate())  // 当天凌晨
          if (Number(date - today) >= 0)
            newsList[i].date = date.getHours() + ':' + date.getMinutes()
          else
            newsList[i].date = (date.getMonth() + 1) + '月' + date.getDate() + '日'
          // 如果没有图片，使用默认图片代替
          if (!newsList[i].firstImage)
            newsList[i].firstImage = "/images/default.jpg"
        }
        callback && callback()
        this.setData({
          newsList: newsList,
          currentCat: cat  // 成功后再切换目录，避免目录与新闻不同。
        })
        wx.showToast({
          title: '为您带来了' + newsList.length + '条新闻~',
          icon: 'none'
        })
      },
      fail: res => {
        wx.hideLoading() // 只有这样，刚进入小程序时，toast才会显示，不知道为什么启动时会自动showLoading
        wx.showToast({
          title: '加载失败0.0',
          icon: 'none',
          success: callback && callback()
        })
      }
    })
  },
  // 切换新闻分类
  changeCat: function(event) {
    let cat = event.target.dataset.cat
    this.getNews(cat);
  },
  // 跳转到详情页面
  detail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  }
})
