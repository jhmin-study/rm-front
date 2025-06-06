<template>
  <div class="main-container">
    <h2 class="login-header">로그인</h2>
    <div >
      <form class="login-container" @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="email">이메일</label>
          <input v-model="loginId" type="text" id="email" placeholder="이메일을 입력하세요.">
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input v-model="loginPassword" type="password" id="password" placeholder="비밀번호를 입력하세요.">
          <p>{{ loginErrMsg }}</p>
        </div>
        <!-- 제출 버튼 -->
        <div class="form-group">
          <button type="submit" class="effect-button">로그인</button>
        </div>
      </form>
      <!-- 하단메뉴 -->
      <div>
        <p>계정이 없으신가요?<RouterLink to="/signup">회원가입</RouterLink></p>
        <p>비밀번호를 잊으셨나요?<RouterLink to="/changePassword">비밀번호 찾기</RouterLink></p>
      </div>
    </div>
      <DialogPopup
      :visible="showDialog"
      title="로그인 성공"
      message="로그인을 성공 했습니다!"
      button-confirm-text="확인"
      @confirm="()=>{showDialog=false; router.push('/');}"
      />
  </div>
  

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/routers';
import DialogPopup from '@/components/DialogPopup.vue';


const loginId = ref('');        // 입력한 ID(이메일)
const loginPassword = ref('');  // 입력한 비밀번호
// const user = ref(null);         // 로그인한 사용자 객체
const loginErrMsg = ref('');    // 로그인 에러 메시지

const showDialog = ref(false);

const expireTime = ref(null);

// 로그인 처리 함수
async function submitLogin() {
  
  // 입력한 ID와 비밀번호 중 입려되지 않은 항목이 있으면 에러메시지 출력
  if (loginId.value == '' || loginPassword.value == '') {
    loginErrMsg.value = '이메일과 비밀번호를 입력하세요';
    return false;
  }

  // 로그인 처리로직
  // 입력한 ID와 비밀번호를 서버에 전송하여 로그인 처리함.
  // 2025-06-06 로그인 전 userId를 로컬스토리지에 저장
  localStorage.setItem('userId', loginId.value);
  try {
    const res = await axios.post('http://localhost:8003/api/login', {
      userId: loginId.value,
      password: loginPassword.value
    });
    showDialog.value = true;
    // 로그인 성공 시
    console.log(res.headers.getAuthorization());
    console.log(res);
    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem('token', res.headers.getAuthorization());
    localStorage.setItem('userId', res.data.userId);
    // 로컬스토리지 토큰시간 갱신 -> 30분
    let tmpTime = new Date();
    tmpTime.setMinutes(tmpTime.getMinutes() + 30);
    expireTime.value = tmpTime;
    localStorage.setItem('expireTime', expireTime.value);

  } catch (error) {
    // 로그인 실패시 에러메시지 출력
    if (error.response.status == 401) {
      loginErrMsg.value = '이메일 또는 비밀번호가 일치하지 않습니다.';
    } else {
      loginErrMsg.value = '로그인에 실패했습니다. 다시 시도해주세요.';
    }
    return false;
  }

  return true;
}

</script>

<style scoped>



.form-group {
  margin-bottom: 1.5rem;
}

.effect-button{
  width: 100%;
}

p {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
}

p > a {
  color: #007bff;
  text-decoration: none;
  margin-left: 4px;
}

p > a:hover {
  text-decoration: underline;
}
</style>