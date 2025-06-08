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
    <h3>자원 이름: {{ usageNresourceInfo.resourceName }}</h3>
  </div>
  <div class="place">위치: {{ usageNresourceInfo.place }}</div>
  <div class="button-wrapper">
    <RouterLink :to="`/resource/${resourceId}/history`"><button class="history-btn">사용자 히스토리 조회</button></RouterLink>
    <RouterLink :to="`/resource/${resourceId}/update`"><button class="edit-btn">사용자 정보 수정</button></RouterLink>
  </div>
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
  <button class="addUser"><RouterLink :to="`/resource/${resourceId}/input`">예약자 추가</RouterLink></button>
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="future in futureUsageInfo" :key="future.usageId" >
          <td>{{ future.resourceUserName }}</td>
          <td>{{  future.resourceUserPhone }}</td>
          <td>{{ future.resourceUserEmail }}</td>
          <td>{{ future.resourceUserNote }}</td>
          <td>{{ future.usageSt }}</td>
          <td>{{ future.usageEd }}</td>
          <td><button @click="onDeleteBtnClick" class="modify-btn">삭제</button></td>
          <DialogPopup
                  :visible="showDialog"
                  title="예약자 삭제"
                  message="정말 삭제하시겠습니까?"
                  dialog-type="confirm"
                  button-confirm-text="확인"
                  button-cancel-text="취소"
                  @confirm="deleteResourceUser(future.usageId)"
                  @cancel ="deleteCancel"
                  />
        </tr>
      </tbody>
    </table>
    <DialogPopup :visible="isVisible" title="Success" message="삭제되었습니다." @confirm="refresh" />
  </div>
  <RouterLink :to="`/workplace/${usageNresourceInfo.workplaceId}`"><button class="back-to-list">목록으로</button></RouterLink>
</main>
<!--footer-->
</template>

<script setup>
import DialogPopup from '@/components/DialogPopup.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
// import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const isVisible = ref(false);
const route = useRoute();
// const router = useRouter();

const resourceId = ref(route.params.resourceId);
const usageNresourceInfo = ref(null);
const futureUsageInfo = ref(null);
const status = ref("loading");
const status2 = ref(false);
const showDialog = ref(false);

const refresh = ()=>{
  // router.replace(`/resource/${route.params.resourceId}`);
  // location.reload(true);
  isVisible.value=false;
}

const deleteCancel = () => {
  showDialog.value=false;
};

onMounted(
  async()=>{
    try{
      let res = await axios.get(`http://localhost:8003/api/resourceUsage/${route.params.resourceId}`)
      usageNresourceInfo.value = res.data;
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

function onDeleteBtnClick(){
  showDialog.value=true
}

async function deleteResourceUser(id) {
  try{
      const res = await axios.delete(`http://localhost:8003/api/usage/${id}`)
      console.log(id);
      if(res.data == '성공'){
        isVisible.value=true;
        showDialog.value=false;
        // router.replace(`/resource/${route.params.resourceId}`);
        futureUsageInfo.value = futureUsageInfo.value.filter((el) => el.usageId != id);
      }else{
        alert('삭제 실패');
      }
    
  }catch(err){
    alert('오류 발생!');
  }
}

</script>

<style scoped>
body {
  padding: 1.5em;
  background: #f5f5f5
}

/* 사용자 정보 박스 전체 스타일 */
.resourceId,
.resourceName,
.place,
.resource-user {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;
  line-height: 1.6;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem; /* 버튼 간 여백 */
  flex-wrap: nowrap;
}
.edit-btn, .history-btn {
  background-color: #ffffff;
  border: solid 1px #ddd;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  color: #0c64d8;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.95rem;
}

.edit-btn:hover, .history-btn:hover {
  background-color: #43a047;
  color: white;
}

.edit-btn a {
  text-decoration: none;
  color: #0c64d8;
  font-weight: bold;
}


/* 내부 항목 정돈 */
.resource-user > div {
  margin-bottom: 0.5rem;
}

/* 항목 이름 강조 */
.resource-user p {
  margin: 0;
  font-weight: 600;
  color: #333;
}
/* 사용자 명단 추가 버튼 - 고유 클래스 기반 */
.addUser {
  background-color: #4CAF50;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.95rem;
}

.addUser:hover {
  background-color: #43a047;
}

.addUser a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

/* 예약자 명단 제목 스타일 */
.reservation > p {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.5rem;
  border-left: 4px solid #4CAF50;
  background-color: #f1f8f4;
  color: #2e7d32;
}

table {
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
  border-top: #000000 solid 1px;
  border-bottom: #000000 solid 1px;
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
.modify-btn {
  background-color: #e0e0e0; /* 연한 회색 배경 */
  border: 1px solid #bdbdbd; /* 테두리 */
  border-radius: 4px;
  padding: 0.3rem 0.6rem; /* 더 얇고 작게 */
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  font-size: 0.8rem;
  color: #424242; /* 짙은 회색 글씨 */
}

.modify-btn:hover {
  background-color: #d6d6d6;
  border-color: #9e9e9e;
}
.back-to-list {
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

.back-to-list:hover {
  background-color: #e0e0e0;
  border-color: #999;
}

</style>