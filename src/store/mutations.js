import * as types from './mutation-types'

const mutations = {
	[types.ADD_TO_CART](state, goods) {
	  goods.checked = true;
		state.cartList.push(goods);
  },
	[types.INCREMENT_COUNT](state, index) {
		state.cartList[index].count += 1
	}
};


export default mutations
