<template>
  <div>
   Chart
   <button v-on:click="getMesurements">Hi</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  ready: () => {
    console.log('ready');
    this.getMesurements();
  },
  data() {
    console.log('data');
    return {
      mesurements: null,
    };
  },
  methods: {
    getMesurements() {
      console.log('mesurments', this);
      this.$http
        .get('https://api.thingspeak.com/channels/116913/fields/1.json?results=20', (data) => {
          console.log('success', data);
          this.mesurements = data;
        })
        .error(err => console.log(err));
    },
  },
};
</script>


<style scoped>
</style>
