<template>
  <div>
    <h2>{{ isEdit ? '사업장 수정' : '사업장 등록' }}</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="form.businessName" placeholder="사업장명" required />
      <input v-model="form.businessTypeNm" placeholder="사업장 유형" required />
      <input v-model="form.businessRegNo" placeholder="사업자등록번호" required />
      <input v-model="form.address" placeholder="주소" required />
      <input v-model="form.phoneNumber" placeholder="연락처" />
      <button type="submit">{{ isEdit ? '수정' : '등록' }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const urlParams = new URLSearchParams(window.location.search);
const isEdit = ref(!!urlParams.get('id'));
const form = ref({
  workplaceId: null,
  businessName: '',
  businessTypeNm: '',
  businessRegNo: '',
  address: '',
  phoneNumber: '',
});

const serviceKey = 'YOUR_SERVICE_KEY'; // 실제 키로 교체 필요

const validateBusinessNumber = async () => {
  const cleanedNumber = form.value.businessRegNo.replace(/[^0-9]/g, '');
  const data = { b_no: [cleanedNumber] };
  try {
    const res = await axios.post(
      `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${serviceKey}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return res.data.data[0]?.b_stt === '계속사업자';
  } catch (e) {
    console.error('유효성 검사 오류:', e);
    return false;
  }
};

const handleSubmit = async () => {
  const valid = await validateBusinessNumber();
  if (!valid) {
    alert('유효하지 않은 사업자등록번호입니다.');
    return;
  }

  try {
    if (isEdit.value) {
      await axios.put(`/api/workplace/${form.value.workplaceId}`, form.value);
    } else {
      await axios.post('/api/workplace', form.value);
    }

    // 부모창 새로고침
    if (window.opener && !window.opener.closed) {
      window.opener.location.reload();
    }

    window.close();
  } catch (error) {
    console.error('저장 오류:', error);
  }
};

onMounted(async () => {
  const id = urlParams.get('id');
  if (id) {
    try {
      const res = await axios.get(`/api/workplace/${id}`);
      form.value = res.data;
    } catch (e) {
      console.error('데이터 불러오기 실패:', e);
    }
  }
});
</script>
