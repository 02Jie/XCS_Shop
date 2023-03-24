// pages/cart/index.js
import { showModal, showToast, request } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { requestPayment } from "../../utils/asyncWx.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    detailInfo: "",
    carts: [],
    totalPrice: 0,
    totoalNums: 0,
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
  onShow() {
    let address = wx.getStorageSync("address");
    let detailInfo =
      address.provinceName +
      address.cityName +
      address.countyName +
      address.detailInfo;
    let carts = wx.getStorageSync("carts") || [];
    carts = carts.filter((v) => v.checked);
    console.log(carts, "checkedCarts");
    this.setCart(carts);
    this.setData({
      address,
      detailInfo,
    });
  },
  //封装购物车底部购物车数据
  setCart(carts) {
    let totalPrice = 0;
    let totoalNums = 0;
    carts.forEach((v) => {
      totalPrice += v.nums * v.goods_price;
      totoalNums += v.nums;
    });

    this.setData({
      carts,
      totalPrice,
      totoalNums,
    });
  },
  // 点击支付
  async handleOrderPay() {
    try {
      // 1. 判断缓存中有没有token
      const token = wx.getStorageSync("token");
      // 2. 判断
      //   1)：没有token的话就返回授权界面 授权
      //   2): 有的话就拉起支付
      if (!token) {
        wx.navigateTo({
          url: "/pages/auth/index",
        });
        return;
      }
      // 3. 创建订单 获取订单接口
      // let header = { Authorization: token };
      let carts = this.data.carts;
      console.log(carts, "获取cars");
      // 设置请求体
      let order_price = this.data.totalPrice;
      let consconsignee_addr = this.data.detailInfo;
      let goods = [];
      carts.forEach((v) =>
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.nums,
          goods_price: v.goods_price,
        })
      );
      console.log(goods, "goods");
      let orderParams = { order_price, consconsignee_addr, goods };
      console.log(orderParams, "orderParams");
      // 4. 准备发送请求
      let { order_number } = request({
        url: "my/orders/create",
        data: order_price,
        consconsignee_addr,
        goods,
      });

      // 5. 发起 预支付接口
      const { pay } = await request({
        url: "/my/orders/req_unifiedorder",
        data: order_number,
        method: "post",
      });
      console.log(pay);
      // 6. 支付
      const res = await requestPayment(pay);
      // 7. 支付状态
      const data = await request({
        url: "my/orders/chkOrder",
        data: order_number,
        method: "post",
      });
      console.log(data);
      wx.showToast({
        title: "支付成功",
      });
      //8 收到删除缓存中 已经支付了的商品
      let newCarts = wx.getStorageSync("carts")
      newCarts = newCarts.filter(v => !v.checked)
      wx.setStorageSync("carts", newCarts);
        
      wx.navigateTo({
        url: '../order/index',
      });
        
    } catch (error) {
      wx.showToast({
        title: "支付失败",
        icon: 'none',
      });
    
        
    }
  },
});
