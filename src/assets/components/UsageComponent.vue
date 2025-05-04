<template>
  <form class="container" @submit.prevent="onSubmit">

    <div class="resourceId">{{ resourceId }}</div>
    
    <div class="user">
      <p>사용자 이름</p>
      <input @input="onUserInput" type="text" :value="user">
      <p>{{ userErrMsg }}</p>
    </div>
    <div class="phone">
      <p>사용자 전화번호</p>
      <input @input="onPhoneInput" type="text" :value="phone">
      <p>{{ phoneErrMsg }}</p>
    </div>
    <div class="email">
      <p>사용자 이메일</p>
      <input type="text" :value="email">
    </div>
    <div class="note">
      <p>비고란</p>
      <textarea id="userNote"></textarea>
    </div>
  </form>
</template>

<script setup>
import { defineProps,ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();U
const props = defineProps({isEdit:Boolean})

const resourceId = ref('');
resourceId.value = route.params.id;
const user = ref('사용자 이름을 입력하시오.');
const userErrMsg = ref('');
const phone = ref('사용자 전화번호를 입력하시오.');
const phoneErrMsg = ref('');
const email = ref('사용자 이메일을 입력하시오.');

function onUserInput(e){
  user.value = e.target.value;
}

function onPhoneInput(e){
  phone.value=e.target.value;
}

function validUser(){
  if(user.value == ''){
    userErrMsg.value = '이름을 입력하십시오.'
    return false;
  }
  userErrMsg.value = '';
  return true;
}

function validPhone(){
  const phonePattern = ' /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/'
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
  const isUserValidate = validUser();
  const isPhoneValidate = validPhone();
  if(isUserValidate && isPhoneValidate){
    if(!props.isEdit){
      createUsage();
    }else{
      updateUsage();
    }
  }
}

function createUsage(){

}

function updateUsage(){

}
</script>

<style scoped>

</style>