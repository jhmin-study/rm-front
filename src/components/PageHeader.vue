<template>
  <header>
    <!-- RM 로고(상단 좌측) -->
     <router-link to="/">
       <div class="logo">
         RM
       </div>
     </router-link>
    <!-- 접속자 이름, 로그아웃 버튼(상단 우측)  -->
    <div class="user-info">
      
      <div v-if="user!=null" class="user-name">
        <span>반갑습니다! </span><span @click="onClickUserName">{{ user.userNm }}</span><span>님.</span>
      </div>
      <div class="logout">
        <button @click="logout">로그아웃</button>
      </div>
    </div>
    
  </header>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const emit = defineEmits(['clickUserName']);

const user   = ref({});    // 로그인 사용자 객체
const userId = ref('');
const userNm = ref('');

function onClickUserName(){
  emit('clickUserName');
}

onMounted(async () => {
  // 로그인 한 사용자 정보 가져오기
  userId.value = localStorage.getItem('userId');
  console.log("Header 로그인 정보 가져오기 : ", userId.value)
  if (userId.value) {
    // 사용자 객체 가져오기
    try {
      const res = await axios.get(`http://localhost:8003/api/user/${userId.value}`
        , {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if (res.data) {
        console.log("Header Axois Result : ", res)
        console.log("user Type : ", typeof(res.data))
        console.log("res.data : ", res.data)
        console.log("res.headers.response : ", res.request.response)
        console.log(localStorage.getItem('token'))
        console.log("Header Axoois Result - user: ",user.value);
        user.value = res.data;
        // 성공 시 User이름도 LocalStorege에도 저장
        if (userNm.value != undefined && userNm.value != null) {
          userNm.value = res.data.userNm;
          localStorage.setItem('userNm', userNm.value)
        }
      } else {
        alert('로그인이 필요합니다.');
        router.push('/login');
        console.error(res.data);
      }
    } catch (error) {
      alert(error);
      alert('사용자 정보를 불러오는데 실패했습니다.');
      router.push('/login');  
    }
  }
})

function logout() {
  // 로컬스토리지에서 토큰과 사용자ID 제거
  // localStorage.removeItem('token');
  // localStorage.removeItem('userId');
  localStorage.clear();
  // 사용자 정보 초기화
  user.value = null;
  userId.value = '';

  // 로그인 페이지로 이동
  router.push('/login');
}

</script>

<style scoped>

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #2c3e50;
  padding: 15px 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 좌측 로고 */
.logo {
  font-size: 24px;
  font-weight: bold;
}

/* 우측 유저 정보 */
.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* 사용자 이름 스타일 */
.user-name {
  font-size: 16px;
}

/* 로그아웃 버튼 스타일 */
.logout button {
  background-color: #e74c3c;
  border: none;
  color: white;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.logout button:hover {
  background-color: #c0392b;
}

</style>