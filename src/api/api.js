import https from '@/utils/axios'  //引入我们二次封装的axios.js文件 


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