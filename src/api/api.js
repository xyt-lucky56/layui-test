import https from '@/utils/axios'  //引入我们二次封装的axios.js文件 

/*---------系统管理------------ */
export const QUERYSYSTEMINFO = '/system/querySystemInfo'
export const querySystemInfo = function(params){
    return https(QUERYSYSTEMINFO, params,'post');
}

export const DELSUBSYSTEM='system/deleteSubsystems'
export const delSubsystem = function(params){
    return https(DELSUBSYSTEM, params,'post');
}

//查询子系统详情
export const QUERYSUBSYSTEM='/system/querySystemInfoById'
export const querySubsystem = function(params){
    return https(QUERYSUBSYSTEM, params,'post','form');
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
    return https(ROLEDELETE, params, 'post');
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
    return https(QUERYPERMISSIONS, params, 'post');
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