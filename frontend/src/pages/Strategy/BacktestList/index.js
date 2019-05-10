import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Card, Table } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { BACKTEST_STATUS_TYPE } from '@/utils/const';

import styles from '../index.less';

@connect(({ backtest, loading }) => ({
  backtest,
  loading: loading.effects['strategy/getBacktestList'],
}))
class BacktestList extends PureComponent {
  columns = [
    {
      title: '回测名称',
      dataIndex: 'name',
    },
    {
      title: '回测时间',
      dataIndex: 'backtestDate',
      render: (text, { start_date, end_date }) =>
        `${moment(start_date).format('YYYY-MM-DD')}~${moment(end_date).format('YYYY-MM-DD')}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: status => BACKTEST_STATUS_TYPE[status],
    },
    {
      title: '总收益',
      dataIndex: 'totalProfit',
    },
    {
      title: '年化收益',
      dataIndex: 'yearProfit',
    },
    {
      title: '最大回撤',
      dataIndex: 'maxdropdown',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: backtestID => (
        <Fragment>
          <a onClick={() => this.gotoBacktestDetail(backtestID)} style={{ marginRight: 8 }}>
            查看详情
          </a>{' '}
          <a style={{ color: 'red' }}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.getBacktestList();
  }

  /**
   * 获得回测列表
   *
   * @memberof BacktestList
   */
  getBacktestList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'backtest/getBacktestList',
    });
  };

  /**
   * 前往回测详情
   *
   * @memberof BacktestList
   */
  gotoBacktestDetail = (backtestID = '') => {
    router.push(`/strategy/list/backtest/detail/${backtestID}`);
  };

  render() {
    const { backtest } = this.props;
    const { backtestList } = backtest;
    return (
      <PageHeaderWrapper title="回测列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table rowKey="id" dataSource={backtestList} columns={this.columns} />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BacktestList;
