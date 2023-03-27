// pages/search/index.js
import { request } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[]
  },
  TimeId:-1,

  //搜索
  handleInput(e) { 
    console.log(e, "e");
    const { value } = e.detail
    if (!value.trim()) {
      this.setData({
        shopList:[]
      })
      return
    }
    clearTimeout(this.TimeId) 

    this.TimeId = setTimeout(() => { 
      this.qsearch(value)
    },1000)
  },
  //搜搜接口
 async qsearch(query) { 
   const res = await request({
     url: "/goods/qsearch",
     data: {query}
   })
   console.log(res, "res");
   console.log(res.data.message,"res.data.message");
   this.setData({
    shopList:res.data.message
   })
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