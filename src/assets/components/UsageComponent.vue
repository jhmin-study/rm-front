<template>
  <form class="container" @submit.prevent="onSubmit">
    <div class="resource-info">
      <h3> 자원 정보 </h3>
      <div class="resourceId">ID: {{ resourceId }}</div>
      <div class="resource-name">이름: {{ resourceInfo?.resourceName || usageInfo?.resourceName }} </div>
      <div class="place">위치: {{resourceInfo?.place || usageInfo?.place }}</div>
    </div>
      <div class="status">
        <p>상태</p>
        <select v-model="resourceStatus" id="status">
          <option disabled value="default">===선택===</option>
          <option value="예약">예약</option>
          <option value="사용중">사용중</option>
          <option value="수리">수리</option>
        </select>
        <p id="err-msg">{{ statusErrMsg }}</p>
      </div>
      <div class="user">
        <p>사용자 이름</p>
        <input @input="onUserInput" type="text" :value="user" placeholder="사용자 이름을 입력하시오.">
        <p id="err-msg">{{ userErrMsg }}</p>
      </div>
      <div class="phone">
        <p>사용자 전화번호</p>
        <input @input="onPhoneInput" type="text" :value="phone" placeholder="사용자 전화번호를 입력하시오.(형식: 010-0000-0000)">
        <p id="err-msg">{{ phoneErrMsg }}</p>
      </div>
      <div class="email">
        <p>사용자 이메일</p>
        <input v-model="email" type="text" placeholder="사용자 이메일을 입력하시오.">
      </div>
      <div class="note">
        <p>비고란</p>
        <textarea v-model="userNote" id="userNote" placeholder="내용을 입력하시오."></textarea>
      </div>
      <div class="period">
        <p>사용일 입력</p>
        <VueDatePicker v-if="isEdit" v-model="selectedRange" range :enable-time-picker="false"
        placeholder="예약할 날짜 범위 선택"
        :min-date="new Date()"
        :disabled-dates="disabledDatesExceptThis"
        />
        <VueDatePicker v-else v-model="selectedRange" range :enable-time-picker="false"
        placeholder="예약할 날짜 범위 선택"
        :min-date="new Date()"
        :disabled-dates="disabledDates"
        />
      </div>
      <DialogPopup v-if="isEdit" 
      :visible="isVisible" 
      title="Success" 
      message="수정되었습니다." 
      @confirm="refreshModified" />
      <DialogPopup v-else
      :visible="isVisible" 
      title="Success" 
      message="추가되었습니다." 
      @confirm="refreshAdded" />

    <button class="submit-btn">{{ isEdit ? '수정' : '추가'}}</button>
    <button @click="onDeleteBtn" class="delete-btn" v-if="isEdit">삭제</button>
  </form>
</template>

<script setup>
import axios from "axios";
import { defineProps,onMounted,ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const props = defineProps({isEdit:Boolean, usageInfo:Object, resourceInfo:Object})

const isVisible = ref(false);
const refreshAdded = ()=>{
  isVisible.value=false;
}
const refreshModified = ()=>{
  isVisible.value=false;
}

const resourceId = ref(route.params.resourceId);
const disabledDates = ref([]);
const disabledDatesExceptThis = ref([]);

onMounted(async()=>{
  if(props.isEdit){
    const disD = await axios.get(`http://localhost:8003/api/resource/${route.params.resourceId}/another/usedDate`);
    disabledDatesExceptThis.value = disD.data;
  }else{
    const dis = await axios.get(`http://localhost:8003/api/resource/${route.params.resourceId}/usedDate`)
    disabledDates.value = dis.data;
  }
});

const resourceStatus = ref((props.isEdit && props.usageInfo.resourceUsage) ? props.usageInfo.resourceUsage.usageStatus : "default");
const statusErrMsg = ref('');
const user = ref(props.usageInfo?.resourceUsage.resourceUserName);
const userErrMsg = ref('');
const phone = ref(props.usageInfo?.resourceUsage.resourceUserPhone);
const phoneErrMsg = ref('');
const email = ref(props.usageInfo?.resourceUsage.resourceUserEmail);
const userNote = ref(props.usageInfo?.resourceUsage.resourceUserNote);
const selectedRange = ref(props.usageInfo?.[ props.usageInfo.usageSt, props.usageInfo.usageEd])

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

function formatDateToYMD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}` ;
}

function onSubmit(){
  const isStatusValid = validStatus();
  const isUserValidate = validUser();
  const isPhoneValidate = validPhone();
  if(isStatusValid && isUserValidate && isPhoneValidate){
    if(!props.isEdit){
      createUsage();
    }else{
      updateUsage();
    }
  }
}

async function createUsage(){
  try{
    const target = {
      usageStatus:resourceStatus.value,
      resourceUserName:user.value,
      resourceUserPhone:phone.value,
      resourceUserEmail:email.value,
      resourceUserNote:userNote.value,
      usageSt:formatDateToYMD(selectedRange.value[0]),
      usageEd:formatDateToYMD(selectedRange.value[1])
    };
    
    let res = await axios.post(`http://localhost:8003/api/resource/${route.params.resourceId}/usage`,target)
    if(res.data=="성공"){
      isVisible.value=true;
      router.replace(`/resource/${route.params.resourceId}`);
    }
  }catch(error){
    alert('오류 발생!');
  }
}

async function updateUsage(){
  try{
    let res = await axios.put(`http://localhost:8003/api/usage/${props.usageInfo.resourceUsage.usageId}`,{
      usageStatus:resourceStatus.value,
      resourceUserName:user.value,
      resourceUserPhone:phone.value,
      resourceUserEmail:email.value,
      resourceUserNote:userNote.value,
      usageSt:formatDateToYMD(selectedRange.value[0]),
      usageEd:formatDateToYMD(selectedRange.value[1])
    }
  )
  console.log(props.usageInfo.resourceUsage.usageId)
  if(res.data=="성공"){
    isVisible.value=true;
    router.replace(`/resource/${route.params.resourceId}`);
    }else{
      alert('수정 실패')
    }
  }catch(err){
    alert('오류 발생!');
  }
}
async function onDeleteBtn() {
  try{
    // 확인 버튼
    const confirmResult = confirm("정말 삭제하시겠습니까?");
    if(confirmResult){
      await axios.delete(`http://localhost:8003/api/usage/${props.usageInfo.resourceUsage.usageId}`);
      router.replace(`/workplace/${props.usageInfo.workplaceId}`);
    }

  }catch(err){
    alert("오류 발생");
  }
}
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
}
/* 상단 자원 정보 정돈 */
.resource-info {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* 각 입력 필드 영역 공통 스타일 */
.status,
.user,
.phone,
.email,
.note,
.period {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

/* 각 라벨 스타일 */
.status p,
.user p,
.phone p,
.email p,
.note p,
.period p {
  margin: 0 0 0.25rem;
  font-weight: 600;
  color: #333;
}

#err-msg{
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #e74c3c;
  font-weight: 500;
}
/* 인풋 / 셀렉트 / 텍스트에어리어 공통 */
input,
select,
textarea {
  padding: 0.5rem;
  font-size: 0.95rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

/* 날짜 선택기 wrapper */
.period :deep(.dp__main) {
  font-size: 0.95rem;
}

/* 제출 버튼 */
.submit-btn {
  background-color: #0c64d8;
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
  margin-top: 0.5rem;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
  margin-top: 0.5rem;
}

.submit-btn:hover {
  background-color: #43a047;
}
.delete-btn:hover{
  background-color: #c0392b;
}

</style>