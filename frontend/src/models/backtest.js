import {
  getBacktestList,
  startBacktest,
  deleteBacktestDetail,
  getBacktestDetail,
} from '@/services/backtest';

export default {
  namespace: 'backtest',

  state: {
    // 回测列表
    backtestList: [],
    // 回测详情
    currentBacktestDetail: {},
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

    /**
     * 获得回测详情
     *
     * @param {*} { payload }
     * @param {*} { call, put }
     */
    *getBacktestDetail({ payload }, { call, put }) {
      const response = yield call(getBacktestDetail, payload);
      yield put({
        type: 'update',
        payload: {
          currentBacktestDetail: response,
        },
      });
    },

    /**
     * 开始回测
     *
     * @param {*} { payload }
     * @param {*} { call, put }
     */
    *startBacktest({ payload }, { call }) {
      yield call(startBacktest, payload);
    },

    /**
     * 删除回测
     *
     * @param {*} { payload }
     * @param {*} { call }
     */
    *deleteBacktestDetail({ payload }, { call }) {
      yield call(deleteBacktestDetail, payload);
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
