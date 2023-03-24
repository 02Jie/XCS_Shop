// pages/cart/index.js
import { showModal,showToast } from "../../request/index";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    detailInfo: "",
    carts: [],
    allChecked: false,
    totalPrice: 0,
    totoalNums: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
  //获取收获地址
  getAddress() {
    wx.chooseAddress({
      success: (result) => {
        console.log(result);
        let address = result;
        wx.setStorageSync("address", address);
      },
    });
  },

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
    this.setCart(carts);
    this.setData({
      address,
      detailInfo,
    });
  },
  handleChecked(e) {
    console.log(e, "复选框");
    let goods_id = e.currentTarget.dataset.id;
    //1. 获取被修改的商品对象
    let { carts } = this.data;
    let index = carts.findIndex((v) => v.goods_id === goods_id);
    //2. 选中状态取反
    carts[index].checked = !carts[index].checked;
    this.setCart(carts);
  },
  //封装购物车底部购物车数据
  setCart(carts) {
    let allChecked = true;
    let totalPrice = 0;
    let totoalNums = 0;
    carts.forEach((v) => {
      if (v.checked) {
        totalPrice += v.nums * v.goods_price;
        totoalNums += v.nums;
      } else {
        allChecked = false;
      }
    });
    allChecked = carts.length != 0 ? allChecked : false;

    this.setData({
      carts,
      allChecked,
      totalPrice,
      totoalNums,
    });
    wx.setStorageSync("carts", carts);
  },
  //全选状态
  handleCheckedAll() {
    // 1. 获取data中的数据
    let { allChecked, carts } = this.data;
    // 2. 修改选中的值
    allChecked = !allChecked;
    // 3. 循环修改carts数组中的商品选中状态
    carts.forEach((v) => (v.checked = allChecked));
    // 4. 把修改的值填充会data或缓存中
    this.setCart(carts);
  },
  async handleNumEdit(e) {
    console.log(e);
    //1. 根据自定义属性进行+ -操作
    const { opreater, id } = e.currentTarget.dataset;
    console.log(opreater, id);
    let { carts } = this.data;
    // 2. 精准找到需要操作的对象
    let index = carts.findIndex((v) => v.goods_id == id);
    if (carts[index].nums === 1 && opreater == -1) {
      let res = await showModal({ content: "确定删除此商品吗" });
      console.log(res, "res");
      res.confirm == true ? carts.splice(index, 1) : false;
      this.setCart(carts);
    } else {
      // 3. 进行加减
      carts[index].nums += opreater;
    }

    // 4. 重新添加到缓存中
    this.setCart(carts);
  },
  // 结算优化处理
  handleBuyDispose() { 
    // 1.收获地址没获取时提示还未填写收获地址
    const { address,totoalNums } = this.data
    if (!address.userName) {
      showToast({ title: "请填写收获地址" })
      return
    } else if (totoalNums == 0) {
      showToast({ title: "你还未选择需要结算的商品哟" })
      return
    } else { 
      wx.navigateTo({
        url: '../pay/index',
      });
        
    }
  }
});
