<template>
<!--header-->
<main>
  <div v-if="status=='loading'" class="loading">
    loading...
  </div>
  <div v-else-if="status=='not found'" class="not-found">
    Not Found
  </div>
  <div v-else class="complete">
    <UsageComponent :is-edit="false" :resource-info="resourceInfo"/>
  </div>
</main>
<!--footer---->
</template>

<script setup>

import UsageComponent from '@/assets/components/UsageComponent.vue';
import axios from 'axios';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const resourceInfo = ref(null);
const status = ref("loading");

onMounted(async()=>{
  const res = await axios.get(`http://localhost:8003/api/resource/${route.params.resourceId}`);
  console.log(res);
  if(res.data == null || res.data == ''){
    status.value = "not found";
    return;
  }
  resourceInfo.value = res.data;
  console.log(resourceInfo.value);
  status.value = "completed"
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