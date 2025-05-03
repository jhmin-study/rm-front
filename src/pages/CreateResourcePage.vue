<template>
<!--header---->
<main @submit.prevent="onSubmit">
  <div class="place">
    <p>해당 자원이 위치한 장소 입력 (예: 본관, 동원관 등)</p>
    <input v-model="place" type="text">
  </div>
</main>
<!--footer-->
</template>

<script setup>
import {useRoute} from 'vue-router';
const route = useRoute();
function onSubmit(){

}
</script>

<style scoped>
body{
  padding: 0px;
  margin: 0px;
}
main{
  padding: 200px;
  display: flex;
  flex-direction: column;
}
.place{
  display: flex;
  flex-direction: column;
}
</style>