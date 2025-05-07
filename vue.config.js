const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8003', // ✅ 백엔드 서버 주소로 수정
        changeOrigin: true
      }
    }
  }
});
