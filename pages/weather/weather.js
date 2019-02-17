// pages/weather/weather.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_id: app.curid,
    basic: {
      "location": app.curName || "北京",
      "update": {
        "loc": new Date().toLocaleString()
      }
    },
    now: {
      "tmp": 12,
      "cond": {
        "txt": "阴",
        "src": "../../images/src.png"
      },
      "wind": {
        "dir": "西北",
        "sc": 3

      },
      "hum": 66,
      "pcpn": 20,
      "vis": 7
    },
    suggestion: {
      comf: {
        brf: "较冷",
        txt: "白天有零星降雪，在这种天气下，人们会感到有点冷，但大部分人还是不喜欢呆在家里。"
      },
      cw: {
        brf: "不宜",
        txt: "不宜洗车，未来24小时内可能有降雪，如果在此期间洗车，雪水可能会再次弄脏你的爱车。"
      },
      drsg: {
        brf: "寒冷",
        txt: "建议着厚的羽绒服。年老体弱者不适宜户外运动。"
      },
      flu: {
        brf: "容易感冒",
        txt: "不利于病毒扩散。"
      },
      sport: {
        brf: "不宜",
        txt: "室内运动还可以，户外运动注意冻伤。"
      },
      trav: {
        brf: "不宜",
        txt: "旅游建议去比较暖和的南风地区。"
      },

    },
    air: {
      qlty: "-",
      pm25: "-",
      aqi: "-"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    console.log(app.curName);
    // that.setData({
    //   basic: {
    //     "city": app.curName || "北京",
    //     "update": {
    //       "loc": new Date().toLocaleString()
    //     }
    //   }
    // })
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });

    that.getNow(function (d) {
      wx.hideToast();
      // d.now.cond.src = "http://files.heweather.com/cond_icon/" + d.now.cond.code + ".png";
      d.now.cond_src = "https://cdn.heweather.com/cond_icon/" + d.now.cond_code + ".png";

      that.setData({ basic: d.basic, now: d.now })
    }
    )
    that.getSuggestion(function (d) {
      that.setData({ suggestion: d.lifestyle })
    })
    that.getAir(function (d) {
      that.setData({ air: d.air_now_city })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getNow: function (fn) {
    wx.request({
      // url: 'https://www.xiaoguge.cn/api/wxtest',
      // data: { city: app.curid, key: '01a7798b060b468abdad006ea3de4713' },
      url: 'https://free-api.heweather.net/s6/weather',
      data: { location: app.curid, key: '3575873e3a3747be88da4a13fbc846ed' },
      header: { 'Context-Type': 'application/json' },
      success: function (res) { fn(res.data.HeWeather6[0]); }
    })
  },


  getSuggestion: function (fn) {
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/lifestyle',
      data: { location: app.curid, key: '3575873e3a3747be88da4a13fbc846ed' },
      header: { 'Context-Type': 'application/json' },
      success: function (res) {
        fn(res.data.HeWeather6[0]);
      }
    })
  },
  getAir: function (fn) {
    wx.request({
      url: 'https://free-api.heweather.net/s6/air/now',
      data: { location: app.curid, key: '3575873e3a3747be88da4a13fbc846ed' },
      header: { 'Context-Type': 'application/json' },
      success: function (res) {
        if (res.data.HeWeather6[0].status == "permission denied") {
          fn({
            air_now_city: {
              qlty: "-",
              pm25: "-",
              aqi: "-"
            }
          });
        } else {
          fn(res.data.HeWeather6[0]);
        }

      }
    })
  },
  //4、页面事件绑定部分
  bindViewTap: function () { wx.switchTab({ url: '../city/city' }) }//跳转菜单页面 
})