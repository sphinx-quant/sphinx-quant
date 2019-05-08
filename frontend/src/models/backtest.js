import { getBacktestList } from '@/services/backtest';

export default {
  namespace: 'backtest',

  state: {
    // 回测列表
    backtestList: [],
  },

  effects: {
    /**
     * 获得回测列表数据
     *
     * @param {*} action
     * @param {*} { call, put }
     */
    *getBacktestList(action, { call, put }) {
      const response = yield call(getBacktestList);
      yield put({
        type: 'update',
        payload: {
          backtestList: response,
        },
      });
    },
  },

  reducers: {
    /**
     * 更新Redux
     *
     * @param {*} state
     * @param {*} { payload }
     * @returns
     */
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
