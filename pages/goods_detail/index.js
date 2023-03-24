// pages/goods_detail/index.js
import { request } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    goodsDetail2: {},
    isCollect:false
  },
  GoodsList:[],
  GoodsList2:[],
  GoodsList3:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onShow:function() {
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length - 1]
    let options = currentPage.options
    //获取从商品列表传过来的goods_id
    let { goods_id } = options;
    console.log(goods_id, "商品id");
    this.getGoodsDetail(goods_id)
  },
  //获取商品详情数据
  async getGoodsDetail(goods_id) {
    let res = await request({ url: "/goods/detail", data: { goods_id } });
    this.GoodsList = res.data.message.pics
    this.GoodsList.forEach(item => { 
      this.goodsDetail2 = item
      this.setData({
        goodsDetail2:this.goodsDetail2 
      })
    })
    this.GoodsList2 = res.data.message 
    console.log(res, "商品详情数据");
    let collect = wx.getStorageSync("collect") || []
    let isCollect = collect.some(v=>v.goods_id === this.goodsDetail2.goods_id)
    this.setData({
      // goodsDetail:res.data.message
      goodsDetail: {
        pics: res.data.message.pics,
        goods_price: res.data.message.goods_price,
        goods_name: res.data.message.goods_name,
        //某些手机例如iphone不支持webp图片格式，需要进行一个转换
        goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g,'.jpg')
      },
      isCollect
    })
  },
  //点击收藏
  handleCollect() { 
    let isCollect = false
    let collect = wx.getStorageSync('collect') || []
    let index = collect.findIndex(v => v.goods_id === this.goodsDetail2.goods_id)
    //表示已经收藏过
    if (index !== -1) {
      collect.splice(index, 1)
      isCollect = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        duration: 1500,
        mask: false,
      });
        
        
    } else { 
      //没有收藏过
      collect.push(this.goodsDetail2)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1500,
        mask: false,
      });
    }
    this.setData({
      isCollect
    })
    wx.setStorageSync("collect",collect)
  },
  handleImg(e) { 
    console.log(e,"e");
    let urls = this.GoodsList.map(v=>v.pics_mid) //拿到数组里面的pics_mid元素
    let current = e.currentTarget.dataset.url  //使用自定义属性拿到第一张图片
    // 1 使用画廊AIP
    wx.previewImage({
      urls: urls, // 需要预览的图片 http 链接列表
      current: current, // 当前显示图片的 http 链接
    })
  },
  addCarts() {
    // 1 获取缓存中 的购物车数组
    let carts = wx.getStorageSync('carts') || [];
    
    // 2  判断 商品对象是否存在于购物车数组中
    let index = carts.findIndex(v => v.goods_id === this.GoodsList2.goods_id)

    if (index === -1) {
      //3 不存在 第一次添加
      this.GoodsList2.checked= true
      this.GoodsList2.nums = 1
      carts.push(this.GoodsList2)
    } else { 
      //4 已经存在购物车数据 执行 nunms++
      carts[index].nums++
    }
    //5 把购物车重新添加到缓存中
    wx.setStorageSync("carts", carts);
    //6 弹窗提示
    wx.showToast({
      title: '添加成功',
      icon: 'succes',
      //防抖
      mask: true,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
      
  }
});
 