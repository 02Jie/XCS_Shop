// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        title: "商品收藏",
        selected: true,
      },
      {
        id: 1,
        title: "品牌收藏",
        selected: false,
      },
      {
        id: 2,
        title: "店铺收藏",
        selected: false,
      },
      {
        id: 3,
        title: "浏览器足迹",
        selected: false,
      },
    ],
    collect:[],
    shopTitle: [
      {
        title:"全部"
      },
      {
        title:"正在热卖"
      },
      {
        title:"即将上线"
      }
    ],
    shopItem: {}
  },
  handleItemTabs(e) { 
    let index = e.detail;
    let { tabs } = this.data;
    console.log(tabs, "tabs");
    tabs.forEach((v, i) => {
      i === index ? (v.selected = true) : (v.selected = false);
    });
    this.setData({
      tabs,
    }); 
  },
  onShow() { 
    let collect = wx.getStorageSync('collect') || [];
    this.setData({
      collect
    })
       
    // let shopItem = this.data.shopTitle.map(v => { return v.title})
    // console.log(shopItem, "shopItem");
    // this.setData({
    //   shopItem
    // })
  }

})