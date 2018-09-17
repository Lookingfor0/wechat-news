//index.js
Page({
  data: {
    currentCat: "gn",
  },
  //事件处理函数
  onLoad: function () {
  //获取新闻...   
  },
  //切换新闻分类
  changeCat: function(event) {
    let cat = event.target.dataset.cat
    this.setData({
      currentCat: cat
    })
    //获取新闻...
  },
})
