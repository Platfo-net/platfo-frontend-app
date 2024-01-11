import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  // something to do
  const queryClient = new QueryClient();
  app.use(VueQueryPlugin, { queryClient });
})
