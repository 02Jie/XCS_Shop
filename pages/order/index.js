// pages/order/index.js
import { request } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        title: "全部",
        selected: true,
      },
      {
        id: 1,
        title: "待付款",
        selected: false,
      },
      {
        id: 2,
        title: "待收货",
        selected: false,
      },
      {
        id: 3,
        title: "退款/退货",
        selected: false,
      },
    ],
    orderList: [],
  },

  changeByIndex(index) {
    let { tabs } = this.data;
    console.log(tabs, "tabs");
    tabs.forEach((v, i) => {
      i === index ? (v.selected = true) : (v.selected = false);
    });
    this.setData({
      tabs,
    });
  },

  // 点击tab栏
  handleItemTabs(e) {
    console.log(e, "父组件的e");
    let index = e.detail;
    console.log(index, "index");
    this.changeByIndex(index)
    this.getOrder(index+1)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '../auth/index',
      });
        
     }
    let pages = getCurrentPages();
    console.log(pages, "pages");
    //1 pages索引中最大的页面就是当前页面
    let currentPage = pages[pages.length - 1]
    console.log(currentPage, "currentPagecurrentPage");
    let {type} = currentPage.options 
    this.getOrder(type)
    this.changeByIndex(type-1)
  },

  async getOrder(type) {
  console.log(type,"typetypetype")
    let res = await request({
      url: "/my/orders/all?type="+type,
      data:type
    })
  console.log(res, "res");
  let  orderList = res.data.message.orders
  console.log(orderList, "orderList");
  this.setData({
    orderList: orderList.map(v => ({
      ...v,
      create_time_cn:(new Date(v.create_time * 1000).toLocaleString())
    }))
  })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
