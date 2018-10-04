var car = JSON.parse(localStorage.getItem('car') || '[]')
export default {
  car: car, // 将 购物车中的商品的数据，用一个数组存储起来，在 car 数组中，存储一些商品的对象， 咱们可以暂时将这个商品对象，设计成这个样子   
  // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
  lunbotuList: [], // 保存轮播图的数组
  shopcars: [],
  photoList: [],
  categories: [],
  photoinfo: {},
  thumbs: [],
  newslist: [],
  newsinfo: {},
  goodslist: [],
  goodsinfo: {},
  goodslunbotus: [],
  goodsdesc: {},
  comments: []
}