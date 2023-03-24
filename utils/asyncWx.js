export const login = (() => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout:10000,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {console.log(err);},
            complete: () => {}
        });
          
     })
})
 
//小程序的微信支付
export const requestPayment = ((pay) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
           ...pay,
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {}
        });
          
          
     })
 })