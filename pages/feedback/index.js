// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        title: "体验问题",
        selected: true,
      },
      {
        id: 1,
        title: "商品、商家投诉",
        selected: false,
      },
      
    ],
  },
 // 点击tab栏
 handleItemTabs(e) {
  console.log(e, "父组件的e");
  let index = e.detail;
  console.log(index, "index");
  let { tabs } = this.data;
  console.log(tabs, "tabs");
  tabs.forEach((v, i) => {
    i === index ? (v.selected = true) : (v.selected = false);
  });
  this.setData({
    tabs,
  });
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})