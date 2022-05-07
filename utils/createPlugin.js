export function createPlugin(compName, compInstance) {
  return {
    install: function (Vue, options) {
      Vue.component(compName, compInstance);
    },
  };
}
