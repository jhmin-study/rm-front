<template>
  <!-- 사용자의 비밀번호 변경 처리 -> 유저정보 조회 -->
  <!-- 로그인 시 비밀번호 찾기 -> 유저정보 조회 X -->
  <!-- 비밀번호 찾기면 이메일을 입력받아야 한다. -->
  <!-- STPE1. 존재하는 이메일인지 확인 -->
  <form v-if="!isLogin" @submit.prevent="CheckId" class="step1">
    <p>이메일</p>
    <input v-model="inputEmail" type="text" placeholder="이메일을 입력하하세요.">
    <p>{{ emailErrMsg }}</p>
    <button type="submit">확인</button>
  </form>
  <!-- STEP2. 휴대폰 인증 -->
  <IdVerifyComponent  v-if="step1_flag"
                  :user-id="userId"
                  :user-nm="userNm"
                  :user-phno="userPhno"
                  @success="verifySuccess"
                  @fail="vefiryFail"/>

  <!-- STEP3. 새 비밀번호 입력 -->
  <form v-if="step2_flag" @submit.prevent="changePassword" class="step3">
    <p>새 비밀번호 입력</p>
    <input v-model="newPassword" type="text" id="newPassword">
    <p>새 비밀번호 확인</p>
    <input v-model="newPasswordCheck" type="text" id="newPasswordCheck">
    <button type="submit">확인</button>
  </form>

</template>

<script setup>
import IdVerifyComponent from '@/assets/components/IdVerifyComponent.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const isLogin = ref(false); // 로그인 여부
const user = ref(null); // 로그인 사용자 객체

const inputEmail = ref(''); // 입력한 이메일
const emailErrMsg = ref('');

const step1_flag = ref(false); // STEP1 플래그
const step2_flag = ref(false); // STEP2 플래그

const newPassword = ref(''); // 새 비밀번호
const newPasswordCheck = ref(''); // 새 비밀번호 확인

const token = ref('');
const userId = ref('');

onMounted(async() => {
  // 로컬스토리지 - 토큰정보 존재 여부로 로그인 여부 확인
  token.value = localStorage.getItem('token');
  console.log(token.value)
  console.log(userId.value)
  if (token.value) {
    isLogin.value = true; // 로그인 상태
  } else {
    isLogin.value = false; // 비로그인 상태
  }

  // 로그인 상태면 회원정보 조회
  if (isLogin.value) {
    userId.value = localStorage.getItem('userId');
    try {
      const res = await axios.get(`http://localhost:8003/api/user/${userId.value}`, {
        headers: {
          Authorization: token.value
        }
      });
      user.value = res.data; // 사용자 정보 저장
      step1_flag.value = true; // STEP1 단계 건너뛰기.
    } catch (error) {
      console.error('사용자 정보를 불러오는데 실패했습니다.', error);
    }
  }
})

// STEP1. 이메일 확인
async function CheckId() {
  if (inputEmail.value == '') {
    emailErrMsg.value = '이메일을 입력하세요.';
    return false;
  }

  try {
    const res = await axios.get(`http://localhost:8003/api/user/checkId`);
    if (res.data) {
      // 이메일이 존재하는 경우
      if (res.data.userId == inputEmail.value) {
        emailErrMsg.value = '';
        step1_flag.value = true; // STEP1 완료
        isLogin.value = false;   // div태그 가리기
      }
    } else {
      emailErrMsg.value = '계정이 존재하지 않습니다.';
      step1_flag.value = false;
      return false;
    }
  } catch (error) {
    console.log(error);
    alert('서버 오류 발생!');
    return false;
  }

  return true;
}

// STEP3. 인증번호 확인
// 성공 시
async function verifySuccess() {
  step2_flag.value = true;

  // 비밀번호 변경 요청
  console.log(user);
  //const res = await axios.post("http://localhost:8003/api/user/changePassword",
  //  {
  //    
  //  }
  //);

  return true;
}

// 실패 시
// STEP2로 돌아감.
function vefiryFail() {
  alert('인증번호가 일치하지 않습니다.');
  step2_flag.value = false;
}


</script>

<style scoped></style>