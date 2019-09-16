import https from '@/utils/axios'  //引入我们二次封装的axios.js文件 
export const path = '/api/api-a-bkf-/user-mucon'

/*---------系统管理------------ */
export const QUERYSYSTEMINFO = '/system/querySystemInfo'
export const querySystemInfo = function(params){
    return https(QUERYSYSTEMINFO, params,'post');
}

export const DELSUBSYSTEM='/system/deleteSubsystems'
export const delSubsystem = function(params){
    return https(DELSUBSYSTEM, params,'post','form');
}

//查询子系统详情
export const QUERYSUBSYSTEM='/system/querySystemInfoById'
export const querySubsystem = function(params){
    return https(QUERYSUBSYSTEM, params,'post','form');
}

//编辑子系统
export const EDITSUBSYSTEM='/system/editSubsystems'
export const editSubsystem = function(params){
    return https(EDITSUBSYSTEM, params,'post');
}
//添加子系统
export const ADDSUBSYSTEM='/system/addingSubsystems'
export const addSubsystem = function(params){
    return https(ADDSUBSYSTEM, params,'post');
}
/**---------角色管理--------- */

// 查询角色列表
export const QUERYROLELIST='/system/queryRoleInfo'
export const queryRoleList = function(params){
    return https(QUERYROLELIST, params, 'post');
}

// 删除角色
const ROLEDELETE='/system/deleteRoleInfoById'
export const roleDelete = function(params){
    return https(ROLEDELETE, params, 'post', 'form');
}

// 添加角色
const ADDROLE='/system/addingRoleInfo'
export const addRole = function(params){
    return https(ADDROLE, params, 'post');
}

// 角色详情
const ROLEDETAIL='/system/queryRoleInfoById'
export const roleDetail = function(params){
    return https(ROLEDETAIL, params, 'post');
}

// 编辑角色
const ROLEEDIT='/system/editRoleInfo'
export const roleEdit = function(params){
    return https(ROLEEDIT, params, 'post');
}

// 查询角色权限
const QUERYPERMISSIONS='/system/permissionsToQueryRoles'
export const queryRolePermissions = function(params){
    return https(QUERYPERMISSIONS, params, 'post', 'form');
}

// 角色权限分配
const ASSIGNPERMISSIONS='/system/allocationOfPermissions'
export const assignRolePermissions = function(params){
    return https(ASSIGNPERMISSIONS, params, 'post');
}

// 查询系统名称列表
const QUERYSYSNAMELIST='/system/querySystemInfoNoPage'
export const querySysnameList = function(params){
    return https(QUERYSYSNAMELIST, params, 'post');
}


/**---------权限管理--------- */

//查询所有权限菜单
const PERMISSIONSMENU='/system/queryPermissionsMeun'
export const permissionsMenu = function(params){
    return https(PERMISSIONSMENU, params, 'post', 'form');
}

//查询一级菜单列表
const QUERYGROUPINFO='/system/queryGroupinfo'
export const queryGroupinfo = function(params){
    return https(QUERYGROUPINFO, params, 'post');
}

//查询子菜单列表
const QUERYPOWERINFO='/system/queryPowerinfo'
export const queryPowerinfo = function(params){
    return https(QUERYPOWERINFO, params, 'post');
}

//添加一级菜单
const ADDGROUPINFO='/system/addGroupinfos'
export const addGroupinfos = function(params){
    return https(ADDGROUPINFO, params, 'post');
}

//查询一级菜单详情
// const QUERYGROUPINFOBYID='/system/queryGroupinfoById'
const QUERYGROUPINFOBYID='/system/queryGroupinfoByIdNoPage'
export const queryGroupinfoById = function(params){
    return https(QUERYGROUPINFOBYID, params, 'post','form');
}

//编辑一级菜单
const EDITGROUPINFO='/system/editGroupinfo'
export const editGroupinfo = function(params){
    return https(EDITGROUPINFO, params, 'post');
}

//删除一级菜单
const DELETEGROUPINFO='/system/deleteGroupinfo'
export const deleteGroupinfo = function(params){
    return https(DELETEGROUPINFO, params, 'post','form');
}

//添加子菜单
const ADDPOWERINFO='/system/addPowerinfo'
export const addPowerinfo = function(params){
    return https(ADDPOWERINFO, params, 'post');
}

//查询子菜单详情
const QUERYPOWERINFOBYID='/system/queryPowerinfoById'
export const queryPowerinfoById = function(params){
    return https(QUERYPOWERINFOBYID, params, 'post','form');
}

//编辑子菜单
const EDITPOWERINFO='/system/editPowerinfos'
export const editPowerinfos = function(params){
    return https(EDITPOWERINFO, params, 'post');
}

//删除子菜单
const DELPOWERINFO='/system/deletePowerinfos'
export const deletePowerinfos = function(params){
    return https(DELPOWERINFO, params, 'post','form');
}
