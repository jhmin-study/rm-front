<template>
<!--header---->
<main>
  <div class="loading" v-if="status=='loading'">
    Loading...
  </div>
  <div class="not-found" v-else-if="status=='Not Found'">
    Not Found
  </div>
  <div class="loaded" v-else>
    <UsageComponent :is-edit="true" :usage-info= "usageInfo"/>
  </div>
</main>
<!--footer-->
</template>

<script setup>

import UsageComponent from '@/assets/components/UsageComponent.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const status = ref("loading");
const route = useRoute();
const usageInfo = ref(null);


onMounted(async()=>{
  try{
    let res = await axios.get(`http://localhost:8003/api/resourceUsage/${route.params.resourceId}`)
    console.log(res.data);
    if(res.data == null || res.data == ''){
      status.value = "Not Found";
      return;
    }else if(res.data.resourceUsage == null || res.data.resourceUsage ==''){
      status.value = "Not Found";
      return;
    }
    usageInfo.value = res.data;
    console.log(usageInfo.value);
    status.value = "loaded"
  }catch(e){
    alert('오류 발생!');
  }
})

</script>

<style scoped>

</style>