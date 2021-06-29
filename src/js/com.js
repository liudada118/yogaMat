export function com(Arr){
    let arr = []
    Arr.forEach((a,index) => {
        if(index >=20){
            arr.push(a)
        }
    })
    let average = arr.reduce((prev,cur) => prev + cur , 0)/arr.length
    let res = 0 
    arr.forEach((a,index) => {
        res += (a - average)*(a - average)
    })
    // console.log(res)
    return arr.length > 1 ? res/arr.length : 0
}