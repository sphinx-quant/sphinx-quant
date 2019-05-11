import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Card, Table, Popconfirm } from 'antd';
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
          <Popconfirm
            onConfirm={() => this.deleteBacktest(backtestID)}
            title="是否确认删除？"
            okText="Yes"
            cancelText="No"
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
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

  /**
   * 删除回测
   *
   * @memberof BacktestList
   */
  deleteBacktest = async (backtestID = '') => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'backtest/deleteBacktestDetail',
      payload: backtestID,
    });
    this.getBacktestList();
  };

  render() {
    const { backtest, loading } = this.props;
    const { backtestList } = backtest;
    return (
      <PageHeaderWrapper title="回测列表">
        <Card loading={loading} bordered={false}>
          <div className={styles.tableList}>
            <Table rowKey="id" dataSource={backtestList} columns={this.columns} />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BacktestList;
