<template>
  <!-- 헤더 -->
  <h1>Login Page</h1>
  <main>
    <!-- 로그인 제출 -->
    <!-- id ~~> 이메일 -->
    <!-- password -->
    <form action="">
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="text" id="email" placeholder="이메일을 입력하세요.">
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" placeholder="비밀번호를 입력하세요.">
      </div>
      <!-- 제출 버튼 -->
      <div class="form-group">
        <button type="submit" class="effect-button">로그인</button>
      </div>
    </form>
    <!-- 하단메뉴 -->
    <div>
      <p>계정이 없으신가요?<RouterLink>회원가입</RouterLink></p>
      <p>비밀번호를 잊으셨나요?<RouterLink>비밀번호 찾기</RouterLink></p>
    </div>
  </main>
</template>

<script setup>
</script>

<style scoped></style>