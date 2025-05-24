<template>
<!--header-->
<main>
  <div class="resourceId">{{ resourceId }}</div>
  <div class="place">별관</div>
  <div class="status">
    <p>상태</p>
    {{ usageInfo.usageStatus }}
  </div>
  <div class="user">
    <p>사용자 이름</p>
    {{ usageInfo.resourceUserName }}
  </div>
  <div class="phone">
    <p>사용자 전화번호</p>
    {{ usageInfo.resourceUserPhone }}
  </div>
  <div class="email">
    <p>사용자 이메일</p>
    {{ usageInfo.resourceUserEmail }}
  </div>
  <div class="note">
    <p>비고란</p>
    {{ usageInfo.resourceUserNote }}
  </div>
  <div class="usageSt">
    <p>사용 시작일 입력</p>
    {{ usageInfo.usageSt }}
    <p>사용 종료일 입력</p>
    {{ usageInfo.usageEd }}
  </div>
  <button><RouterLink to="/resource/:resourceId/input">사용자 명단 추가</RouterLink></button>
  <table>
    <thead>
      <tr>
        <th>Status</th>
        <th>User Name</th>
        <th>User Phone</th>
        <th>Start</th>
        <th>End</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>{{  }}</th>
        <th>{{  }}</th>
        <th>{{  }}</th>
        <th>{{  }}</th>
        <th>{{  }}</th>
      </tr>
    </tbody>
  </table>
</main>
<!--footer-->
</template>

<script setup>

import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const usageInfo = ref(null);

onMounted(
  async()=>{
    try{
      let res = await axios.get(`http://localhost:8003/api/usage/${route.params.resourceId}`)
      usageInfo.value = res.data;
    }catch(err){
      alert('오류 발생!');
    }
  }
)

</script>

<style scoped>

</style>