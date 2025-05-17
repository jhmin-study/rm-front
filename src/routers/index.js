import MainPage from "@/pages/MainPage.vue";
import ResourceListPage from "@/pages/ResourceListPage.vue";
import UsageInputPage from "@/pages/UsageInputPage.vue";
//import WorkSpacePage from "@/pages/WorkSpacePage.vue";
//import WorkPlacePage from "@/pages/WorkPlacePage.vue";
import { createRouter, createWebHistory  } from "vue-router";
import WorkplaceList from '@/pages/WorkplaceList.vue';
import WorkplaceForm from '@/pages/WorkplaceForm.vue';
import UsageUpdatePage from "@/pages/UsageUpdatePage.vue";
import UsageReadPage from "@/pages/UsageReadPage.vue";


const routes = [ 
    {path:'/' ,  component : MainPage },
    //{path:'/workspace', component : WorkSpacePage},
    { path: '/workplaces', component: WorkplaceList },
    { path: '/workplace/new', component: WorkplaceForm },
    { path: '/workplace/update/:workplaceId', component: WorkplaceForm, props: true },
    {path:'/workplace/:workplaceId', component : ResourceListPage},
    {path:'/resource/:resourceId', component : UsageReadPage},
    {path:'/resource/:resourceId/input', component : UsageInputPage},
    {path:'/resource/:resourceId/update', component : UsageUpdatePage},
    { path: '/', redirect: '/workplaces' }
];
const router = createRouter({
    history : createWebHistory() , 
    routes : routes
});

export default router;