import { put, takeLatest } from 'redux-saga/effects'
import { GET_PRODUCTS,SET_PRODUCTS } from '../productAction'
import RequestMake from '../../utils/RequestMake'
 import {PRODUCTS_BY_CATEGORY} from '../../utils/ApiList'
export function* workerGetProducts(action) {
}
export function* watcherGetProducts() {
  yield takeLatest(GET_PRODUCTS,workerGetProducts)
}