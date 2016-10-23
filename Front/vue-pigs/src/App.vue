<template>
  <div id="app" class="container">
    <div class="header clearfix">
      <h3 class="text-muted">Guinea Pig Internet Scale</h3>
    </div>
    <div class="jumbotron">
      <chart></chart>
    </div>
    <div class="row">
      <div class="col col-xs-6">
        <pig name="gryzelda"></pig>
      </div>
      <div class="col col-xs-6">
        <pig name="hrumhilda"></pig>
      </div>
    </div>
  </div>
</template>

<script>
import Pig from './components/Pig';
import Chart from './components/Chart';

export default {
  name: 'app',
  components: {
    Pig,
    Chart,
  },
};
</script>

<style>

</style>
