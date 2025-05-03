import MainPage from "@/pages/MainPage.vue";
import ResourceListPage from "@/pages/ResourceListPage.vue";
import UsageInputPage from "@/pages/UsageInputPage.vue";
import WorkSpacePage from "@/pages/WorkSpacePage.vue";
import WorkPlacePage from "@/pages/WorkPlacePage.vue";
import { createRouter, createWebHashHistory  } from "vue-router";
import WorkplaceList from '@/pages/WorkplaceList.vue';
import WorkplaceForm from '@/pages/WorkplaceForm.vue';

const routes = [ 
    {path:'/' ,  component : MainPage },
    {path:'/workspace', component : WorkSpacePage},
    { path: '/workplaces', component: WorkplaceList },
    { path: '/workplace/new', component: WorkplaceForm },
    { path: '/workplace/:workplaceId/update', component: WorkplaceForm, props: true },
    {path:'/workplace/:workplaceId', component : ResourceListPage},
    {path:'/workplace/:workplaceId/:resourceId/input', component : UsageInputPage},
    { path: '/', redirect: '/workplaces' }
];
const router = createRouter({
    history : createWebHashHistory() , 
    routes : routes
});

export default router;