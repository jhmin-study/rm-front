<template>
<!--header---->
<main>
  <UsageComponent :is-edit="true" :usage-info="usageInfo"/>
</main>
<!--footer-->
</template>

<script setup>

import UsageComponent from '@/assets/components/UsageComponent.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const usageInfo = ref(null);

onMounted(async()=>{
  try{
    const res = await axios.get(`http://localhost:8003/api/usage/${route.params.resourceId}`)
    usageInfo.value = res.data;
  }catch(err){
    alert('오류 발생!');
  }
}
)


</script>

<style scoped>

</style>