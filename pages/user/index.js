// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectNum:0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) { 
      wx.showToast({
        title: '请登录',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
      });
      return
    }
    const collectNum = wx.getStorageSync('collect').length;
    this.setData({
      userInfo,
      collectNum
    })
  },

  
})