import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

export default class Terminal extends PureComponent {
  componentDidMount() {
    // TODO:fetch
  }

  render() {
    return (
      <PageHeaderWrapper title="上海节点-01">
        <div>
          <iframe
            title="terminal"
            style={{ width: '100%', height: 600, border: 'none', margin: 0, padding: 0 }}
            src="http://127.0.0.1:57575"
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}
