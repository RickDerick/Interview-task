import Spinner from "./views/Spinner.vue";

export default {
  install(app) {
    app.component("loaderPlugin", Spinner);
  },
};
   