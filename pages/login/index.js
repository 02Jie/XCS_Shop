// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },


  bindGetUserinfo(e) {
    console.log(e);
    let { userInfo } = e.detail
    wx.setStorageSync("userInfo", userInfo);
    wx.showLoading({
      title: '跳转中...',
      mask: true,
      success: (result) => {
        wx.navigateBack({ //关闭当前页面，返回上一页面或多级页面
          delta: 1  //返回的页面数，如果 delta 大于现有页面数，则返回到首页
        });
      },
      fail: () => {
        wx.showToast({
          title: '授权失败',
          icon: 'none',     
          mask: false, 
        });
          
      },
      complete: () => {}
    });
      
   
      
   }
})