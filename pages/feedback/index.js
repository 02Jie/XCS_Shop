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
    upImgList:[]
  },
  //上传图片
  handleUpImg() { 
    wx.chooseMedia({
      //最多上传的图片
      count: 9,
      mediaType: ['image','video'], //文件类型  图片 || 视频
      sourceType: ['album', 'camera'], // 文件来源 album：相册选择  camera：照相机拍摄
      maxDuration: 30, //拍摄视频最长时间 3-60
      camera: 'back', //仅在 sourceType 为 camera 时生效，使用前置或后置摄像头
      success: (res) => {
         // console.log(res.tempFiles[0].tempFilePath)  //本地临时文件路径 (本地路径)
        // console.log(res.tempFiles[0].size)  //本地临时文件大小，单位 B
        console.log(res,"res");
        this.setData({
          upImgList:[...this.data.upImgList,...res.tempFiles]
        })
       }
   
    })
      
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