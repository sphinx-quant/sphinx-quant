import React, { PureComponent, Fragment } from 'react';
import { Card, Button, DatePicker, Input, Select } from 'antd';
import moment from 'moment';
import AceEditor from 'react-ace';

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

export default class Editor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
  }

  onChange = code => this.setState({ code });

  editorDidMount = () => {};

  render() {
    const { code } = this.state;
    const action = (
      <Fragment>
        <span>
          <Select defaultValue="minute" style={{ width: 120, marginRight: 10 }}>
            <Option value="minute">分钟</Option>
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
        <Button type="default">回测</Button>
        <Button type="primary">保存</Button>
      </Fragment>
    );
    return (
      <PageHeaderWrapper action={action} title="Dual Trust">
        <Card bordered={false} bodyStyle={{ padding: 0 }}>
          <AceEditor
            height="600px"
            width="100%"
            placeholder="SphinxQuant"
            mode="python"
            theme="monokai"
            name="blah2"
            onLoad={this.editorDidMount}
            onChange={this.onChange}
            fontSize={16}
            showPrintMargin
            showGutter
            highlightActiveLine
            value={code}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 4,
            }}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
