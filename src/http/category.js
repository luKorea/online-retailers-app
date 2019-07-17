import {http} from './index'


export function getCategory() {
  return http({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {
  return http({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return http({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
