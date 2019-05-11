import request from '@/utils/request';

/**
 * 获得回测列表
 *
 * @export
 * @returns
 */
export async function getBacktestList() {
  return request('/api/backtest/list');
}

/**
 * 获得回测详情
 *
 * @export
 * @param {*} { id }
 * @returns
 */
export async function getBacktestDetail({ id }) {
  return request(`/api/backtest/detail/${id}`);
}

/**
 * 开始回测
 *
 * @export
 * @returns
 */
export async function startBacktest({ strategyID }) {
  return request(`/api/backtest/test/${strategyID}`);
}

/**
 * 删除回测
 *
 * @export
 * @param {*} id
 * @returns
 */
export async function deleteBacktestDetail(id) {
  return request(`/api/backtest/detail/${id}`, {
    method: 'DELETE',
  });
}
