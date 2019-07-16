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
