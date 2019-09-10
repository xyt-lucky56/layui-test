import https from '@/utils/axios'  //引入我们二次封装的axios.js文件 


export const QUERYSYSTEMINFO = '/system/querySystemInfo'
export const querySystemInfo = function(params){
    return https(QUERYSYSTEMINFO, params,'get');
}

export const DELSUBSYSTEM='system/deleteSubsystems'
export const delSubsystem = function(params){
    return https(DELSUBSYSTEM, params,'post');
}