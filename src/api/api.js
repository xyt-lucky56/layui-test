import https from '@/utils/axios'  //引入我们二次封装的axios.js文件
 

export const MYTRANFERRECORD = 'transfer/myTranferRecord'

export const  myTranferRecord = function(params){
    return https(MYTRANFERRECORD, params);
}

export const SYSTEMRECORD = 'user/systemRecord'

export const  systemRecord = function(params){
    return https(SYSTEMRECORD, params,'get');
}

export const INFO = 'info/myTranferRecord'

export const  roleInfo = function(params){
    return https(INFO, params,'get');
}

