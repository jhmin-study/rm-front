<template>
<!--header-->
<main>
<UsageComponent :is-edit="false"/>
</main>
<!--footer---->
</template>

<script setup>

import UsageComponent from '@/assets/components/UsageComponent.vue';

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