<template>
  <div>
    <h1>사업장 등록록</h1>
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

        <div class="form-group btn-group">
          <button type="submit" class="effect-button">작업장 만들기</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // ✅ 추가
import axios from 'axios';

const router = useRouter(); // ✅ 추가

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
       console.log(res.data);
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

  form.value.businessRegNo = form.value.businessRegNo.replace(/[^0-9]/g, '');//'-' 를 빈공백으로 변경
  try {
      await axios.post('/api/workplace', form.value, {headers:{Authorization: localStorage.getItem('token')}});
    router.push('/workplaces'); // ✅ 작업장 목록으로 이동
  } catch (error) {
    console.error('저장 오류:', error);
    alert('작업장 저장 중 오류가 발생했습니다.');
  }
};

</script>

<style scoped>
.create-workplace-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}
.btn-group{
  display: flex;
  column-gap: 20px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 15px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.loading-container{
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
}

.effect-button {
  width: 100%;
  padding: 14px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.delete-button{
  background-color: red;
}

.effect-button:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
}

.effect-button:active {
  background-color: #004494;
  transform: translateY(0);
}

h1 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 30px;
  font-size: 28px;
  color: #222;
}

@media (max-width: 600px) {
  .create-workplace-form {
    padding: 20px;
  }

  h1 {
    font-size: 24px;
  }
}
</style>