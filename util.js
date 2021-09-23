export function createInstaller(compName, compInstance) {
  return function(Vue, options) {
    Vue.component(compName, compInstance);
  };
}
