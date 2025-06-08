import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import "./assets/styles/common.css"
import axios from 'axios'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    console.log('★ Axios.interceptors.response executed.')    
    // LocalStorage 사용자 정보
    let user = localStorage.getItem('userId')
    let token = localStorage.getItem('token')

    console.log('userId : ', user, 'toekn : ', token);

    if (token) {
      console.log('-----------------------------------------------------------------------------')
      let currentAccessToken = token
      console.log('currentAccessToken : ', currentAccessToken)

      // Header Acesstoken 정보
      console.log('-----------------------------------------------------------------------------')
      console.log("response")
      console.log("response obj : ", response)
      console.log("response data : ", (response.data).length)
      console.log('-----------------------------------------------------------------------------')
      let newAccessToken = response.headers.getAuthorization();
      console.log("newAccessToken : ", newAccessToken)

      // LocalStorage Token 과 Header의 토큰이 같지 않으면 새로 발급받은 토큰을 업데이트 한다.
      if (newAccessToken) {
        console.log('newAccessToken : ', newAccessToken)

        if (newAccessToken !== currentAccessToken) {
            token = newAccessToken
            localStorage.setItem('token', token)
            console.log('Token 정보가 업데이트 되었습니다.')
        }
      }
      console.log('-----------------------------------------------------------------------------')
    }
    
    return response;
  },
  (error) => {
    console.log('★ Axios.interceptors.respoonse error executed.')    
    console.log(error)
    switch (error.response.status) {
      case 401:
        localStorage.removeItem('userId');
        router.push('/login')
        break;
      case 403:
        console.log('[' + error.response.status + '] Error')
        router.push({ name: 'Forbidden' })
        break;
    }

    return Promise.reject(error);
  }
);

createApp(App).component('VueDatePicker', VueDatePicker).use(router).mount('#app')
