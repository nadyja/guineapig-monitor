import Vue from 'vue';
import App from './App';

const apiURL = 'https://api.github.com/repositories/11730342/commits?per_page=5&sha=';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    currentBranch: 'dev',
    items: [],
  },

  created: () => {
    console.log('created');
    this.fetchData();
  },

  methods: {
    fetchData: () => {
      this.$http.get(apiURL, (data) => {
        console.log('data', data);
        this.items = data;
        console.log(data);
      });
    },
  },

  render: h => h(App),
});
