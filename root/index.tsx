import Router from '@/router';
import { STORYBOOK_ENABLED } from '@env';
import ReactQueryProvider from '@/provider/react-query.provider';

const Root = () => {
  let AppEntryPoint = Router;

  if (STORYBOOK_ENABLED === 'true') {
    AppEntryPoint = require('../.storybook').default;
  }

  return (
    <ReactQueryProvider>
      {AppEntryPoint ? <AppEntryPoint /> : null}
    </ReactQueryProvider>
  );
};

export default Root;
