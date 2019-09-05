
export const routesList = [
    {
        path: "*",
        name: "login",
        component: resolve => require(["@/views/login/login"], resolve),
    },
    {
        path: "/",
        name: "login",
        component: resolve => require(["@/views/login/login"], resolve),
    },
    {
        path: '/admin/role',
        name: "role",
        component: resolve => require(["@/views/role/role"], resolve),
    },
    {
        path: '/admin/home',
        name: 'home',
        component: resolve => require(["@/views/home"], resolve),
        children: [{
            path: '/admin/formList',
            name: 'formList',
            component: resolve => require(["@/views/formList"], resolve),
        }, {
            path: '/admin/table',
            name: 'table',
            component: resolve => require(["@/views/table"], resolve),
        }, {
            path: '/admin/imageLazy',
            name: 'imageLazy',
            component: resolve => require(["@/views/imageLazy"], resolve),
        }, {
            path: '/admin/uploadImg',
            name: 'uploadImg',
            component: resolve => require(["@/views/uploadImg"], resolve),
        },        
        {
            path: '/admin/checkboxTable',
            name: 'checkboxTable',
            component: resolve => require(["@/views/checkboxTable"], resolve),
        },             
        {
            path: '/admin/tableLazy',
            name: 'tableLazy',
            component: resolve => require(["@/views/tableLazy"], resolve),
        },
        {
            path: '/admin/login',
            name: 'login',
            component: resolve => require(["@/views/login/login"], resolve),
        },        
        {
            path: '/admin/complaints',
            name: '我要吐槽',
            component: resolve => require(["@/views/headerPages/complaints"], resolve),
        },
        {
            path: '/admin/needHelp',
            name: '我要帮助',
            component: resolve => require(["@/views/headerPages/needHelp"], resolve),
        },
        {
            path: '/admin/notice',
            name: '公告',
            component: resolve => require(["@/views/headerPages/notice"], resolve),
        },
        {
            path: '/admin/userCenter',
            name: '个人中心',
            component: resolve => require(["@/views/headerPages/userCenter"], resolve),
        },
        {
            path: '/admin/system',
            name: 'system',
            component: resolve => require(["@/views/system/system"], resolve),
        },
        {
            path: '/admin/subsystem',
            name: 'subsystem',
            component: resolve => require(["@/views/system/subsystem"], resolve),
        },
        {
            path: '/admin/user',
            name: 'user',
            component: resolve => require(["@/views/user/user"], resolve),
        },
        {
            path: '/admin/roleManagement',
            name: 'roleManagement',
            component: resolve => require(["@/views/roleManagement/roleManagement"], resolve),
        },
        {
            path: '/admin/subrole',
            name: 'subrole',
            component: resolve => require(["@/views/roleManagement/subrole"], resolve),
        },
        {
            path: '/admin/rolePower',
            name: 'rolePower',
            component: resolve => require(["@/views/roleManagement/rolePower"], resolve),
        },
        {
            path: '/admin/permissions',
            name: 'permissions',
            component: resolve => require(["@/views/permissions/permissions"], resolve),
        },
        {
            path: '/admin/subMenuOne',
            name: 'subMenuOne',
            component: resolve => require(["@/views/permissions/subMenuOne"], resolve),
        },
        {
            path: '/admin/subMenuChild',
            name: 'subMenuChild',
            component: resolve => require(["@/views/permissions/subMenuChild"], resolve),
        },
        {
            path: '/admin/adduser',
            name: 'adduser',
            component: resolve => require(["@/views/user/adduser"], resolve),
        },
        {
            path: '/admin/roleassignment',
            name: 'roleassignment',
            component: resolve => require(["@/views/user/roleassignment"], resolve),
        },
        ]
    }
]
