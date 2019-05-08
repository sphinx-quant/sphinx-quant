import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Card, Button, Table, Modal, Form, Input, Select, Popconfirm } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { STRATEGY_TYPE, MODAL_FORM_LAYOUT } from '@/utils/const';

import styles from './index.less';

const { Option } = Select;

@Form.create({ name: 'strategy' })
@connect(({ strategy, loading }) => ({
  strategy,
  loading: loading.effects['strategy/getStrategyList'],
  createLoading: loading.effects['strategy/createStrategyDetail'],
}))
class StrategyList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCreateNewStrategyModalShow: false,
    };
    this.columns = [
      {
        title: '策略名称',
        dataIndex: 'name',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '回测次数',
        dataIndex: 'bt_length',
      },
      {
        title: '类型',
        dataIndex: 'type',
        render: t => STRATEGY_TYPE[t],
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        render: time => moment(time).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.gotoEdit({ strategyID: record.id })} style={{ marginRight: 8 }}>
              编辑
            </a>
            <a onClick={() => this.gotoBacktestList(record.id)} style={{ marginRight: 8 }}>
              回测列表
            </a>
            <Popconfirm
              onConfirm={() => this.deleteStrategy(record.id)}
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
  }

  componentDidMount() {
    this.getList();
  }

  /**
   * 获得策略列表数据
   *
   * @memberof StrategyList
   */
  getList = () => {
    const { dispatch } = this.props;
    return dispatch({
      type: 'strategy/getStrategyList',
    });
  };

  /**
   * 前往编辑页面
   *
   * @memberof StrategyList
   */
  gotoEdit = async ({ strategyID }) => {
    router.push(`/strategy/list/editor/${strategyID}`);
  };

  /**
   * 删除策略
   *
   * @memberof StrategyList
   */
  deleteStrategy = async (strategyID = '') => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'strategy/deleteStrategyDetail',
      payload: strategyID,
    });
    this.getList();
  };

  /**
   * 前往回测列表页面
   *
   * @memberof StrategyList
   */
  gotoBacktestList = (strategyID = '') => {
    router.push(`/strategy/list/backtest/list/${strategyID}`);
  };

  /**
   * 弹窗控制
   *
   * @memberof StrategyList
   */
  toggleCreateModal = () => {
    const { isCreateNewStrategyModalShow } = this.state;
    this.setState({ isCreateNewStrategyModalShow: !isCreateNewStrategyModalShow });
  };

  /**
   * 创建新的策略
   *
   * @memberof StrategyList
   */
  createNewStrategy = async () => {
    const { dispatch, form } = this.props;
    form.validateFields(async (err, fieldsValue) => {
      if (err) return;
      await dispatch({
        type: 'strategy/createStrategyDetail',
        payload: fieldsValue,
      });
      this.toggleCreateModal();
      this.getList();
    });
  };

  render() {
    const { isCreateNewStrategyModalShow } = this.state;
    const {
      strategy,
      loading,
      createLoading,
      form: { getFieldDecorator },
    } = this.props;
    const { strategyList } = strategy;

    return (
      <PageHeaderWrapper title="策略列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.toggleCreateModal}>
                新建
              </Button>
            </div>
            <Table rowKey="id" loading={loading} dataSource={strategyList} columns={this.columns} />
          </div>
        </Card>
        {isCreateNewStrategyModalShow && (
          <Modal
            title="新建策略"
            visible={isCreateNewStrategyModalShow}
            onOk={this.createNewStrategy}
            confirmLoading={createLoading}
            onCancel={this.toggleCreateModal}
          >
            <Form {...MODAL_FORM_LAYOUT}>
              <Form.Item label="策略名称">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: '请输入策略名称',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="策略类型">
                {getFieldDecorator('type', {
                  rules: [
                    {
                      required: true,
                      message: '请输入策略类型',
                    },
                  ],
                })(
                  <Select>
                    {_.keys(STRATEGY_TYPE).map(key => (
                      <Option key={key} value={key}>
                        {STRATEGY_TYPE[key]}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="策略描述">
                {getFieldDecorator('description', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input.TextArea rows={4} />)}
              </Form.Item>
            </Form>
          </Modal>
        )}
      </PageHeaderWrapper>
    );
  }
}

export default StrategyList;
