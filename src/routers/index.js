import MainPage from "@/pages/MainPage.vue";
import WorkSpacePage from "@/pages/WorkSpacePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [ 
    {path:'/' ,  component : MainPage },
    {path:'/workspace', component : WorkSpacePage}
];
const router = createRouter({
    history : createWebHistory() , 
    routes : routes
});

export default router;