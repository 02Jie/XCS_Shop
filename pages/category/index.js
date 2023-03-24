// pages/category/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenu: [],
    rightMenu: [],
    currentIndex: 0,
    //点击左侧菜单栏右侧内容指定
    scrollTop:""
  },
  cateGoryMenu : [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.cateGoryMenuData()
    // 获取本地是否有cats数据 
    // const cates = wx.getStorageSync('cats');
    // // 没有就发送请求
    // if (!cates) {
    //   this.cateGoryMenuData()
    // } else if (Date.now() - cates.time > 1000 * 10) {   //设置缓存时间，如果过了10s 重新发送请求
    //   this.cateGoryMenuData()
    // } else { 
    //   this.cateGoryMenu = cates.data
    //    //获取左侧菜单数据
    // let leftMenu = this.cateGoryMenu.map(v => v.cat_name);
    // // 获取右侧菜单数据
    // let rightMenu = this.cateGoryMenu[0].children
    // this.setData({
    //   leftMenu,
    //   rightMenu
    // })
    // }
      
  },  
  //获取分类菜单接口
  async cateGoryMenuData() { 
    // request({
    //   url:"/categories"
    // }).then(res => {
    //   console.log(res, "菜单分类");
    //   this.cateGoryMenu = res.data.message
    //   console.log(this.cateGoryMenu);
    //   //获取左侧菜单数据
    //   let leftMenu = this.cateGoryMenu.map(v => v.cat_name);
    //   console.log(leftMenu,"cat_name");
    //   //获取右侧菜单数据
    //   let rightMenu = this.cateGoryMenu[0].children
    //   this.setData({
    //     leftMenu,
    //     rightMenu
    //   })
    // })
    let res = await request({ url: "/categories" })
    console.log(res,"res");
    this.cateGoryMenu = res.data.message
    //j将数据存储至本地数据
    // wx.setStorageSync('cates', { time: Date.now(), data: this.cateGoryMenu});
      
    //获取左侧菜单数据
    let leftMenu = this.cateGoryMenu.map(v => v.cat_name);
    // 获取右侧菜单数据
    let rightMenu = this.cateGoryMenu[0].children
    this.setData({
      leftMenu,
      rightMenu
    })
  },
  //点击左侧菜单需要完成的逻辑处理
  handleNav(e) {
    console.log(e, "e");
    let { index } = e.currentTarget.dataset
    console.log(index,"indexxx");
    //获取右侧菜单数据
    let rightMenu = this.cateGoryMenu[index].children
    this.setData({
      currentIndex:index,
      rightMenu,
      scrollTop:0
    })
  }
  
})