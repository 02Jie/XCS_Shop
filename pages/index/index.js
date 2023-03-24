// pages/category/index.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    navList: [],
    floorList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取轮播图
    request({
      url:"/home/swiperdata",
    }).then(res => { 
      console.log(res, "res");
      let swiperList = res.data.message
      this.setData({
        swiperList
      })
    })
    //获取分类导航栏
    request({
      url:"/home/catitems"
    }).then(res => {
      console.log(res,"分类res");
      let navList = res.data.message
      this.setData({
        navList
      })
    })  
       
    //获取楼层接口
    request({
      url:"/home/floordata"
    }).then(res => {
      let floorList = res.data.message
      console.log(res, '楼层res');
      this.setData({
        floorList
      })
     })
 
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