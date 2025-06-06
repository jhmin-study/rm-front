<template>
        <div class="workplace-card" :class="{'isActive' : workplace.status === 'INACTIVE', 'isDeleted' : workplace.status === 'DELETED'}" >
        <h3>{{ workplace.businessName }}</h3>
        <p>{{ workplace.businessRegNo }}</p>
        <p>{{ workplace.businessTypeNm }}</p>
        <p>{{ workplace.address }}</p>
        <div class="workplace-status"><h6>[{{ workplace.status }}]</h6></div>
        <div class="card-buttons">
          <button class="dialog-button secondary" @click="goToEditPage(workplace.workplaceId)">수정</button>
          <button class="dialog-button secondary" @click="goToResourceList(workplace.workplaceId)">자원관리</button>
          <!-- <button class="dialog-button secondary" @click="deleteWorkplace(workplace.workplaceId)">삭제</button> -->
          <button class="dialog-button secondary" @click="deleteConfirm()">삭제</button> 
          <DialogPopup
            :visible="showDialog"
            title="사업장 삭제"
            message="정말 삭제하시겠습니까?"
            dialog-type="confirm"
            button-confirm-text="확인"
            button-cancel-text="취소"
            @confirm="deleteWorkplace(workplace.workplaceId)"
            @cancel ="deleteCancel"
            />
        </div>
      </div>
</template>

<script setup>
import axios from 'axios';
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';
import DialogPopup from './DialogPopup.vue';
defineProps({
  workplace : {type : Object}
});

const emit = defineEmits(['deleteWorkplace']);

const router = useRouter();

const showDialog = ref(false); // 다이얼로그 창

const deleteCancel = () => {
  showDialog.value=false;
};



// 사업장 수정 페이지 이동
const goToEditPage = (id) => {
  router.push(`/workplace/update/${id}`);
};

// 자원관리 페이지 이동
const goToResourceList = (id) => {
  router.push(`/workplace/${id}`);
};


// 삭제 confirm 창 보이기
const deleteConfirm = () => {
  showDialog.value=true;
};
// 삭제
const deleteWorkplace = async (id) => {
  //showDialog.value=true;
  //if (confirm('정말 삭제하시겠습니까?')) {
    try {
      await axios.delete(`/api/workplace/${id}`, {
        headers : {Authorization : localStorage.getItem('token')}
      });
      emit('deleteWorkplace');
    } catch (error) {
      console.error('사업장 삭제 중 오류 발생:', error);
    }
  //}
};
</script>

<style scoped>

.workplace-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.card-buttons {
  display: flex;
  margin-top: 10px;
  gap: 10px;
}

.card-buttons button{
  flex-grow: 1;
  padding: 3px;
}
.isActive {
  background-color: lightgrey;
}

.isDeleted {
  background-color: lightpink;
}

.workplace-status {
  display: inline;
}
</style>