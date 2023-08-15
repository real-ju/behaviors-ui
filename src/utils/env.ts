export function getEnv() {
  // process.env.VITE_ENV 在vite.config -> define中定义
  return process.env.VITE_ENV as unknown as ViteEnv;
}
