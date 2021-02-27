import Vue from 'vue'
import App from './App.vue'
import VueLayers from 'vuelayers'
import SelectInteraction from 'vuelayers'
import 'vuelayers/lib/style.css'


Vue.config.productionTip = false;
Vue.use(VueLayers);
Vue.use(SelectInteraction);

new Vue({
  render: h => h(App),
}).$mount('#app')
