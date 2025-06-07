<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog-box">
      <h2 class="dialog-title">{{ title }}</h2>
      <p class="dialog-message">{{ message }}</p>
      <div class="dialog-button-group">
        <button @click="onConfirmClick" class="dialog-button">{{ buttonConfirmText }}</button>
        <button v-if="dialogType == 'confirm'" @click="onCancelClick" class="dialog-button secondary">{{ buttonCancelText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onBeforeUnmount, onMounted } from 'vue';

defineProps({
  title: {
      type: String,
      default: '알림'
    },
    message: {
      type: String,
      default: '메시지를 입력하세요.'
    },
    buttonConfirmText: {
      type: String,
      default: '확인'
    },
    buttonCancelText: {
      type: String,
      default: '취소'
    },
    visible: {
      type: Boolean,
      default: false
    },
    dialogType : {
      type: String,
      default : 'alert'
    }
});

const emit = defineEmits(['confirm','cancel']);

function onConfirmClick(){
  emit('confirm');
}

function onCancelClick(){
  emit('cancel');
}

onMounted(()=>{
  // document.body.style.overflow = 'hidden';
});

onBeforeUnmount(()=>{
  document.body.style.overflow = '';
});

</script>


<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-button-group{
  display: flex;
  justify-content: center;
  column-gap: 20px;
}
.dialog-box {
  background: white;
  padding: 24px 32px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.dialog-title {
  font-size: 20px;
  margin-bottom: 12px;
}

.dialog-message {
  font-size: 16px;
  margin-bottom: 24px;
}

.dialog-button {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.dialog-button:hover {
  background-color: #1a242f;
}
</style>