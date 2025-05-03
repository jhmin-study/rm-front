import MainPage from "@/pages/MainPage.vue";
import ResourceListPage from "@/pages/ResourceListPage.vue";
import WorkSpacePage from "@/pages/WorkSpacePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [ 
    {path:'/' ,  component : MainPage },
    {path:'/workspace', component : WorkSpacePage},
    {path:'/workplace/:workplaceId', component : ResourceListPage},
    {path:'/workplace/:workplaceId/:resourceId', component : ResourceListPage}

];
const router = createRouter({
    history : createWebHistory() , 
    routes : routes
});

export default router;