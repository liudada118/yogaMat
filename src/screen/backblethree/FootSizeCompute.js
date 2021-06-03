import Compute from './Compute';
import numjs from './numjs';
import preprocess from './preprocess'

var FootSizeCompute = {

    getSize(indexs) {
        /**
         * 计算脚长和脚宽，要求输入2D矩阵
         * input: 压力矩阵
         * height: 矩阵的高
         * width: 矩阵的宽
         * return: [脚长，脚宽，鞋码]
         */
        if (indexs.length == 0 || typeof(indexs) == "undefined") return

        let long = indexs[1] - indexs[0];
        let width = indexs[3] - indexs[2];  
        long = long * (38/ 64)*1.08;
        width = width * (38 / 64)*1.06;
        let size = Math.round(long * 2 - 10);

        return new Array(long, width, size)
    },

    isStart(input) {
        let feet = preprocess.footPreprocess(input);
        let left_foot = feet[0];
        let right_foot = feet[1];
        let left_area = 0;
        let right_area = 0;
        if (left_foot.length != 0) {
             left_area = Compute.pressureAreaSize(left_foot);
        }

        if(right_foot.length != 0){
            right_area = Compute.pressureAreaSize(right_foot);
        }
        return new Array(left_area, right_area)
    },

    isOn(input, leftOn, rightOn) {
        let left_area = 0;
        let right_area = 0;
        let feet = preprocess.footPreprocess(input);
        let left_foot = feet[0];
        let right_foot = feet[1];

        if (left_foot.length != 0) {
            left_area = Compute.pressureAreaSize(left_foot);
        }

        if (right_foot.length != 0) {
            right_area = Compute.pressureAreaSize(right_foot);
        }

        if (left_area >= 100 && leftOn != false) {
            leftOn = true;
        }
        if (right_area >= 100 && rightOn != false) {
            rightOn = true;
        }

        return new Array(leftOn, rightOn)
    },


    isTiptoe(curArray, maxArray, threshold) {
        /**
         * 判断是否踮脚
         */
        let diff = (curArray[1] - curArray[0]) / (maxArray[1] - maxArray[0]);
        // console.log(diff)
        if (diff < threshold) return true
        else return false
    },

    isSide(curArray, maxArray, threshold) {
        /**
         * 判断是否外翻测量脚宽
         */
        let diff = (curArray[3] - curArray[2]) / (maxArray[3] - maxArray[2]);
        if (diff < threshold) return true
        else return false
    },

    sizeFind(bigArr, left_foot_index, right_foot_index, leftTiptoe, rightTiptoe, leftSide, rightSide) {
        /**
         * 找到脚的大小
         */
        let input = numjs.reshape(bigArr, 64, 64);
        let feet = preprocess.leftRightDivision(input);
        let left_part = feet[0];
        let right_part = feet[1];

        // let left_foot_long = 0;
        // let left_shoeSize = 0;
        // let right_foot_long = 0;
        // let left_foot_width = 0;
        // let right_foot_width = 0;
        // let right_shoeSize = 0;


        //得到左右脚新的index（比如 （2，10，2，10）
        let new_left_foot_index = preprocess.boxIndexFind(left_part);
        let new_right_foot_index = preprocess.boxIndexFind(right_part);

        //得到左右脚的压力矩阵
        let new_left_foot = preprocess.boxFind(left_part);
        let new_right_foot = preprocess.boxFind(right_part);

        //如果左脚有压力
        // console.log(new_left_foot)
        if (new_left_foot.length != 0) {
            //左脚那个index和之前最大的index比较，得到他们最大之间面积最大的index
            left_foot_index = numjs.maxIndex(new_left_foot_index, left_foot_index);
            //得到左脚的数据
            let left_data = this.getSize(left_foot_index);
            // left_foot_long = left_data[0];
            // left_foot_width = left_data[1];
            // left_shoeSize = left_data[2]
        }

        //如果右脚有压力
        if (new_right_foot.length != 0) {
            //右脚那个index和之前最大的index比较，得到他们最大之间面积最大的index
            right_foot_index = numjs.maxIndex(new_right_foot_index, right_foot_index);
            //得到右脚的数据
            // let right_data = this.getSize(right_foot_index)
            // right_foot_long = right_data[0];
            // right_foot_width = right_data[1];
            // right_shoeSize = right_data[2];
        }

        if (this.isTiptoe(new_left_foot_index, left_foot_index, 0.4)) {
            leftTiptoe = true;
        }

        if (this.isTiptoe(new_right_foot_index, right_foot_index, 0.4)) {
            rightTiptoe = true;
        }


        if (this.isSide(new_left_foot_index, left_foot_index, 0.7)) {
            leftSide = true;
        }

        if (this.isSide(new_right_foot_index, right_foot_index, 0.7)) {
            rightSide = true;
        }

        

        // let shoeSize = Math.max(left_shoeSize, right_shoeSize);

        let res = {
            // LH: left_foot_long,
            // RH: right_foot_long,
            // LW: left_foot_width,
            // RW: right_foot_width,
            LIndex: left_foot_index,
            RIndex: right_foot_index,
            // SZ: shoeSize,
            LT: leftTiptoe,
            RT: rightTiptoe,
            LS: leftSide,
            RS: rightSide
        }

        return res
    },

}

export default FootSizeCompute