// import Vue from 'vue'
import { Toast } from "mint-ui";
export default {
  setLunbotu(state, lunbotuList) {
    state.lunbotuList = lunbotuList
  },
  addToCar(state, goodsinfo) {
    // 点击加入购物车，把商品信息，保存到 store 中的 car 上
    // 分析：
    // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
    // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

    // 假设 在购物车中，没有找到对应的商品
    var flag = false

    state.car.some(item => {
      if (item.id == goodsinfo.id) {
        item.count += parseInt(goodsinfo.count)
        flag = true
        return true
      }
    })

    // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
    if (!flag) {
      state.car.push(goodsinfo)
    }

    // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
    localStorage.setItem('car', JSON.stringify(state.car))
  },
  updateGoodsInfo(state, goodsinfo) {
    // 修改购物车中商品的数量值
    // 分析： 
    state.car.some(item => {
      if (item.id == goodsinfo.id) {
        item.count = parseInt(goodsinfo.count)
        return true
      }
    })
    // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
    localStorage.setItem('car', JSON.stringify(state.car))
  },
  removeFormCar(state, id) {
    // 根据Id，从store 中的购物车中删除对应的那条商品数据
    state.car.some((item, i) => {
      if (item.id == id) {
        state.car.splice(i, 1)
        return true;
      }
    })
    // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
    localStorage.setItem('car', JSON.stringify(state.car))
  },
  removeFormGoodList(state, index) {
    state.goodslist.splice(index, 1);
  },
  updateGoodsSelected(state, info) {
    state.car.some(item => {
      if (item.id == info.id) {
        item.selected = info.selected
      }
    })
    // 把最新的 所有购物车商品的状态保存到 store 中去
    localStorage.setItem('car', JSON.stringify(state.car))
  },
  getLunbotu(state) {
    // 获取轮播图数据的方法
    // const Http = new Vue
    this.$http.get("api/getlunbo").then(result => {
      console.log('getlunbo', result.data);
      if (result.data.status === 0) {
        // 成功了
        state.lunbotuList = result.data.message
      } else {
        // 失败的
        Toast("加载轮播图失败。。。");
      }
    });
  },
  getShopCarsList(state) {
    // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
    var idArr = [];
    state.car.forEach(item => idArr.push(item.id));
    // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
    if (idArr.length <= 0) {
      return;
    }
    // 获取购物车商品列表
    // const Http = new Vue
    this.$http.get("api/goods/getshopcarlist/" + idArr.join(","))
      .then(result => {
        console.log('result', result);

        if (result.data.status === 0) {
          state.shopcars = result.data.message;
        }
      });
  },
  getAllCategory(state) {
    // 获取所有的图片分类
    this.$http.get("api/getimgcategory").then(result => {
      // console.log(result.data);
      if (result.data.status === 0) {
        // 手动拼接出一个最完整的 分类列表
        result.data.message.unshift({ title: "全部", id: 0 });
        state.categories = result.data.message;
      }
    });
  },
  getPhotoListByCateId(state, cateId) {
    // 根据 分类Id，获取图片列表
    this.$http.get("api/getimages/" + cateId).then(result => {

      if (result.data.status === 0) {
        state.photoList = result.data.message;
        // console.log(state.photoList);
      }
    });
  },
  getPhotoInfo(state, id) {
    // 获取图片的详情
    this.$http.get("api/getimageInfo/" + id).then(result => {
      if (result.data.status === 0) {
        state.photoinfo = result.data.message[0];
      }
    });
  },
  getThumbs(state, id) {
    // 获取缩略图
    this.$http.get("api/getthumimages/" + id).then(result => {
      if (result.data.status === 0) {
        // 循环每个图片数据，补全图片的宽和高
        result.data.message.forEach(item => {
          item.w = 600;
          item.h = 600;
          item.msrc = item.src;
        });
        // 把完整的数据保存到 list 中
        state.thumbs = result.data.message;
        // console.log(this.list)
      }
    });
  },
  getNewsList(state) {
    // 获取新闻列表
    // Toast("获取新闻列表失败！");
    this.$http.get("api/getnewslist").then(result => {
      if (result.data.status === 0) {
        // 如果没有失败，应该把数据保存到 data 上
        state.newslist = result.data.message;
      } else {
        Toast("获取新闻列表失败！");
      }
    });
  },
  getNewsInfo(state, id) {
    // 获取新闻详情
    this.$http.get("api/getnew/" + id).then(result => {
      if (result.data.status === 0) {
        state.newsinfo = result.data.message[0];
      } else {
        Toast("获取新闻失败！");
      }
    });
  },
  getGoodsList(state, pageindex) {
    // 获取商品列表
    this.$http
      .get("api/getgoods?pageindex=" + pageindex)
      .then(result => {
        if (result.data.status === 0) {
          // this.goodslist = result.data.message;
          if (state.goodslist.length > 0) {
            result.data.message.forEach(item => {
              let b = false;
              state.goodslist.forEach(item1 => {
                if (item.id === item1.id) {
                  b = true;
                }
              });
              if (!b) {
                state.goodslist.push(item);
              }
            })
          } else {
            state.goodslist = result.data.message;
          }
          // state.goodslist = state.goodslist.concat(result.data.message);
        }
      });
  },
  getGoodsInfo(state, id) {
    // 获取商品的信息
    this.$http
      .get("api/goods/getinfo/" + id).then(result => {
        if (result.data.status === 0) {
          state.goodsinfo = result.data.message[0];
        }
      });
  },
  getGoodsLunbotus(state, id) {
    this.$http.get("api/getthumimages/" + id).then(result => {
      if (result.data.status === 0) {
        // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
        result.data.message.forEach(item => {
          item.img = item.src;
        });
        state.goodslunbotus = result.data.message;
      }
    });
  },
  getGoodsDesc(state, id) {
    this.$http
      .get("api/goods/getdesc/" + id)
      .then(result => {
        if (result.data.status === 0) {
          state.goodsdesc = result.data.message[0];
        }
      });
  },
  getComments(state, payload) {
    // 获取评论
    this.$http
      .get("api/getcomments/" + payload.id + "?pageindex=" + payload.pageIndex)
      .then(result => {
        if (result.data.status === 0) {
          // this.comments = result.data.message;
          // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
          state.comments = state.comments.concat(result.data.message);
        } else {
          Toast("获取评论失败！");
        }
      });
  },
  postComment(state, payload) {
    this.$http
      .post("api/postcomment/" + payload.id, {
        content: payload.msg.trim()
      })
      .then(function (result) {
        if (result.data.status === 0) {
          // 1. 拼接出一个评论对象
          var cmt = {
            user_name: "匿名用户",
            add_time: Date.now(),
            content: payload.msg.trim()
          };
          state.comments.unshift(cmt);
          // state.msg = "";
        }
      });
  }
}