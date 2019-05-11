import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Card, Button, DatePicker, Input, Select } from 'antd';
import _ from 'lodash';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import moment from 'moment';
import AceEditor from 'react-ace';
// ACE插件
import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import 'brace/keybinding/emacs';
import 'brace/snippets/python';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { RangePicker } = DatePicker;
const { Option } = Select;

const dateFormat = 'YYYY/MM/DD';

// import styles from '../index.less';

@connect(({ strategy, loading }) => ({
  strategy,
  loading: loading.effects['strategy/getStrategyDetail'],
  saveLoading: loading.effects['strategy/updateStrategyDetail'],
  startBacktestLoading: loading.effects['backtest/startBacktest'],
}))
class Editor extends PureComponent {
  /**
   * 初始化页面数据
   *
   * @memberof Editor
   */
  componentDidMount() {
    this.getDetailData();
  }

  /**
   * 离开页面清除缓存数据
   *
   * @memberof Editor
   */
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'strategy/update',
      payload: {
        currentStrategyDetail: {},
      },
    });
  }

  /**
   * 获取详情数据
   *
   * @memberof Editor
   */
  getDetailData = () => {
    const { dispatch, match } = this.props;
    const strategyID = _.get(match, 'params.strategyID', '');
    if (strategyID) {
      dispatch({
        type: 'strategy/getStrategyDetail',
        payload: {
          id: strategyID,
        },
      });
    }
  };

  /**
   * 修改当前策略的数据，并且更新
   *
   * @param {String} path 对象路径
   * @param {*} value 修改的值
   * @memberof Editor
   */
  changeCurrentDetailAndUpdate = async (path, value) => {
    const {
      dispatch,
      strategy: { currentStrategyDetail },
    } = this.props;
    _.set(currentStrategyDetail, path, value);
    await dispatch({
      type: 'strategy/update',
      payload: {
        currentStrategyDetail,
      },
    });
    this.updateDetail(currentStrategyDetail);
  };

  /**
   * 策略代码发生变化
   *
   * @memberof Editor
   */
  onCodeChange = async code => {
    this.changeCurrentDetailAndUpdate('source_code.code_text', code);
  };

  /**
   * 策略名称发生变化
   *
   * @memberof Editor
   */
  onStrategyNameChange = async event => {
    const name = event.target.value;
    this.changeCurrentDetailAndUpdate('name', name);
  };

  /**
   * 回测按钮点击
   *
   * @memberof Editor
   */
  onBacktest = async () => {
    const { dispatch, match } = this.props;
    const strategyID = _.get(match, 'params.strategyID', '');

    await dispatch({
      type: 'backtest/startBacktest',
      payload: {
        strategyID,
      },
    });
    router.push(`/strategy/list/backtest/list/${strategyID}`);
  };

  /**
   * 保存按钮点击
   *
   * @memberof Editor
   */
  onSave = () => {
    const {
      dispatch,
      strategy: { currentStrategyDetail },
    } = this.props;
    dispatch({
      type: 'strategy/updateStrategyDetail',
      payload: currentStrategyDetail,
    });
  };

  /**
   * 更新数据（延时3000毫秒）
   *
   * @param {*} newData
   * @memberof Editor
   */
  @Bind()
  @Debounce(3000)
  updateDetail(newData) {
    const { dispatch } = this.props;
    dispatch({
      type: 'strategy/updateStrategyDetail',
      payload: newData,
    });
  }

  render() {
    const { strategy, loading, saveLoading, startBacktestLoading } = this.props;
    const { currentStrategyDetail } = strategy;
    const action = (
      <Fragment>
        <span>
          <Select defaultValue="minute" style={{ width: 120, marginRight: 10 }}>
            <Option value="minute">分钟</Option>
            <Option value="tick">Tick</Option>
            <Option value="day">每日</Option>
          </Select>
        </span>
        <span>
          <Input style={{ width: 120, marginRight: 10 }} placeholder="vt_symbol" />
        </span>
        <RangePicker
          style={{ width: 350, marginRight: 10 }}
          defaultValue={[moment('2015/01/01', dateFormat), moment('2019/01/01', dateFormat)]}
          format={dateFormat}
        />
        <Button
          style={{ width: 100 }}
          onClick={this.onBacktest}
          loading={startBacktestLoading}
          type="default"
        >
          回测
        </Button>
        <Button style={{ width: 100 }} onClick={this.onSave} loading={saveLoading} type="primary">
          保存
        </Button>
      </Fragment>
    );
    const editorTitle = (
      <Input onChange={this.onStrategyNameChange} value={currentStrategyDetail.name} />
    );

    return (
      <PageHeaderWrapper action={action} title={editorTitle}>
        <Card loading={loading} bodyStyle={{ padding: 0 }}>
          <AceEditor
            maxLines={Infinity}
            minLines={35}
            width="100%"
            placeholder="SphinxQuant"
            mode="python"
            theme="monokai"
            name="blah2"
            // onLoad={this.editorDidMount}
            onChange={this.onCodeChange}
            fontSize={14}
            showPrintMargin
            showGutter
            highlightActiveLine
            value={_.get(currentStrategyDetail, 'source_code.code_text', '')}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 4,
              newLineMode: true,
            }}
            commands={[
              {
                name: 'saveCode',
                bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
                exec: this.onSave,
              },
            ]}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Editor;
