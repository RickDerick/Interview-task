
import {createWebHistory, createRouter} from 'vue-router'
import NotfoundPage from "../components/NotfoundPage.vue";

const routes = [

  {
      path: "/:pathMatch(.*)*",
      name: "NotfoundPage",
      component:NotfoundPage,
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })




  export default router;