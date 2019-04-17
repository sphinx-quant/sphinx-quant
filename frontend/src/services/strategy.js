// import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获得策略列表
 *
 * @export
 * @returns
 */
export async function getStrategyList() {
  return request('/api/strategy/list');
}

/**
 * 获得策略详情
 *
 * @export
 * @param {*} { id }
 * @returns
 */
export async function getStrategyDetail({ id }) {
  return request(`/api/strategy/detail/${id}`);
}

/**
 * 更新策略
 *
 * @export
 * @param {*} { id, newData }
 * @returns
 */
export async function updateStrategyDetail({ id, newData }) {
  return request(`/api/strategy/detail/${id}`, {
    method: 'PUT',
    body: newData,
  });
}

/**
 * 删除策略
 *
 * @export
 * @param {*} id
 * @returns
 */
export async function deleteStrategyDetail(id) {
  return request(`/api/strategy/detail/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 创建策略
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function createStrategyDetail(params) {
  return request(`/api/strategy/create`, {
    method: 'POST',
    body: {
      source_code: { code_text: '' },
      ...params,
    },
  });
}
