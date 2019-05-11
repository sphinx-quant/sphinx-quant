import React from 'react';
import { Card } from 'antd';
import _ from 'lodash';
import AceEditor from 'react-ace';
import 'brace/theme/monokai';
import 'brace/mode/python';

export default ({ code }) => {
  return (
    <Card style={{ marginTop: 16 }} bodyStyle={{ padding: 0 }} bordered={false}>
      <AceEditor
        readOnly
        maxLines={Infinity}
        minLines={35}
        width="100%"
        mode="python"
        theme="monokai"
        name="sourceCode"
        fontSize={14}
        showPrintMargin
        highlightActiveLine
        value={_.get(code, 'code_text', '')}
      />
    </Card>
  );
};
