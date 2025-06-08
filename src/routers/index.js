import MainPage from "@/pages/MainPage.vue";
import ResourceListPage from "@/pages/ResourceListPage.vue";
import UsageInputPage from "@/pages/UsageInputPage.vue";
import { createRouter, createWebHistory  } from "vue-router";
import WorkplaceList from '@/pages/WorkplaceList.vue';
import WorkplaceForm from '@/pages/WorkplaceForm.vue';
import LoginPage from "@/pages/LoginPage.vue";
import UsageUpdatePage from "@/pages/UsageUpdatePage.vue";
import UsageReadPage from "@/pages/UsageReadPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import MyPage from "@/pages/MyPage.vue";
import ChangePasswordPage from "@/pages/ChangePasswordPage.vue";
import UsageHistory from "@/pages/UsageHistory.vue";


const routes = [ 
    {
        path:'/' ,  
        component : DefaultLayout,
        children : [
            { path: '', redirect: '/workplaces' }, // 기본 경로 리디렉션
            { path: 'main', component: MainPage },
            { path: 'workplaces', component: WorkplaceList },
            { path: 'workplace/new', component: WorkplaceForm },
            { path: 'workplace/update/:workplaceId', component: WorkplaceForm, props: true },
            { path: 'workplace/:workplaceId', component: ResourceListPage },
            { path: 'resource/:resourceId', component: UsageReadPage },
            { path: 'resource/:resourceId/input', component: UsageInputPage },
            { path: 'resource/:resourceId/update', component: UsageUpdatePage },
            { path: 'resource/:resourceId/history', component: UsageHistory },
            { path: 'my-page', component: MyPage },
        ]
    },

    { path: '/login', component : LoginPage },
    { path: '/signup', component : SignupPage },
    { path: '/changePassword', component : ChangePasswordPage}
];
const router = createRouter({
    history : createWebHistory() , 
    routes : routes
});

export default router;