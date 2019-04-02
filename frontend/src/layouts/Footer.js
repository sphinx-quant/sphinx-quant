import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={null}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019{' '}
          <a href="https://www.sphinxquant.com">SphinxQuant</a>
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
