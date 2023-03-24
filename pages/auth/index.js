// pages/auth/index.js
import { request } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { login } from "../../utils/asyncWx.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  // 用户授权  获取用户信息
  async handleGetUserInfo(e) {
    try {
      //1. 获取用户信息
      console.log(e, "获取用户信息");
      const { encryptedData, rawData, iv, signature } = e.detail;
      //2. 获取小程序登录成功后的code
      const { code } = await login();
      console.log(code, "code");
      const loginParams = { encryptedData, rawData, iv, signature, code };
      //3. 发送请求 获取用户的token
      const res = await request({
        url: "user/wxlogin",
        data: loginParams,
        method: "post",
      });
      console.log(res, "res");
      //4. 存入token
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
      wx.setStorageSync("token", token);
      wx.navigateTo({
        url: '/pages/user/index',
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
        
    } catch (error) {
      console.log(error,"错误打印");
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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
