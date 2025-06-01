<template>
  <div class="user-info">
    <!-- 뒤로 가기 버튼 -->
    
    <!-- 이름 -->
    <div id="userName">{{ user.userNm }}</div>
    <!-- 등록전화번호 -->
    <div id="userPhno">등록 전화번호 : {{ user.userPhno }}</div>
    <!-- 가입일 -->
    <div id="userSignupDt">가입일 : {{ user.userSignupDt }}</div>
    <!-- 보유 사업자 수 -->
    <div id="userWkspCnt">보유 유효 사업장 수 : {{ wkspCnt }}</div>
  </div>

  <!-- 비밀번호 변경 버튼 -->

</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';


const user = ref(null); // 로그인 사용자 객체
const wkspCnt = ref(0); // 사용자의 사업장 수

// 사용자 정보 가져오기
onMounted(async () => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    try {
      // 사용자 객체 가져오기
      const res = await axios.get(`http://localhost:8003/api/user/${userId}`,
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
    } catch (error) {
      console.error('사용자 정보를 불러오는데 실패했습니다.', error);
    }
    // 사용자 객체 저장
    user.value = res.data;

    // 사용자의 사업장 수 가져오기
    try {
      const res = await axios.get(`http://localhost:8003/api/user/wkspCnt/${userId}`,
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
    } catch (error) {
      console.error('사용자 정보를 불러오는데 실패했습니다.', error);
    }

    // 사업장 수 저장
    console.log(res.data);
    wkspCnt.value = res.data;
  }

})

</script>

<style scoped></style>