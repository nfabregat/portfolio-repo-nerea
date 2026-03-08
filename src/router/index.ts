import Home from "@/pages/home/Home.vue";
import ProjectsLayout from "@/pages/projects/ProjectsLayout.vue";
import ProjectsIndex from "@/pages/projects/ProjectsIndex.vue";
import ProjectDetail from "@/pages/projects/ProjectDetail.vue";
import About from "@/pages/about/About.vue";
import Contact from "@/pages/contact/Contact.vue";

import { createRouter, createWebHashHistory } from "vue-router";


export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    
    {
      path: "/projects",
      component: ProjectsLayout,
      children: [
        { path: "", 
          name: "projects", 
          component: ProjectsIndex 
        },
        { path: ":slug", 
          name: "project-detail", 
          component: ProjectDetail 
        },
      ],
    },

    { path: "/about", 
      name: "about", 
      component: About 
    },

    { path: "/contact", 
      name: "contact", 
      component: Contact 
    },


    {
      path: '/:pathMatch(.*)',
      redirect: '/'
    }
  ],
});