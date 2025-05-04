<template>
<!--header---->
<main>
  <UsageComponent :is-edit="true" />
</main>
<!--footer-->
</template>

<script setup>

import UsageComponent from '@/assets/components/UsageComponent.vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
onMounted(async()=>{
  try{
    const res = await axios.get(`http://localhost/api/usage/${route.params.resourceId}`)
  }catch{

  }
}
)


</script>

<style scoped>

</style>