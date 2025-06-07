<template>
  <div class="container">
    <h2>사업장 목록</h2>

     <!-- 로딩 중일 때 로딩 이미지 표시 -->
     <div v-if="isLoading" class="loading-container">
      <img src="@/assets/loading.gif" alt="로딩 중..." class="loading-image" />
    </div>
    <div v-else-if = "workplaces.length == 0">
        등록된 사업장이 없습니다. 새로 등록해주세요
    </div>
    <button class="effect-button" @click="goToCreatePage">새 사업장 등록</button>
    <div class="card-container"> 
      <WorkplaceCard v-for="workplace in workplaces" :key="workplace.workplaceId" :workplace="workplace" @delete-workplace="fetchWorkplaces"/>

    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import WorkplaceCard from '@/components/WorkplaceCard.vue';

const router = useRouter();
const workplaces = ref([]);
const isLoading = ref(true);

// 사업장 목록 조회
const fetchWorkplaces = async () => {
  try {
    const res = await axios.get('/api/workplaces' , {headers:{Authorization : localStorage.getItem('token')}});
    workplaces.value = res.data;
    console.log('📦 받은 데이터:', workplaces.value);
  } catch (error) {
    console.error('사업장 목록 불러오기 중 오류 발생:', error);
  } finally {
    isLoading.value = false; // 완료 시 로딩 종료
  }
};



// 사업장 등록 페이지 이동
const goToCreatePage = () => {
  router.push('/workplace/new');
};


onMounted(fetchWorkplaces);
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
}
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}

.loading-image {
  width: 60px;
  height: 60px;
}

@media (min-width: 600px) {
  .effect-button{
    align-self: flex-end;
  }
}

</style>
