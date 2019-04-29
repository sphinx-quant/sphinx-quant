import React, { PureComponent } from 'react';
import { Card, Col, Row, Icon, Tooltip } from 'antd';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Pie } from '@/components/Charts';

export default class Workers extends PureComponent {
  goToTerminal = () => {
    router.push('/workers/list/terminal');
  };

  render() {
    const pingDealy = 30;
    const terminalIcon = (
      <span>
        <span style={{ marginRight: 20, color: pingDealy > 50 ? 'red' : 'green' }}>
          {pingDealy}ms
        </span>
        <Tooltip title="SSH Terminal">
          <a>
            <Icon style={{ fontSize: 20 }} onClick={() => this.goToTerminal()} type="code" />
          </a>
        </Tooltip>
      </span>
    );
    return (
      <PageHeaderWrapper title="节点管理">
        <div>
          <Row gutter={16}>
            <Col md={12}>
              <Card
                extra={terminalIcon}
                style={{ marginBottom: 20 }}
                title="上海节点-01"
                bordered={false}
              >
                <Row>
                  <Col style={{ padding: 10 }} span={8}>
                    <Pie percent={28} subTitle="CPU" total="28%" height={140} />
                  </Col>
                  <Col style={{ padding: 10 }} span={8}>
                    <Pie percent={70} subTitle="内存" total="70%" height={140} />
                  </Col>
                  <Col style={{ padding: 10 }} span={8}>
                    <Pie percent={30} subTitle="存储" total="30%" height={140} />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}
