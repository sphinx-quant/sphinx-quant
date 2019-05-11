import React, { PureComponent } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Detail from './Detail';
import Logs from './Logs';
import TradeDetail from './TradeDetail';
import SourceCode from './SourceCode';

const TAB_KEY = {
  DETAIL: 'DETAIL',
  LOGS: 'LOGS',
  TRADE_DETAIL: 'TRADE_DETAIL',
  SOURCE_CODE: 'SOURCE_CODE',
};

@connect(({ backtest, loading }) => ({
  backtest,
  loading: loading.effects['backtest/getBacktestDetail'],
}))
class BacktestDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabKey: TAB_KEY.DETAIL,
    };
  }

  componentDidMount() {
    this.getDetailData();
  }

  /**
   * 获取回测详情数据
   *
   * @memberof Editor
   */
  getDetailData = () => {
    const { dispatch, match } = this.props;
    const backtestID = _.get(match, 'params.backtestID', '');
    if (backtestID) {
      dispatch({
        type: 'backtest/getBacktestDetail',
        payload: {
          id: backtestID,
        },
      });
    }
  };

  /**
   * 切换Tab
   *
   * @param {String} tabKey
   * @memberof BacktestDetail
   */
  onTabChange = tabKey => {
    this.setState({ tabKey });
  };

  render() {
    const {
      backtest: { currentBacktestDetail },
    } = this.props;
    const { source_code, logs } = currentBacktestDetail;
    const { tabKey } = this.state;
    return (
      <PageHeaderWrapper
        title="回测详情"
        onTabChange={this.onTabChange}
        tabList={[
          {
            key: TAB_KEY.DETAIL,
            tab: '详情',
          },
          {
            key: TAB_KEY.LOGS,
            tab: '日志记录',
          },
          {
            key: TAB_KEY.TRADE_DETAIL,
            tab: '成交记录',
          },
          {
            key: TAB_KEY.SOURCE_CODE,
            tab: '代码',
          },
        ]}
      >
        {tabKey === TAB_KEY.DETAIL && <Detail />}
        {tabKey === TAB_KEY.LOGS && <Logs logs={logs} />}
        {tabKey === TAB_KEY.TRADE_DETAIL && <TradeDetail />}
        {tabKey === TAB_KEY.SOURCE_CODE && <SourceCode code={source_code} />}
      </PageHeaderWrapper>
    );
  }
}

export default BacktestDetail;
