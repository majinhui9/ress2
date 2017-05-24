export default [{
  path: '/dashboard',
  component: (resolve) => {
    require(['../view/Dashboard.vue'], resolve)
  }
}, {
  path: '/user',
  component: (resolve) => {
    require(['../view/UserList.vue'], resolve)
  }
}, {
  path: '/role',
  component: (resolve) => {
    require(['../view/RoleList.vue'], resolve)
  }
}, {
  path: '/project',
  component: (resolve) => {
    require(['../view/ProjectList.vue'], resolve)
  }
}, {
  path: '/org',
  component: (resolve) => {
    require(['../view/OrgList.vue'], resolve)
  }
}, {
  path: '/sensormeta',
  component: (resolve) => {
    require(['../view/SensorMetaList.vue'], resolve)
  }
}, {
  path: '/sensor',
  component: (resolve) => {
    require(['../view/SensorList.vue'], resolve)
  }
}, {
  path: '/front',
  component: (resolve) => {
    require(['../view/FrontList.vue'], resolve)
  }
}]
