<template>
<!--header-->
<main v-if="status=='loading'">
  <h2>Loading...</h2>
</main>
<main v-else-if="status=='Not Found'">
  <h2>404 Error</h2>
</main>
<main v-else>
  <div class="resourceId"> Id: {{ resourceId }} </div>
  <div class="resourceName">
    <h2>자원 이름: {{ usageNresourceInfo.resourceName }}</h2>
  </div>
  <div class="place">위치: {{ usageNresourceInfo.place }}</div>
  <div class="resource-user" v-if="usageNresourceInfo.resourceUsage">
    <div class="status">
      <p>상태</p>
      {{ usageNresourceInfo.resourceUsage.usageStatus }}
    </div>
    <div class="user">
      <p>사용자 이름</p>
      {{ usageNresourceInfo.resourceUsage.resourceUserName }}
    </div>
    <div class="phone">
      <p>사용자 전화번호</p>
      {{ usageNresourceInfo.resourceUsage.resourceUserPhone }}
    </div>
    <div class="email">
      <p>사용자 이메일</p>
      {{ usageNresourceInfo.resourceUsage.resourceUserEmail }}
    </div>
    <div class="note">
      <p>비고란</p>
      {{ usageNresourceInfo.resourceUsage.resourceUserNote }}
    </div>
    <div class="usageSt">
      <p>사용 시작일</p>
      {{ usageNresourceInfo.resourceUsage.usageSt }}
      <p>사용 종료일</p>
      {{ usageNresourceInfo.resourceUsage.usageEd }}
    </div>
  </div>
  <button><RouterLink :to="`/resource/${resourceId}/input`">사용자 명단 추가</RouterLink></button>
  <div class="reservation"  v-if="status2">
    <p>예약자 명단</p>
    <table>
      <thead>
        <tr>
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
          <td>{{ future.resourceUserName }}</td>
          <td>{{  future.resourceUserPhone }}</td>
          <td>{{ future.resourceUserEmail }}</td>
          <td>{{ future.resourceUserNote }}</td>
          <td>{{ future.usageSt }}</td>
          <td>{{ future.usageEd }}</td>
        </tr>
      </tbody>
    </table>
  </div>
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
      console.log(res.data)
      if(usageNresourceInfo.value =='null'||usageNresourceInfo.value ==''){
        status.value = "Not Found";
        return;
      }
      status.value = "loaded";
      let sul = await axios.get(`http://localhost:8003/api/resource/${route.params.resourceId}/futureUsage`)
      console.log(sul.data);
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
body {
  padding: 1.5em;
  background: #f5f5f5
}

table {
  border: 1px #a39485 solid;
  font-size: .9em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .25);
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
}

th {
  text-align: left;
}

thead {
  font-weight: bold;
  color: #000000;
  background: #ffffff;
  border-top: #000000 solid 2px;
  border-bottom: #000000 solid 2px;
}

td,
th {
  padding: 1em .5em;
  vertical-align: middle;
}

td {
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  background: #fff;
}

a {
  color: #73685d;
}

@media all and (max-width: 768px) {

  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  th {
    text-align: right;
  }

  table {
    position: relative;
    padding-bottom: 0;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  }

  thead {
    float: left;
    white-space: nowrap;
  }

  tbody {
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    white-space: nowrap;
  }

  tr {
    display: inline-block;
    vertical-align: top;
  }

  th {
    border-bottom: 1px solid #a39485;
  }

  td {
    border-bottom: 1px solid #e5e5e5;
  }


}
</style>