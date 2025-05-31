<template>
  <div class="container">
    <h2>사업장 목록</h2>
    <button class="effect-button" @click="goToCreatePage">새 사업장 등록</button>
    <div class="card-container">
      <div class="workplace-card" v-for="workplace in workplaces" :key="workplace.workplaceId">
        <h3>{{ workplace.businessName }}</h3>
        <p>{{ workplace.businessRegNo }}</p>
        <p>{{ workplace.businessTypeNm }}</p>
        <p>{{ workplace.address }}</p>
        <div class="card-buttons">
          <button class="dialog-button secondary" @click="goToEditPage(workplace.workplaceId)">수정</button>
          <button class="dialog-button secondary" @click="goToResourceList(workplace.workplaceId)">자원관리</button>
          <button class="dialog-button secondary" @click="deleteWorkplace(workplace.workplaceId)">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const workplaces = ref([]);

// 사업장 목록 조회
const fetchWorkplaces = async () => {
  try {
    const res = await axios.get('/api/workplaces' , {headers:{Authorization : localStorage.getItem('token')}});
    workplaces.value = res.data;
    console.log('📦 받은 데이터:', workplaces.value);
  } catch (error) {
    console.error('사업장 목록 불러오기 중 오류 발생:', error);
  }
};

// 사업장 등록 페이지 이동
const goToCreatePage = () => {
  router.push('/workplace/new');
};

// 사업장 수정 페이지 이동
const goToEditPage = (id) => {
  router.push(`/workplace/update/${id}`);
};

// 자원관리 페이지 이동
const goToResourceList = (id) => {
  router.push(`/workplace/${id}`);
};

// 삭제
const deleteWorkplace = async (id) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    try {
      await axios.delete(`/api/workplace/${id}`);
      await fetchWorkplaces();// 삭제 후 갱신
    } catch (error) {
      console.error('사업장 삭제 중 오류 발생:', error);
    }
  }
};

onMounted(fetchWorkplaces);
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.workplace-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.card-buttons {
  display: flex;
  margin-top: 10px;
  gap: 10px;
}

.card-buttons button{
  flex-grow: 1;
  padding: 3px;
}
@media (min-width: 600px) {
  .effect-button{
    align-self: flex-end;
  }
}
</style>
