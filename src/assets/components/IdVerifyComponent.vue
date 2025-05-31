<template>
  <form class="login-container" @submit.prevent="()=>{if(sendAuthnoFlag) {checkAuthNo()} else { sendAuthNo()}}">
    <div class="form-group">
      <label for="user-nm">이름</label>
      <input type="text" id="user-nm" :disabled="sendAuthnoFlag" v-model="userNm" placeholder="이름을 입력하세요.">
      <p>{{ userNmErrMsg }}</p>
    </div>
    <div class="form-group">
      <label for="user-phno">전화번호</label>
      <input type="text" id="user-phno" :disabled="sendAuthnoFlag" v-model="userPhno" placeholder="전화번호를 입력하세요.">
      <p>{{ userPhnoErrMsg }}</p>
    </div>

    <div class="form-group" v-if="sendAuthnoFlag">
      <label for="inputAuthNo">인증번호</label>
      <input v-model="inputAuthNo" type="text" id="authNo">
      <p>{{ sendAuthMsg }}</p>
    </div>

    <div class="form-group">
      <button type="submit" class="effect-button">{{sendAuthnoFlag ?'인증' : '인증번호 발송'}}</button>

    </div>
  </form>
  
</template>
<script setup>
import axios from 'axios';
import { ref, defineEmits } from 'vue';

const inputAuthNo = ref(''); // 입력한 인증번호

// 이벤트 정의. 자식 컴포넌트에서는 이름만 정의, 부모에서 이벤트 함수 구현
// 자식 컴포넌트에서는 emit() 메소드로 부모에게 이벤트 전달함.
const emit = defineEmits(['success', 'fail']);

const props = defineProps({
  userId: {String, require: true}
})

// 회원가입 시 - 이름하고 전화번호는 부모 컴포넌트에서 받아옴.
// 그 외 업무에서는 사용하지 않음.
const userId         = ref(props.userId);
const userNm         = ref('');
const userNmErrMsg   = ref('');
const userPhno       = ref('');
const userPhnoErrMsg = ref('');

const isValidUserNm  = ref(false);
const isValidUserPhno = ref(false);

const sendAuthMsg = ref('');

const sendAuthnoFlag = ref(false);

// STEP3-1. 인증번호 발송
async function sendAuthNo() {
  // 회원명, 전화번호 유효성 검사 이후 서버로 인증번호 발송 요청
  checkValidateUserNm();
  CheckValidateUserPhno();
  if (isValidUserNm.value && isValidUserPhno.value) {
    // 인증번호 발송
    try {
      const res = await axios.post('http://localhost:8003/api/user/send-code',
        {
          userId: userId.value,
          userPhno: userPhno.value
        }
      )
      // 인증번호 발송 성공 => 인증번호 입력창 활성화
      if (res.data == 'success') {
        sendAuthMsg.value = '인증번호가 발송되었습니다.';
        sendAuthnoFlag.value = true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  else {
    return false;
  }
  return true;
}

async function checkAuthNo() {
  // 인증번호 확인
  const res = await axios.post('http://localhost:8003/api/user/checkauthno',
    {
      userId: userId.value,
      userPhno: userPhno.value,  
      password: inputAuthNo.value
    }
  )
  if (res.data == 'success') {
    emit('success', userNm.value, userPhno.value);
    return true;
  } else {
    emit('fail');
    sendAuthMsg.value='인증번호가 틀렸습니다.'
    
    return false;
  }
}


// 회원명 유효성 검사
function checkValidateUserNm() {
  if (userNm.value.length < 1) {
    userNmErrMsg.value = '이름을 입력하세요';
    isValidUserNm.value = false;
  } else {
    userNmErrMsg.value = '';
    isValidUserNm.value = true;
  }
}
// 휴대전화 번호 유효성 검사
function CheckValidateUserPhno() {
  // 휴대전화 번호 정규식 : '-'는 제외하고 작성
  const phonePattern = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4}$)/;
  if (userPhno.value.length < 1) {
    userPhnoErrMsg.value = '전화번호를 입력하세요';
    isValidUserPhno.value = false;
  } else if (!phonePattern.test(userPhno.value)) {
    userPhnoErrMsg.value = '전화번호 형식이 아닙니다.';
    isValidUserPhno.value = false;
  } else {
    userPhnoErrMsg.value = '';
    isValidUserPhno.value = true;
  }
}
</script>
<style scoped>
.form-group{
  margin-bottom: 1.5rem;
}
.effect-button{
  width: 100%;
}
/* 오류 메시지 */
.errMsg {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.2rem;
  display: block;
}
</style>