import React from 'react';
import Layout from '@theme/Layout';
import Redocusaurus from '../../components/Redocusaurus';

function APIDocs() {
  return (
  <Layout
    title={`API Docs`}
    description={`Open API Reference Docs for the API v4`}
  >
    <Redocusaurus spec="https://preprod-api-v4.sk5.kazaplan.com/v4/docs-json/" />
  </Layout>
  );
}

export default APIDocs;