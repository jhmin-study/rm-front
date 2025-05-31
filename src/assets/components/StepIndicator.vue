<template>
  <div class="step-indicator">
    <div
      v-for="(step, index) in steps"
      :key="index"
      :class="['step', { active: currentStep === index + 1, completed: currentStep > index + 1 }]"
    >
      <div class="circle">{{ index + 1 }}</div>
      <div class="label">{{ step }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({currentStep: {
      type: Number,
      required: true,
    }});

const steps = ['계정정보 입력' , '휴대폰 인증'];
</script>


<style scoped>
.step-indicator {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  max-width: 400px;
}
.step {
  text-align: center;
  flex: 1;
  position: relative;
}
.circle {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  background-color: #ddd;
  color: #fff;
  margin: 0 auto 5px;
  font-weight: bold;
}
.label {
  font-size: 0.9rem;
  color: #666;
}
.step.active .circle {
  background-color: #4a90e2;
}
.step.completed .circle {
  background-color: #4a90e2;
}
.step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 15px;
  right: -50%;
  width: 100%;
  height: 2px;
  background-color: #ddd;
  z-index: -1;
}
.step.completed:not(:last-child)::after {
  background-color: #4a90e2;
}
</style>