import React from 'react';
import Layout from '@theme/Layout';
import Redocusaurus from '../../components/Redocusaurus';

function APIDocs() {
  return (
  <Layout
    title={`API Docs`}
    description={`Open API Reference Docs for the API v3`}
  >
    <Redocusaurus spec="../../swagger-v3.json" />
  </Layout>
  );
}

export default APIDocs;