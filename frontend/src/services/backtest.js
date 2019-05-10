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
 * 开始回测
 *
 * @export
 * @returns
 */
export async function startBacktest({ strategyID }) {
  return request(`/api/backtest/test/${strategyID}`);
}
