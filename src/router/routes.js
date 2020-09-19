const routes = [
  {
    path: "/",
    component: () => import("../components/Auth/Login"),
    name: "Login",
    meta: {
      allowedGuests: true,
      transitionName: "slide",
    },
  },
  // {
  //   path: "/",
  //   component: () => import("../components/Index/index.vue"),
  //   name: "Index",
  // },
  {
    path: "/register",
    component: () => import("../components/Auth/Register"),
    name: "Register",
    meta: {
      allowedGuests: true,
      transitionName: "slide",
    },
  },
  {
    path: "/password/forget",
    component: () => import("../components/Auth/ForgetPassword"),
    name: "ForgetPassword",
    meta: {
      allowedGuests: true,
      transitionName: "slide",
    },
  },
  {
    path: "/password/reset",
    component: () => import("../components/Auth/ResetPassword"),
    name: "ResetPassword",
    meta: {
      allowedGuests: true,
      transitionName: "slide",
    },
  },
  {
    path: "/login",
    component: () => import("../components/Auth/Login"),
    name: "Login",
    meta: {
      allowedGuests: true,
      transitionName: "slide",
    },
  },
  {
    path: "/projects-categories",
    meta: {
      transitionName: "slide",
      navbarHidden: true,
    },
    component: () =>
      import("../components/ProjectsCategories/ProjectCategoryList"),
    name: "ProjectCategoryList",
  },
  {
    path: "/projects-categories/status/:status?",
    meta: {
      transitionName: "slide",
      navbarHidden: true,
    },
    component: () =>
      import("../components/ProjectsCategories/ProjectCategoryList"),
    name: "ProjectCategoryChildrenListWithStatus",
  },
  {
    path: "/projects-categories/:id/children/:status?",
    meta: {
      transitionName: "slide",
      navbarHidden: true,
    },
    component: () =>
      import("../components/ProjectsCategories/ProjectCategoryList"),
    name: "ProjectCategoryChildrenList",
  },
  {
    path: "/projects-categories/view",
    meta: {
      transitionName: "slide",
      navbarHidden: true,
    },
    component: () =>
      import("../components/ProjectsCategories/ProjectCategoryView"),
    name: "ProjectCategoryView",
  },
  {
    path: "/projects-categories/create",
    meta: {
      transitionName: "slide",
      navbarHidden: true,
    },
    component: () =>
      import("../components/ProjectsCategories/ProjectCategoryForm"),
    name: "ProjectCategoryCreate",
  },
  {
    path: "/projects-categories/:project_category_id/create",
    meta: {
      transitionName: "slide",
      navbarHidden: true,
    },
    component: () =>
      import("../components/ProjectsCategories/ProjectCategoryForm"),
    name: "ProjectCategoryCreateInCategory",
  },
  {
    path: "/projects-categories/:id/edit",
    meta: {
      transitionName: "slide",
      navbarHidden: true,
    },
    component: () =>
      import("../components/ProjectsCategories/ProjectCategoryForm"),
    name: "ProjectCategoryEdit",
  },
  {
    path: "/tasks",
    meta: {
      transitionName: "slide",
      navbarHidden: true,
    },
    component: () => import("../components/Tasks/TasksList"),
    name: "CurrentTasksList",
  },
  {
    path: "/tasks/form",
    meta: {
      transitionName: "slide",
      navbarHidden: true,
    },
    component: () => import("../components/Tasks/TasksForm"),
    name: "TasksForm",
  },
  {
    path: "/tasks/create",
    meta: {
      transitionName: "slide",
      navbarHidden: true,
    },
    component: () => import("../components/Tasks/TasksForm"),
    name: "TasksCreate",
  },
  {
    path: "/project-categories/:project_category_id/tasks/create",
    meta: {
      transitionName: "slide",
      navbarHidden: true,
    },
    component: () => import("../components/Tasks/TasksForm"),
    name: "TasksCreateWithProjectCategoryId",
  },
  {
    path: "/tasks/:id/edit",
    meta: {
      transitionName: "slide",
      navbarHidden: true,
    },
    component: () => import("../components/Tasks/TasksForm"),
    name: "TasksEdit",
  },
  {
    path: "/tasks/hidden",
    component: () => import("../components/Tasks/TasksList"),
    meta: {
      status: "hidden",
      transitionName: "slide",
      navbarHidden: true,
    },
    name: "HiddenTasksList",
  },
  {
    path: "/tasks/archive",
    component: () => import("../components/Tasks/TasksList"),
    meta: {
      status: "done",
      transitionName: "slide",
      navbarHidden: true,
    },
    name: "ArchiveTasksList",
  },
  {
    path: "/settings",
    component: () => import("../components/Settings"),
    meta: {
      transitionName: "fade",
      navbarHidden: true,
    },
    name: "Settings",
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];
export default routes;
