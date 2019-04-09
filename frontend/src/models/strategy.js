import {
  getStrategyList,
  getStrategyDetail,
  updateStrategyDetail,
  createStrategyDetail,
  deleteStrategyDetail,
} from '@/services/strategy';

export default {
  namespace: 'strategy',

  state: {
    // 策略列表
    strategyList: [],
    // 当前编辑中的策略
    currentStrategyDetail: {},
  },

  effects: {
    /**
     * 获得策略列表数据
     *
     * @param {*} action
     * @param {*} { call, put }
     */
    *getStrategyList(action, { call, put }) {
      const response = yield call(getStrategyList);
      yield put({
        type: 'update',
        payload: {
          strategyList: response,
        },
      });
    },

    /**
     * 获得策略详情
     *
     * @param {*} { payload }
     * @param {*} { call, put }
     */
    *getStrategyDetail({ payload }, { call, put }) {
      const response = yield call(getStrategyDetail, payload);
      yield put({
        type: 'update',
        payload: {
          currentStrategyDetail: response,
        },
      });
    },

    /**
     * 更新策略
     *
     * @param {*} { payload }
     * @param {*} { call }
     */
    *updateStrategyDetail({ payload }, { call }) {
      yield call(updateStrategyDetail, { id: payload.id, newData: payload });
    },

    /**
     * 创建策略
     *
     * @param {*} { payload }
     * @param {*} { call }
     */
    *createStrategyDetail({ payload }, { call }) {
      yield call(createStrategyDetail, payload);
    },

    /**
     * 删除策略
     *
     * @param {*} { payload }
     * @param {*} { call }
     */
    *deleteStrategyDetail({ payload }, { call }) {
      yield call(deleteStrategyDetail, payload);
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
