<template>
  <div>
    <h2>사업장 목록</h2>
    <button @click="openPopupForCreate">새 사업장 등록</button>
    <div class="card-container">
      <div class="workplace-card" v-for="workplace in workplaces" :key="workplace.workplaceId">
        <h3>{{ workplace.businessName }}</h3>
        <p>{{ workplace.businessRegNo }}</p>
        <p>{{ workplace.businessTypeNm }}</p>
        <p>{{ workplace.address }}</p>
        <div class="card-buttons">
          <button @click="editWorkplace(workplace.workplaceId)">수정</button>
          <button @click="goToResourceList(workplace.workplaceId)">자원관리</button>
          <button @click="deleteWorkplace(workplace.workplaceId)">삭제</button>
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

const goToResourceList = (id) => {
  router.push(`/workplace/${id}`);
};

const workplaces = ref([
  {
    workplaceId: 1,
    businessName: '하늘 모텔',
    businessRegNo: '123-45-67890',
    businessTypeNm: '모텔',
    address: '전남 나주시 하늘로 123'
  },
  {
    workplaceId: 2,
    businessName: '별빛 볼링장',
    businessRegNo: '987-65-43210',
    businessTypeNm: '볼링장',
    address: '전남 나주시 별빛길 45'
  },
  {
    workplaceId: 3,
    businessName: '조용한 스터디카페',
    businessRegNo: '456-78-90123',
    businessTypeNm: '스터디카페',
    address: '전남 나주시 배움길 77'
  }
]);

const fetchWorkplaces = async () => {
  try {
    const res = await axios.get('/api/workplace');
    workplaces.value = res.data;
  } catch (error) {
    console.error('사업장 목록 불러오기 중 오류 발생:', error);
  }
};

const editWorkplace = (id) => {
  router.push(`/workplace/update/${id}`);
};

const deleteWorkplace = async (id) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    try {
      await axios.delete(`/api/workplace/${id}`);
      fetchWorkplaces();
    } catch (error) {
      console.error('사업장 삭제 중 오류 발생:', error);
    }
  }
};

const openPopupForCreate = () => {
  router.push('/workplace/new');
};

onMounted(fetchWorkplaces);
</script>

<style scoped>
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
  justify-content: space-between;
  margin-top: 10px;
}
</style>
