import {http} from './index';

let result;
// TODO 获取首页轮播图以及推荐数据
export const reqMultidata = async () => {
    result =  await http({
    url: '/home/multidata',
    method: 'GET'
  });
  if (result.returnCode === 'SUCCESS') {
    return result.data;
  }
};

// TODO 获取首页商品分类数据
export const reqGoods = async (type, page) => {
    result = await http({
      url: '/home/data',
      params: {
        type,
        page
      }
    });
    return result.data;
};
