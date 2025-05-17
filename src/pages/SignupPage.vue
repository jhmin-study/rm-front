<template>
  <!-- Header -->
  <h1>Signup Page</h1>
  <main>
    <!-- STEP1. ID(Email), PW 입력 -->
    <form action="" @submit.prevent="checkId">
      <div class="form-group">
        <label for="email">이메일</label>
        <input @input="checkValidateUserId" v-model="userId" type="text" id="email" placeholder="이메일을 입력하세요.">
        <span class="errMsg">{{ userIdErrMsg }}</span>
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input @input="CheckValidatePassword" v-model="password" type="password" id="password" placeholder="비밀번호를 입력하세요.">
        <!-- 조건1 -->
        <div class="pwCondition">
          <span v-if="passwordCondition1">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                clip-rule="evenodd" />
            </svg>
          </span>
          <span v-else>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </span> 8자 이상
        </div>
        <!-- 조건2 -->
        <div class="pwCondition">
          <span v-if="passwordCondition2">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                clip-rule="evenodd" />
            </svg>
          </span>
          <span v-else>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </span> 특수문자 1개 이상
        </div>
        <!-- 조건3 -->
        <div class="pwCondition">
          <span v-if="passwordCondition3">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                clip-rule="evenodd" />
            </svg>
          </span>
          <span v-else>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </span> 영문자와 숫자 포함함
        </div>
        <!-- 제출 버튼 -->
        <div class="form-group">
          <button type="submit" class="effect-button">다음</button>
        </div>
      </div>
    </form>
    <!-- STEP2. 회원정보 작성 -->
    <form v-if="step1_flag" action="">
      <!--        이름, 생년월일, 휴대폰번호 -->
      <div class="from-group">
        <label for="userNm">이름</label>
        <input type="text" id="userNm">
      </div>
    </form>
    
    <!-- TODO - 이메일, 비밀번호 검증 후 휴대폰 인증 도입하기 -->
    
    <!-- 하단메뉴 -->
    <div>
      <p>계정이 이미 있으신가요?<RouterLink>로그인 하기</RouterLink>
      </p>
    </div>
  </main>
  <!-- Fotter -->
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';

// 변수선언
const userId   = ref(''); // ID (Email) -V-model 사용
const password = ref(''); // 비밀번호 - V-model 사용

const step1_flag = ref(false); // STEP1 Flag

const userIdErrMsg = ref(''); // ID 에러메시지
const passwordCondition1 = ref(false); // 비밀번호 조건1 - 8자 이상
const passwordCondition2 = ref(false); // 비밀번호 조건2 - 특수문자 1개이상 포함
const passwordCondition3 = ref(false); // 비밀번호 조건3 - 영문사와 숫자 포함

const isValidId = ref(false); // ID 유효성 검사
const isValidPassword = ref(false); // 비밀번호 검사

// STEP1. ID, PW 입력후 제출 -> ID 중복여부 검사
async function checkId() {
  // ID 중복여부 검사
  if (!isValidId.value || !isValidPassword.value) {
    return false;
  }
  console.log(userId.value + ' ' + password.value);
  // DB에 ID 중복여부 검사
  const res = await axios.post('http://localhost:8003/api/user/checkId',
                                { userId: userId.value });
  if (!res.data) {
    userIdErrMsg.value = '계정이 이미 존재합니다.';
    return false;
  }
  else {
    step1_flag.value = true;
    return true;
  }
}


// ============================= 유효성 검사 함수 =============================
// ID 유효성 검사
function checkValidateUserId() {
  // 이메일 형식 검사
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (userId.value.length < 1) {
    userIdErrMsg.value = '이메일을 입력하세요';
    isValidId.value = false;
  } else if (!emailPattern.test(userId.value)) {
    userIdErrMsg.value = '이메일 형식이 아닙니다.';
    isValidId.value = false;
  } else {
    userIdErrMsg.value = '';
    isValidId.value = true;
  }
}
// 비밀번호 유효성 검사
function CheckValidatePassword() {
  // 조건1 - 8자 이상
  if (password.value.length < 8) {
    passwordCondition1.value = false;
  } else {
    passwordCondition1.value = true;
  }
  // 조건2 - 특수문자 1개 이상
  // 특수문자 정규식
  
  if (password.value.search(/[!@#$%^&*()_+|~=`{}[\]:";'<>?,./]/) < 0) {
    passwordCondition2.value = false;
  } else {
    passwordCondition2.value = true;
  }
  // 조건3 - 영문자와 숫자 포함
  if (password.value.search(/[a-zA-Z]/) < 0 || password.value.search(/[0-9]/) < 0) {
    passwordCondition3.value = false;
  } else {
    passwordCondition3.value = true;
  }
  // 비밀번호 유효성 검사
  if (passwordCondition1.value &&
      passwordCondition2.value &&
      passwordCondition3.value) {
    isValidPassword.value = true;
  } else {
    isValidPassword.value = false;
  }
}


</script>
<style scoped></style>