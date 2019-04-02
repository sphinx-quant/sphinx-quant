import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

export default class StrategyList extends PureComponent {
  constructor(props) {
    super(props);

    this.mockData = [
      {
        name: '双均线策略',
        desc: '',
        backtestTimes: 10,
        type: 'stock',
        status: 'init',
        createdAt: '2019-04-01 15:30',
      },
      {
        name: 'Dual Trust',
        desc: '经典的趋势跟踪系统',
        backtestTimes: 88,
        type: 'futures',
        status: 'init',
        createdAt: '2019-04-01 15:45',
      },
    ];
    this.columns = [
      {
        title: '策略名称',
        dataIndex: 'name',
      },
      {
        title: '描述',
        dataIndex: 'desc',
      },
      {
        title: '回测次数',
        dataIndex: 'backtestTimes',
      },
      {
        title: '类型',
        dataIndex: 'type',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        sorted: true,
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a style={{ marginRight: 8 }}>编辑</a> <a style={{ marginRight: 8 }}>回测列表</a>{' '}
            <a style={{ color: 'red' }}>删除</a>
          </Fragment>
        ),
      },
    ];
  }

  render() {
    return (
      <PageHeaderWrapper title="策略列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => {}}>
                新建
              </Button>
            </div>
            <Table dataSource={this.mockData} columns={this.columns} />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
