<template>
  <!-- Header -->
  <h1>Signup Page</h1>
  <main>
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
        <button type="submit" class="effect-button">회원가입</button>
      </div>
      <!-- TODO - 이메일, 비밀번호 검증 후 휴대폰 인증 도입하기 -->
    </form>
    <!-- 하단메뉴 -->
    <div>
      <p>계정이 이미 있으신가요?<RouterLink>로그인 하기</RouterLink></p>
    </div>
  </main>
  <!-- Fotter -->
</template>
<script setup></script>
<style scoped></style>