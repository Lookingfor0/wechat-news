//index.js
Page({
  data: {
    //新闻类别 {代号， 名称}， 可自主添加或删除
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
