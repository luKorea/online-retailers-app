import {http} from './index'

let result = null;
export const reqDetails = async (iid) => {
  result = await http({
    url: `/detail`,
    params: {
      iid
    },
    method: 'GET'
  });
  return result.result;
};
export const reqRecommend = async () => {
  result = await http({
    url: '/recommend',
    method: 'GET'
  });
  if (result.returnCode === 'SUCCESS') {
    return result.data;
  }
};


// TODO 封装详情页轮播图下数据
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}


export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}


export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

