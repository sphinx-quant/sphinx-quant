import React from 'react';
import { Card } from 'antd';
import AceEditor from 'react-ace';
import 'brace/theme/monokai';

export default ({ logs }) => {
  return (
    <Card style={{ marginTop: 16 }} bodyStyle={{ padding: 0 }} bordered={false}>
      <AceEditor
        readOnly
        maxLines={Infinity}
        minLines={35}
        width="100%"
        mode="shell"
        theme="monokai"
        name="logs"
        fontSize={14}
        showPrintMargin
        highlightActiveLine
        value={logs || ''}
      />
    </Card>
  );
};
