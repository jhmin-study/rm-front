<template>
  <form class="container" @submit.prevent="onSubmit">

    <div class="resourceId">{{ resourceId }}</div>
    <div class="place">별관</div>
    <div class="status">
      <select v-model="resourceStatus" id="status">
        <option disabled value="default">===선택===</option>
        <option value="reserved">예약</option>
        <option value="occupied">사용</option>
        <option value="maintenance">수리</option>
      </select>
      <p>{{ statusErrMsg }}</p>
    </div>
    <div class="user">
      <p>사용자 이름</p>
      <input @input="onUserInput" type="text" :value="user" placeholder="사용자 이름을 입력하시오.">
      <p>{{ userErrMsg }}</p>
    </div>
    <div class="phone">
      <p>사용자 전화번호</p>
      <input @input="onPhoneInput" type="text" :value="phone" placeholder="사용자 전화번호를 입력하시오.">
      <p>{{ phoneErrMsg }}</p>
    </div>
    <div class="email">
      <p>사용자 이메일</p>
      <input v-model="email" type="text" placeholder="사용자 이메일을 입력하시오.">
    </div>
    <div class="note">
      <p>비고란</p>
      <textarea v-model="userNote" id="userNote" placeholder="내용을 입력하시오."></textarea>
    </div>
    <div class="usageSt">
      <p>사용 시작일 입력</p>
      <input v-model="usageSt" type="date">
      <p>사용 종료일 입력</p>
      <input v-model="usageEd" type="date">
    </div>


    <button>{{ isEdit ? '수정' : '추가'}}</button>
  </form>
</template>

<script setup>
import axios from "axios";
import { defineProps,ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const props = defineProps({isEdit:Boolean})

const resourceId = ref(route.params.resourceId);
const resourceStatus = ref('');
const statusErrMsg = ref('');
const user = ref('');
const userErrMsg = ref('');
const phone = ref('');
const phoneErrMsg = ref('');
const email = ref('');
const userNote = ref('');
const usageSt = ref('');
const usageEd = ref('');

function onUserInput(e){
  user.value = e.target.value;
}

function onPhoneInput(e){
  phone.value=e.target.value;
}

function validStatus(){
  if(resourceStatus.value === 'default'){
    statusErrMsg.value = '상태를 선택하십시오.';
    return false;
  }
  statusErrMsg.value = '';
  return true;
}

function validUser(){
  if(user.value == ''){
    userErrMsg.value = '이름을 입력하십시오.';
    return false;
  }
  userErrMsg.value = '';
  return true;
}

function validPhone(){
  const phonePattern = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
  if(phone.value==''){
    phoneErrMsg.value = '번호를 입력하십시오.'
    return false;
  }
  if(!phonePattern.test(phone.value)){
    phoneErrMsg.value='올바른 형식이 아닙니다.'
    return false;
  }
  phoneErrMsg.value = '';
  return true;
}

function onSubmit(){
  const isStatusValid = validStatus();
  const isUserValidate = validUser();
  const isPhoneValidate = validPhone();
  if(isStatusValid && isUserValidate && isPhoneValidate){
    if(!props.isEdit){
      createUsage();
    }else{
      return true;
      // updateUsage();
    }
  }
}

async function createUsage(){
  try{
    let res = await axios.post(`http://localhost/api/usage/${route.params.resourceId}`,{
      usageStatus:resourceStatus.value,
      resourceUserName:user.value,
      resourceUserPhone:phone.value,
      resourceUserEmail:email.value,
      resourceUserNote:userNote.value,
      usageSt:usageSt.value,
      usageEd:usageEd.value
    })
    if(res.data=="성공"){
      alert("성공!")
      router.replace('/workplace/:workplaceId')
    }
  }catch(error){
    alert('오류 발생!');
  }
}

// function updateUsage(){

// }
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
}
</style>