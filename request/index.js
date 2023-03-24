// 防止多次请求接口数据把加载中提示覆盖
let ajaxTimes = 0;
//封装的Promise方法 为了解决回调地狱
export const request = (params) => {
    //封装请求头
    let header = { ...params.header }  //原有基础上的header
    //如果请求头有需要添加token
    if (params.url.includes("/my/")) {
        header['Authorization'] = wx.getStorageSync('token');       
     }

    ajaxTimes++;
    // 页面加载数据还未请求成功时显示一个加载中弹框
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
      
    //封装公共的url
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return  new Promise((resolve, reject) => { 
       wx.request({
           ...params,
           header,
           url:baseUrl + params.url,
           success: (result) => { 
               resolve(result)
           },
           fail: (err) => { 
            reject(err)
           },
           complete: () => { 
               ajaxTimes--;
               //关闭加载中弹框
               wx.hideLoading();
           }
       });   
    })
}
 
export const showModal = ({ content}) => {
    return new Promise((resolve, reject) => { 
        wx.showModal({
            content: content,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                console.log(err);
            },
            complete: () => {}
        });
          
    })
}
 
export const showToast = (({ title }) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'none',
            success: (result) => { resolve(result) },
            fail: (err) => { console.log(err)}
          })
     })
 })