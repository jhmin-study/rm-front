<template>
  <div>
    <h1>{{ isEdit ? '사업장 수정' : '사업장 등록' }}</h1>
    <main>
      <form class="create-workplace-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="business-type-nm">사업장 유형</label>
          <input v-model="form.businessTypeNm" type="text" id="business-type-nm" placeholder="작업장 유형을 입력하세요.(EX:볼링장, 스터디카페)">
        </div>

        <div class="form-group">
          <label for="business-reg-no">사업자 번호</label>
          <input v-model="form.businessRegNo" type="text" id="business-reg-no" placeholder="사업자 번호를 입력하세요.">
        </div>

        <div class="form-group">
          <label for="business-name">사업장 명</label>
          <input v-model="form.businessName" type="text" id="business-name" placeholder="작업장 이름을 입력하세요.">
        </div>

        <div class="form-group">
          <label for="owner-name">사업자명</label>
          <input v-model="form.ownerName" type="text" id="owner-name" placeholder="사업자이름을 입력하세요.">
        </div>

        <div class="form-group">
          <label for="phone-number">사업자 전화번호</label>
          <input v-model="form.phoneNumber" type="text" id="phone-number" placeholder="사업자전화번호를 입력하세요.">
        </div>

        <div class="form-group">
          <label for="address">사업장 주소</label>
          <input v-model="form.address" type="text" id="address" placeholder="사업장 주소를 입력하세요.">
        </div>

        <div class="form-group">
          <label for="detail-address">사업장 상세주소</label>
          <input v-model="form.detailAddress" type="text" id="detail-address" placeholder="사업장 상세주소를 입력하세요.">
        </div>

        <div class="form-group">
          <label for="status">사업장 상태</label>
          <select v-model="form.status">
            <option disabled value="">다음 중 하나를 선택하세요</option>
            <option value="ACTIVE">활성화</option>
            <option value="INACTIVE">비활성화</option>
            <option value="DELETED">삭제됨</option>
          </select>
        </div>

        <div class="form-group">
          <button type="submit" class="effect-button">{{ isEdit ? '수정하기' : '작업장 만들기' }}</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // ✅ 추가
import axios from 'axios';

const router = useRouter(); // ✅ 추가

// ✅ 라우터에서 props로 넘어온 workplaceId 받기
const props = defineProps({
  workplaceId: {
    type: String,
    required: false
  }
});

const isEdit = ref(!!props.workplaceId);

const form = ref({
  workplaceId: null,
  businessName: '',
  businessTypeNm: '',
  businessRegNo: '',
  address: '',
  phoneNumber: '',
  ownerName: '',
  detailAddress: '',
  status: ''
});

   const serviceKey = 'ptjf2sY3Y2xVYb2lSqJFg19EwvV4IytfAnfp4xnNJoXN4J9ofsAjYaqUVZ4Q9WyIxUBua14fRQuX6AP6VThCVQ%3D%3D'; // 실제 키로 교체

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

   // ✅ 개발 중 임시 userId 하드코딩
  // form.value.userId = 'trigunho@naver.com'; 

  try {
    if (isEdit.value) {
      await axios.put(`/api/workplace/${props.workplaceId}`, form.value, {headers:{Authorization: localStorage.getItem('token')}});
    } else {
      await axios.post('/api/workplace', form.value, {headers:{Authorization: localStorage.getItem('token')}});
    }

    router.push('/workplaces'); // ✅ 작업장 목록으로 이동
  } catch (error) {
    console.error('저장 오류:', error);
    alert('작업장 저장 중 오류가 발생했습니다.');
  }
};

onMounted(async () => {
  if (isEdit.value) {
    try {
      const res = await axios.get(`/api/workplace/${props.workplaceId}`);
      form.value = res.data;
    } catch (e) {
      console.error('데이터 불러오기 실패:', e);
    }
  }
});
</script>

