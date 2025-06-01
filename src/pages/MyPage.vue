<template>
  <div v-if="userInfo ==null">
    User 정보를 불러오는 중입니다.
  </div>
  <div class="user-profile" v-else>
    <div class="card-header">
      <button class="back-button" @click="goBack"> &#8592;</button>
      <h2 class="title">{{userInfo.userNm}}</h2>
    </div>
    <div class="info-item">
      <span class="label">전화번호</span>
      <span class="value">{{userInfo.userPhno}}</span>
      <span class="label">가입일</span>
      <span class="value">{{userInfo.signupDt}}</span>
      <span class="label">사업장 수</span>
      <span class="value">{{'user get 메서드에 사업장 수가 없음'}}</span>
    </div>
    <div class="button-group">
      <button class="btn update-btn">정보 수정하기</button>
      <button class="btn password-btn">비밀번호 변경</button>
    </div>
  </div>

</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const userInfo = ref(null);


async function getUserInfo(){
  //TODO : user id가 없는 경우 확인해야 함. 오류처리 확인해야함
  try{
    const res = await axios.get(`/api/user/${localStorage.getItem('userId')}`, {
      headers : {Authorization : localStorage.getItem('token')}
    });
  
    userInfo.value = res.data;
  }catch(e){
    alert('오류 처리 필요..');
  }

}

onMounted(()=>{
  getUserInfo();
});

function goBack(){
  window.history.back();
}
</script>

<style scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  max-width: 380px;
  margin: 40px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fafafa;
  font-family: 'Noto Sans KR', sans-serif;
}

.card-header{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
}

.title {
  font-size: 22px;
  text-align: center;
  color: #2c3e50;
}

.info-item {
  align-self: flex-end;
  display: grid;
  grid-template-columns: auto 1fr;
  row-gap: 30px;
  column-gap: 60px;
  margin-bottom: 15px;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.label {
  font-weight: bold;
  color: #555;
}

.value {
  color: #333;
}

.button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.update-btn {
  background-color: #2980b9;
  color: white;
}

.update-btn:hover {
  background-color: #1f618d;
}

.password-btn {
  background-color: #27ae60;
  color: white;
}

.password-btn:hover {
  background-color: #1e8449;
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


</style>