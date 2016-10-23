<template>
  <div class="pig">

   <div class="thmb">
   <img v-bind:src="image" class="" />
   <h3>{{name}}</h3>
   </div>

  </div>
</template>

<script>
export default {
  props: ['name'],
  data() {
    return {
      image: `/static/${this.name}.jpg`,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pig {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.thmb {
  width: 300px;
  height: 300px;
  border: 1px solid #fff;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}
.thmb img {
  width: 100%;
}
h3 {
  text-transform: uppercase;
  text-align: center;
  position: absolute;
  top: 80%;
  width: 100%;
  font-size: 16px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.8);
}
</style>
