import type { App } from 'vue';

import uviewPlus from 'uview-plus';

export function setupUviewPlus(app: App) {
  app.use(uviewPlus);
}
