import MainPage from "@/pages/MainPage.vue";
import WorkPlacePage from "@/pages/WorkPlacePage.vue";
import { createRouter, createWebHashHistory  } from "vue-router";
import WorkplaceList from '@/pages/WorkplaceList.vue';
import WorkplaceForm from '@/pages/WorkplaceForm.vue';


const routes = [ 
    {path:'/' ,  component : MainPage },
    {path:'/workplace', component : WorkPlacePage},
    { path: '/workplaces', component: WorkplaceList },
    { path: '/workplace/new', component: WorkplaceForm },
    { path: '/workplace/:id', component: WorkplaceForm, props: true },
    { path: '/', redirect: '/workplaces' }
];
const router = createRouter({
    history : createWebHashHistory() , 
    routes : routes
});

export default router;