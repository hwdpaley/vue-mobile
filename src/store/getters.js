export default {
  getAllCount(state) {
    var c = 0;
    state.car.forEach(item => {
      c += item.count
    })
    return c
  },
  getGoodsCount(state) {
    var o = {}
    state.car.forEach(item => {
      o[item.id] = item.count
    })
    return o
  },
  getGoodsSelected(state) {
    var o = {}
    state.car.forEach(item => {
      o[item.id] = item.selected
    })
    return o
  },
  getGoodsCountAndAmount(state) {
    var o = {
      count: 0, // 勾选的数量
      amount: 0 // 勾选的总价
    }
    state.car.forEach(item => {
      if (item.selected) {
        o.count += item.count
        o.amount += item.price * item.count
      }
    })
    return o
  },
  getLunBoTu(state) {
    return state.lunbotuList;
  },
  getShopCars(state) {
    return state.shopcars;
  },
  getPhotoList(state) {
    // console.log(state.photoList);
    return state.photoList;
  },
  getCategories(state) {
    return state.categories;
  },
  photoinfo(state) {
    return state.photoinfo;
  },
  thumbs(state) {
    return state.thumbs;
  },
  newslist(state) {
    return state.newslist;
  },
  newsinfo(state) {
    return state.newsinfo;
  },
  goodslist(state) {
    return state.goodslist;
  },
  goodslunbotus(state) {
    return state.goodslunbotus;
  },
  goodsinfo(state) {
    return state.goodsinfo;
  },
  goodsdesc(state) {
    return state.goodsdesc;
  },
  comments(state) {
    return state.comments;
  }
}