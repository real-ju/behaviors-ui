import type { App } from 'vue';

import { setupUviewPlus } from './lib/uviewPlus';

export function setupLibrary(app: App) {
  setupUviewPlus(app);
}
