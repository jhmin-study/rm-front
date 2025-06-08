<template>
  <div class="loading" v-if="status=='loading'">
    loading...
  </div>
  <div class="not-found" v-else-if="status=='not found'">
    Not Found
  </div>
  <main v-else>
    <h3>자원 히스토리</h3>
    <br>
    <table>
      <thead>
        <tr>
          <th>User Name</th>
          <th>User Phone</th>
          <th>User Email</th>
          <th>Start</th>
          <th>End</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="resource in resourceList" :key="resource.usageId" >
          <td>{{ resource.resourceUserName }}</td>
          <td>{{  resource.resourceUserPhone }}</td>
          <td>{{ resource.resourceUserEmail }}</td>
          <td>{{ resource.usageSt }}</td>
          <td>{{ resource.usageEd }}</td>
        </tr>
      </tbody>
    </table>
    <RouterLink :to="`/resource/${resourceId}`">
      <button class="backtotheusage">돌아가기</button>
    </RouterLink>
  </main>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const resourceList = ref([]);
const route = useRoute();
const resourceId = ref(route.params.resourceId);
const status = ref("loading");

onMounted(async()=>{
  try{
    const res = await axios.get(`http://localhost:8003/api/resource/${resourceId.value}/usage/history`)
    if(res.data=='' || res.data==null){
      status.value ="not found";
      return;
    }
    resourceList.value = res.data;
    status.value="complete";
  }catch(err){
    alert('오류 발생!');
  }
})
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
  border-radius: 5px;
  overflow: hidden;
}

th {
  text-align: left;
}

thead {
  font-weight: bold;
  color: #fff;
  background: #2c3e50;
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
/* 추가 버튼 스타일 (오른쪽 아래 + 버튼) */
.add-mode {
  margin-top: 1rem;
  background-color: #e0e0e0;
  color: #424242;
  border: 1px solid #bdbdbd;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-mode:hover {
  background-color: #d0d0d0;
}

/* 입력행의 추가 버튼 (tr 안에 있는 '추가' 텍스트 버튼) */
.save-btn{
  padding: 0.3rem 0.7rem;
  font-size: 0.8rem;
  background-color: #bdbdbd;
  color: #212121;
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.save-btn:hover {
  background-color: #9e9e9e;
}

input[type="text"] {
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  background-color: #f9f9f9;
  color: #333;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 95%;
  box-sizing: border-box;
}

input[type="text"]:focus {
  border-color: #90a4ae;
  box-shadow: 0 0 3px rgba(144, 164, 174, 0.5);
  outline: none;
}
.backtotheusage {
  display: block;
  margin: 2rem auto 0 auto; /* 위 여백 + 가운데 정렬 */
  padding: 0.6rem 1.8rem;
  font-size: 0.9rem;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 6px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  max-width: 200px;
}

.backtotheusage:hover {
  background-color: #e0e0e0;
  border-color: #999;
}

</style>