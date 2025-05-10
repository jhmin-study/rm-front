import MainPage from "@/pages/MainPage.vue";
import ResourceListPage from "@/pages/ResourceListPage.vue";
import UsageInputPage from "@/pages/UsageInputPage.vue";
//import WorkSpacePage from "@/pages/WorkSpacePage.vue";
//import WorkPlacePage from "@/pages/WorkPlacePage.vue";
import { createRouter, createWebHistory  } from "vue-router";
import WorkplaceList from '@/pages/WorkplaceList.vue';
import WorkplaceForm from '@/pages/WorkplaceForm.vue';
import LoginPage from "@/pages/LoginPage.vue";

const routes = [ 
    {path:'/' ,  component : MainPage },
    //{path:'/workspace', component : WorkSpacePage},
    { path: '/workplaces', component: WorkplaceList },
    { path: '/workplace/new', component: WorkplaceForm },
    { path: '/workplace/update/:workplaceId', component: WorkplaceForm, props: true },
    {path:'/workplace/:workplaceId', component : ResourceListPage},
    {path:'/workplace/:workplaceId/:resourceId/input', component : UsageInputPage},
    { path: '/', redirect: '/workplaces' },
    { path: '/login', component : LoginPage }
];
const router = createRouter({
    history : createWebHistory() , 
    routes : routes
});

export default router;