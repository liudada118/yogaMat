export const  com = {
    // arr 传入所有力的一个数组
    muscle: (arr) => {
        let resArr = []
        for(let j = 0 ; j < arr.length;j++){
            let res = 0
            for(let i = 0 ; i < arr[j].length -1 ; i++){
                res += (arr[j][i+1]-arr[j][i])*(arr[j][i+1]-arr[j][i])
            }
            resArr.push(res/(arr[j].length -1))
        }
        
        return 5- resArr.reduce((prev , cur) => prev + cur)/resArr.length/10000
    },

    // 传入每个动作的个数
    flex: (arr) => {
        return arr.reduce((prev, cur) => prev + cur / 15, 0) / arr.length
    },
     // 传入每个动作的个数
    skill: (arr) => {
        return arr.reduce((prev, cur) => prev + 15 / cur, 0) / arr.length
    },
    endur: () => {
        return 1
    },
    Concen: () => {
        return 1

    }
}
