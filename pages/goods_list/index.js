// pages/goods_list/index.js
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
        title: "综合",
        selected: true,
      },
      {
        id: 1,
        title: "销量",
        selected: false,
      },
      {
        id: 2,
        title: "价格",
        selected: false,
      },
    ],
    goodList: [],
  },
  cid: "",
  QueryParams: {},
  totalPages: 1, //总页数

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options, "获取参数");

    this.cid = options.cat_id;
    this.QueryParams = {
      query: "",
      cid: this.cid,
      pagenum: 1,
      pagesize: 10,
    };
    this.getShopList();
  },
  //获取商品列表数据
  async getShopList() {
    let res = await request({
      url: "/goods/search",
      data: this.QueryParams,
    });
    //获取总条数
    const total = res.data.message.total;

    //计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    console.log(
      this.totalPages,
      " this,totalPages = Math.ceil(total / this.QueryParams.pagesize)"
    );
    this.setData({
      goodList: [...this.data.goodList, ...res.data.message.goods],
    });
    console.log(res, "获取商品详情");
    console.log(res.data.message.goods, "res.data.message.goods");
    // 关闭数据已经请求完了还在刷新效果
    wx.stopPullDownRefresh();
      
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
  //  页面上滑 滚动条触底事件
  onReachBottom() {
    console.log("触底了");
    // 1 判断还有没有下一页数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      //没有下一页数据
      wx.showToast({
        title: "没有数据啦",
      });
    } else {
      this.QueryParams.pagenum++;
      this.getShopList();
    }
  },
  //下拉刷新事件
  onPullDownRefresh() { 
    console.log("下拉刷新事件");
    // 1 重置数组
    this.setData({
      goodList: []
    });
    // 2 重置页码
    this.QueryParams.pagenum = 1;
    // 3 发送请求
    this.getShopList();
  }
});
