import React, { PureComponent } from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

class Detail extends PureComponent {
  onClick = () => {};

  render() {
    const cols = {
      value: {
        min: 0,
      },
      year: {
        range: [0, 1],
      },
    };
    return (
      <div>
        <Card title="收益信息" style={{ marginTop: 16 }} bordered={false}>
          <Row gutter={16}>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="首个交易日" value="2016-01-18" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="最后交易日" value="2018-12-28" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="总交易日" value="721" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="盈利交易日" value="111" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="亏损交易日" value="610" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="起始资金" value="1,000,000.00" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="结束资金" value="-6,956,383.78" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="总收益率" value="-795.64%" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="年化收益" value="-264.84%" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="最大回撤" value="-7,930,720.55" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="百分比最大回撤" value="-813.96%" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="总盈亏" value="-7,956,383.78" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="总手续费" value="5,892,083.78" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="总滑点" value="1,125,420.00" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="总成交金额" value="19,640,279,280.00" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="总成交笔数" value="18757" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="日均盈亏" value="-11,035.21" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="日均手续费" value="8,172.10" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="日均滑点" value="1,560.92" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="日均成交金额" value="27,240,331.87" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="日均成交笔数" value="26.02" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="日均收益率" value="0.48%" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="收益标准差" value="10.77%" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="Sharpe Ratio" value="0.70" />
            </Col>
            <Col sm={12} md={8} lg={6} style={{ marginTop: 10, marginBottom: 10 }}>
              <Statistic title="收益回撤比" value="-0.98" />
            </Col>
          </Row>
        </Card>
        <Card title="收益曲线" style={{ marginTop: 16 }} bordered={false}>
          <Chart padding={50} height={400} data={[]} scale={cols} forceFit>
            <Axis name="year" />
            <Axis name="value" />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom type="line" position="year*value" size={2} />
            <Geom
              type="point"
              position="year*value"
              size={4}
              shape="circle"
              style={{
                stroke: '#fff',
                lineWidth: 1,
              }}
            />
          </Chart>
        </Card>
      </div>
    );
  }
}

export default Detail;
