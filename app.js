//app.js
var api = require('/api/api.js')
var AppId = 'wx2d4fe0325de9fb31'
var AppSecret = '830a0727e087bbe0067860fe9be290fc'

App({
  onLaunch: function () {
  },
  getUserInfo: function (cb) {
    var that = this
    //调用登录接口，获取 code
    wx.login({
      success: function (res) {
        //发起网络请求
        wx.request({
          url: api.mobileIn,
          data: {
            appid: AppId,
            secret: AppSecret,
            code: res.code,
            grant_type: 'authorization_code'
          },
          header: {
            method: 'GET_OPENID'
          },
          method: 'GET',
          success: function (res) {
            console.log('app_res', res)
            // 将openId设成全局
            that.globalData.openId = res.data.openid
            // that.globalData.user = res.data.user
            that.globalData.flag = res.data.flag
            console.log('res.data', res.data)
            wx.getUserInfo({
              success: function (res) {
                console.log('app_res', res)
                // 将userInfo设成全局
                that.globalData.userInfo = res.userInfo
                // that.goHome()
                typeof cb == "function" && cb(that.globalData.userInfo, that.globalData.openId, that.globalData.user, that.globalData.flag)
              }
            })
          },
          fail: function (res) { },
          complete: function (res) { 
            // that.goHome()
          }
        });
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: null,
    user: null,
    flag: null
  }
})