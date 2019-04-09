import React, { PureComponent, Fragment } from 'react';
import { Card, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from '../index.less';

export default class BacktestList extends PureComponent {
  columns = [
    {
      title: '策略名称',
      dataIndex: 'name',
    },
    {
      title: '回测时间',
      dataIndex: 'backtestDate',
    },
    {
      title: '状态',
      dataIndex: 'status',
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
      render: (_, record) => (
        <Fragment>
          <a onClick={() => this.onEdit(record.id)} style={{ marginRight: 8 }}>
            编辑
          </a>{' '}
          <a style={{ marginRight: 8 }}>回测列表</a> <a style={{ color: 'red' }}>删除</a>
        </Fragment>
      ),
    },
  ];

  render() {
    return (
      <PageHeaderWrapper title="回测列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table dataSource={[]} columns={this.columns} />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
