function week(num){
    if(num === 0){
        return '星期天'
    }else if(num === 1){
        return '星期一'
    }else if(num === 2){
        return '星期二'
    }else if(num === 3){
        return '星期三'
    }else if(num === 4){
        return '星期四'
    }else if(num === 5){
        return '星期五'
    }else if(num === 6){
        return '星期六'
    }
}

export function Dates(date){
    let weeks = week(date.getDay())
    return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日${weeks}`
}

