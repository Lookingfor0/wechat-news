//app.js
App({
  resolveTimeStr: function(dateStr) {
    // 若新闻在当天发布，显示小时和分钟，否则显示日期
    let today = new Date()    
    let date = new Date(dateStr)
    today.setDate(today.getDate())  // 当天凌晨
    if (Number(date - today) >= 0)
      dateStr = date.getHours() + ':' + date.getMinutes()
    else
      dateStr = (date.getMonth() + 1) + '月' + date.getDate() + '日'
    return dateStr
  }
})