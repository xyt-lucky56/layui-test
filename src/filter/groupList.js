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

// 系统名称
export const sysnameList = [
    { val: "operational", label: "运营平台" },
    { val: "order", label: "订单管理系统" },
    { val: "finance", label: "财务管理系统" },
    { val: "stock ", label: "库存管理系统" }
]

export const filterSysName = function(){
    $("[data-field = 'systemname']").children().each(function(){
        var val = $(this).text();
        if(val === 'operational'){                          
            $(this).text("运营平台");
        }else if(val === 'order'){           
            $(this).text("订单管理系统");
        }else if(val === 'finance'){           
            $(this).text("财务管理系统");
        }else if(val === 'stock'){
            $(this).text("库存管理系统");           
        }        
    })
}

// 界面类型
export const viewList = [
    { val: "B/S", label: "B/S" },
    { val: "C/S", label: "C/S" },
    { val: "安卓", label: "安卓" },
    { val: "小程序 ", label: "小程序" },
    { val: "IOS ", label: "IOS" }
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
