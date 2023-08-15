import { ENVS_BY_CLIENT } from './constant';
import { resolve } from 'path';

export function wrapEnv(env: ViteEnv) {
  const CLIENT = process.env.CLIENT;
  if (!CLIENT) {
    return env;
  }

  env.CLIENT = CLIENT;

  ENVS_BY_CLIENT.forEach((item) => {
    if (Reflect.has(env, item)) {
      const envMap = JSON.parse(env[item]);
      if (envMap) {
        env[item] = envMap[CLIENT];
      }
    }
  });

  return env;
}

export function pathResolve(dir: string) {
  return resolve(process.cwd(), dir);
}
