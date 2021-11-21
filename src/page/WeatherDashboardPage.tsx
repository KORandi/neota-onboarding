import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';

const IWeatherDashboardPage: React.FunctionComponent = function () {
  const title = 'Dashboard';

  return (
    <DefaultLayout title={title}>
      <h1>Hello world!#2</h1>
    </DefaultLayout>
  );
};

export default IWeatherDashboardPage;
