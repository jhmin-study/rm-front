<template>
<!--header-->
<main v-if="status=='loading'">
  <h2>Loading...</h2>
</main>
<main v-else-if="status=='Not Found'">
  <h2>404 Error</h2>
</main>
<main v-else>
  <div class="resourceId">{{ resourceId }}</div>
  <div class="resourceName">{{ usageNresourceInfo.resourceName }}</div>
  <div class="place">{{ usageNresourceInfo.place }}</div>
  <div class="status">
    <p>상태</p>
    {{ usageNresourceInfo.resourceUsage?.usageStatus }}
  </div>
  <div class="user">
    <p>사용자 이름</p>
    {{ usageNresourceInfo.resourceUsage?.resourceUserName }}
  </div>
  <div class="phone">
    <p>사용자 전화번호</p>
    {{ usageNresourceInfo.resourceUsage?.resourceUserPhone }}
  </div>
  <div class="email">
    <p>사용자 이메일</p>
    {{ usageNresourceInfo.resourceUsage?.resourceUserEmail }}
  </div>
  <div class="note">
    <p>비고란</p>
    {{ usageNresourceInfo.resourceUsage?.resourceUserNote }}
  </div>
  <div class="usageSt">
    <p>사용 시작일 입력</p>
    {{ usageNresourceInfo.resourceUsage?.usageSt }}
    <p>사용 종료일 입력</p>
    {{ usageNresourceInfo.resourceUsage?.usageEd }}
  </div>
  <button><RouterLink :to="`/resource/${resourceId}/input`">사용자 명단 추가</RouterLink></button>
  <table v-if="status2">
    <thead>
      <tr>
        <th>Status</th>
        <th>User Name</th>
        <th>User Phone</th>
        <th>User Email</th>
        <th>User Note</th>
        <th>Start</th>
        <th>End</th>
      </tr>
    </thead>
    <tbody>
      <tr  v-for="future in futureUsageInfo" :key="future.usageId">
        <th>{{ future.usageStatus  }}</th>
        <th>{{ future.resourceUserName }}</th>
        <th>{{  future.resourceUserPhone }}</th>
        <th>{{ future.resourceUserEmail }}</th>
        <th>{{ future.resourceUserNote }}</th>
        <th>{{ future.usageSt }}</th>
        <th>{{ future.usageEd }}</th>
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

const resourceId = ref(route.params.resourceId);
const usageNresourceInfo = ref(null);
const futureUsageInfo = ref(null);
const status = ref("loading");
const status2 = ref(false);

onMounted(
  async()=>{
    try{
      let res = await axios.get(`http://localhost:8003/api/resourceUsage/${route.params.resourceId}`)
      usageNresourceInfo.value = res.data;
      console.log( res.data)
      if(usageNresourceInfo.value =='null'||usageNresourceInfo.value ==''){
        status.value = "Not Found";
        return;
      }
      status.value = "loaded";
      let sul = await axios.get(`http://localhost:8003/api/futureUsage/${route.params.resourceId}`)
      futureUsageInfo.value = sul.data;
      if(futureUsageInfo.value != null && futureUsageInfo.value != ''){
        status2.value = true;
      }
    }catch(err){
      alert('오류 발생!');
    }
  }
)

</script>

<style scoped>

</style>