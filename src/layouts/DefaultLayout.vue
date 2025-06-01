<template>
  <div class="wrapper">
    <PageHeader/>
    <main>
      <router-view />
    </main>
    <PageFooter/>
  </div>
</template>

<script setup>
import PageFooter from '@/components/PageFooter.vue';
import PageHeader from '@/components/PageHeader.vue';

</script>

<style scoped>
.wrapper{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main{
  padding: 20px;
  flex-grow: 1;
}
</style>
