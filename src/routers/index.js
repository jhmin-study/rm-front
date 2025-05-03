import MainPage from "@/pages/MainPage.vue";
import WorkPlacePage from "@/pages/WorkPlacePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [ 
    {path:'/' ,  component : MainPage },
    {path:'/workplace', component : WorkPlacePage}
];
const router = createRouter({
    history : createWebHistory() , 
    routes : routes
});

export default router;