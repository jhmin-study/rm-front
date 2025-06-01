<template>
    <h1>Main</h1>    
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 로그인 성공 시 WorkPlaceList 페이지로 이동
onMounted(() => {
    const token = localStorage.getItem('token');
    if (token) {
        router.push('/workplaces');
    } else {
        router.push('/login');
    }
})
</script>
