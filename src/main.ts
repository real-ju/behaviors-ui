import '@/design/index.scss';

import { createSSRApp } from 'vue';
import * as Pinia from 'pinia';
import App from './App.vue';
import { setupStore } from '@/store';
import { registerGlobComp } from '@/components/registerGlobComp';
import { setupLibrary } from '@/logics/setupLibrary';

export function createApp() {
  const app = createSSRApp(App);

  setupStore(app);

  registerGlobComp(app);

  setupLibrary(app);

  return {
    app,
    Pinia
  };
}
