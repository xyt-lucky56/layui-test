
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
            path: '/admin/treeList',
            name: 'treeList',
            component: resolve => require(["@/views/treeList"], resolve),
        },
        {
            path: '/admin/checkboxTable',
            name: 'checkboxTable',
            component: resolve => require(["@/views/checkboxTable"], resolve),
        },
        {
            path: '/admin/jump',
            name: 'jump',
            component: resolve => require(["@/views/jump"], resolve),
        },
        {
            path: '/admin/btnPage',
            name: 'btnPage',
            component: resolve => require(["@/views/btnPage"], resolve),
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
            path: '/admin/tableTwo',
            name: 'tableTwo',
            component: resolve => require(["@/views/tableTwo"], resolve),
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
        ]
    }
]
