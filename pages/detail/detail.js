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
        console.log(detail)
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