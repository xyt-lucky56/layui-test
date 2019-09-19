// 房租编号
export const roomList = [{
    val: "A排",
    label: 1
}, {
    val: "B排",
    lable: 2
}, {
    val: "C排",
    label: 3
}, {
    val: "D排",
    label: 4
}]

// 用户类型
export const userTypeList = [
    { val: "01", label: "运营平台人员" },
    { val: "02", label: "企业" },
    { val: "03", label: "个人" },
    { val: "04 ", label: "供应商" },
    { val: "05", label: "司机" },
]
export const filterUserType = function(value){
    if(value&&value!=null){
        if(value == "01"){
            return "运营平台人员"
        }else if(value == "02"){
            return "企业"
        }else if(value == "03"){
            return "个人"
        }else if(value == "04"){
            return "供应商"
        }else if(value == "05"){
            return "司机"
        }
    }else{
        return '--'
    }
}

// 界面类型
export const viewList = [
    { val: "B/S", label: "B/S" },
    { val: "C/S", label: "C/S" },
    { val: "安卓", label: "安卓" },
    { val: "小程序", label: "小程序" },
    { val: "IOS", label: "IOS" },
]

export const filterViewType = function(){
    $("[data-field = 'viewType']").children().each(function(){
        var val = $(this).text();
        if(val === 'B/S'){                          
            $(this).text("B/S");
        }else if(val === 'C/S'){            
            $(this).text("C/S");
        }else if(val === '安卓'){            
            $(this).text("安卓");
        }else if(val === '小程序'){
            $(this).text("小程序");            
        }else if(val === 'IOS'){
            $(this).text("IOS");           
        }       
    })
}

export const roleTypes=[
    { val: "button", label: "button" },
    { val: "authory", label: "authory" },
    { val: "item", label: "item" },
]

export const filterData = function(value){
    if(value&&value!=null){
        return value
    }else{
        return '--'
    }
}

export const isexpands = function(val){
    if(val){
        return '是'
    }else{
        return '否'
    }
}
