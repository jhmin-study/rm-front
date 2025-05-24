<template>
    <form @submit.prevent="checkAuthNo">
      <div class="form-group">
        <label for="authNo">인증번호</label>
        <input v-model="inputAuthNo" type="text" id="authNo">
      </div>
      <div class="form-group">
        <button type="submit" class="effect-button">인증</button>
      </div>
    </form>  
</template>
<script setup>
import { ref, onMounted, defineEmits } from 'vue';

const authNo = ref('');      // 인증번호
const inputAuthNo = ref(''); // 입력한 인증번호

// 이벤트 정의. 자식 컴포넌트에서는 이름만 정의, 부모에서 이벤트 함수 구현
// 자식 컴포넌트에서는 emit() 메소드로 부모에게 이벤트 전달함.
const emit = defineEmits(['success', 'fail']);

onMounted(() => {
// TODO : 회원정보 작성 후 인증API 호출
  // TODO : 인증API는 검토 후 추후 개발.
  // 배포 전까지는 alert 창에서 인증번호 제공하는 것으로 대체함.
  // 인증번호 : 난수로 생성하여 백엔드 거치지 않고 인증처리함.
  // 인증번호 형식 : 6자리 숫자
    authNo.value = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    alert('인증번호 :' + authNo.value);
})

// STEP3. 인증번호 확인
function checkAuthNo() {
  // 인증번호 확인
  if (authNo.value === inputAuthNo.value) {
    emit('success');
    return true;
  } else {
    emit('fail');
    return false;
  }
}

</script>
<style scoped></style>