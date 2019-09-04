import https from '@/utils/axios'  //引入我们二次封装的axios.js文件
 

export const MYTRANFERRECORD = 'transfer/myTranferRecord'

export const  myTranferRecord = function(params){
    return https(MYTRANFERRECORD, params);
}

