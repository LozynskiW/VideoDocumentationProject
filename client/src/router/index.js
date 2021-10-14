import {createRouter, createWebHistory} from "vue-router";
import StartupPage from "@/components/StartupPage";
import Account from "@/components/Account";
import Project from "@/components/Project";
import OwnedProjects from "@/components/OwnedProjects";
import AccessedProjects from "@/components/Project/AccessedProjects";
import AddNewProject from "@/components/Project/AddNewProject";
import PublicProjects from "@/components/Project/PublicProjects";
import UserPanel from "@/components/User/UserPanel";

const routes = [
    {
        path: '/',
        name: "Home",
        component: StartupPage
    },
    {
        path: '/account',
        name: "Account",
        component: Account
    },
    {
        path: '/user/projects/owned',
        name: "OwnedProjects",
        component: OwnedProjects
    },
    {
        path: '/user/projects/accessed',
        name: "AccessedProjects",
        component: AccessedProjects
    },
    {
        path: '/user/projects/public',
        name: "PublicProjects",
        component: PublicProjects
    },
    {
        path: '/project/:projectId',
        name: "Project",
        component: Project
    },
    {
        path: '/user/project/new',
        name: "AddNewProject",
        component: AddNewProject
    },
    {
        path: '/user/:userId',
        name: "UserPanel",
        component: UserPanel
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router