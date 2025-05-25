<template>
<!--header-->
<main>
<UsageComponent :is-edit="false" :resource-info="resourceInfo"/>
</main>
<!--footer---->
</template>

<script setup>

import UsageComponent from '@/assets/components/UsageComponent.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const resourceInfo = ref(null);

onMounted(async()=>{
  try{
    const res = await axios.get(`http://localhost:8003/api/resource/${route.params.resourceId}`);
    resourceInfo.value = res.data;
  }catch(e){
    alert('오류 발생!');
  }
})

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
</style>