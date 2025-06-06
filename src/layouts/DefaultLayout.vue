<template>
  <div class="wrapper">
    <PageHeader @click-user-name="showSidebar=true"/>
    <main>
      <router-view />
    </main>
    <PageFooter/>
  </div>
  <Transition name="sidebar">
    <div v-if="showSidebar" class="user-info-wrapper ">
      <button class="back-button" @click="showSidebar=false"> &#8592;</button>
      <MyPage/>
    
    </div>
  </Transition>
</template>

<script setup>
import PageFooter from '@/components/PageFooter.vue';
import PageHeader from '@/components/PageHeader.vue';
import MyPage from '@/pages/MyPage.vue';
import { ref } from 'vue';

const showSidebar = ref(false);


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

.user-info-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 480px; /* 사이드바 너비 */
  
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  background-color: #fff;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.2);

  overflow: auto;
}



.back-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #333;
  font-size: 22px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.back-button:hover {
  background-color: #e0e0e0;
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: 0.5s ease;
}

.sidebar-enter-from
{
  transform: translateX(480px);
}
.sidebar-leave-to 
{
  transform: translateX(480px);
}

</style>
