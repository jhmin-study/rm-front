<template>
  <header>
    <!-- RM 로고(상단 좌측) -->
    <div class="logo">
      LOGO
    </div>
    <!-- 접속자 이름, 로그아웃 버튼(상단 우측)  -->
    <div class="user-info">
      
      <div v-if="user!=null" class="user-name">
        <span>반값습니다! </span>{{ user.userNm }}<sapn>님.</sapn>
      </div>
      <div class="logout">
        <button>로그아웃</button>
      </div>
    </div>
    
  </header>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user   = ref(null);    // 로그인 사용자 객체
const userId = ref('');


onMounted(async () => {
  // 로그인 한 사용자 정보 가져오기
  userId.value = localStorage.getItem('userId');
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
        user.value = res.data;
        console.log(user);
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


</script>

<style scoped>
.logo {
  border-radius: 0;
  border-color: solid 3px black;
}
</style>