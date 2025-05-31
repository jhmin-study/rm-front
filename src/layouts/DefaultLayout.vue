<template>
  <PageHeader/>
  <main>
    <router-view />
  </main>
  <PageFooter/>
</template>

<script setup>
import PageFooter from '@/components/PageFooter.vue';
import PageHeader from '@/components/PageHeader.vue';

</script>