// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
  },
  // 获取新闻详情
  getDetail(id) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {id: id},
      success: res => {
        let detail = res.data.result
        // 处理时间（日期还是小时分钟）
        let today = new Date()
        today.setDate(today.getDate())
        let date = new Date(detail.date)
        if (Number(date - today) < 0)
          detail.date = date.getMonth() + "月" + date.getDate() + "日"
        else 
          detail.date = date.getHours() + ":" + date.getMinutes()
        this.setData({
          detail: detail
        })
      },
      fail: res => {
        wx.showToast({
          title: '加载失败0.0',
          icon: 'none'
        })
      }
    })
  }
})