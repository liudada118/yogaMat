import numjs from './numjs';
import preprocess from './preprocess'



var playStage = {

    currentState(bigArrg, curArrg) {
        /**
         * bigArrg: 最大的矩阵
         * curArrg：现在的矩阵
         * return： -2：没有脚在上面，-3:表示脚偏移了，[[-1:1], [-1,1], [-1,1], [-1,1]] => [左脚踮脚程度，左脚内外翻程度，右脚踮脚程度，右脚内外翻程度]
         */

        if (curArrg == null || typeof(curArrg) == "undefined") return -2
        if (bigArrg == null || typeof(bigArrg) == "undefined") return -2
        if (bigArrg.length === 0 || curArrg.length === 0) return -2

        bigArrg = numjs.reshape(bigArrg, 64, 64);
        curArrg = numjs.reshape(curArrg, 64, 64);

        if (numjs.isSmaller(bigArrg, 4033) || numjs.isSmaller(curArrg, 4033)) return -2
        let Ltr = -4;
        let Llr = -4;
        let Rtr = -4;
        let Rlr = -4;

        //最大矩阵切割左右脚，并得到左右脚的index和数据矩阵
        let big_feet = preprocess.leftRightDivision(bigArrg);
        let big_left_part = big_feet[0];
        let big_right_part = big_feet[1];
        //得到左右脚新的index（比如 （2，10，2，10）
        let big_left_index = preprocess.boxIndexFind(big_left_part);
        let big_right_index = preprocess.boxIndexFind(big_right_part);


        //当前矩阵切割左右脚，并得到左右脚的index和数据矩阵
        let cur_feet = preprocess.leftRightDivision(curArrg);
        let cur_left_part = cur_feet[0];
        let cur_right_part = cur_feet[1];
        let cur_left_index = preprocess.boxIndexFind(cur_left_part);
        let cur_right_index = preprocess.boxIndexFind(cur_right_part);

        //左脚目前的矩阵和最大矩阵位置的偏移程度
        let Ltop_diff = big_left_index[0] - cur_left_index[0];
        let Lbottom_diff = big_left_index[1] - cur_left_index[1];
        let Lleft_diff = big_left_index[2] - cur_left_index[2];
        let Lright_diff = big_left_index[3] - cur_left_index[3];

        //右脚目前矩阵和最大矩阵位置的偏移程度
        let Rtop_diff = big_right_index[0] - cur_right_index[0];
        let Rbottom_diff = big_right_index[1] - cur_right_index[1];
        let Rleft_diff = big_right_index[2] - cur_right_index[2];
        let Rright_diff = big_right_index[3] - cur_right_index[3];


        //如果前脚移动范围过大，后脚跟也变化过大的时候，返回-3表示偏移正确的范围
        if ((Ltop_diff >= 15 || Ltop_diff <= -15) && (Lbottom_diff >= 15 || Lbottom_diff <= -15))
            return -3
        //如果左边移动,右边也移动过大的时候，返回-3表示偏移正确的范围
        if ((Lleft_diff >= 15 || Lleft_diff <= -15) && (Lright_diff >= 15 || Lright_diff <= -15))
            return -3

        //如果前脚移动范围过大，后脚跟也变化过大的时候，返回-3表示偏移正确的范围
        if ((Rtop_diff >= 15 || Rtop_diff <= -15) && (Rbottom_diff >= 15 || Rbottom_diff <= -15))
            return -3
        //如果左边移动,右边也移动过大的时候，返回-3表示偏移正确的范围
        if ((Rleft_diff >= 15 || Rleft_diff <= -15) && (Rright_diff >= 15 || Rright_diff <= -15))
            return -3


        if (big_left_part.length != 0 && cur_left_part.length != 0) {
            Ltr = this.tiptoeRatio(big_left_index, cur_left_index);
            Llr = this.leftRightRatio(big_left_index, cur_left_index);
        }

        if (big_right_part.length != 0 && cur_right_part.length != 0) {
            Rtr = this.tiptoeRatio(big_right_index, cur_right_index);
            Rlr = this.leftRightRatio(big_right_index, cur_right_index);
        }

        return new Array(Ltr, Llr, Rtr, Rlr)

    },

    tiptoeRatio(big_left_index, cur_left_index) {
        /**
         * big_left_index: 左脚/右脚的正确的index
         * cur_left_index: 目前左/右脚的目前的index
         * return：[-1, 1]
         */
        let diff
        let total = big_left_index[1] - big_left_index[0];
        let top_diff = big_left_index[0] - cur_left_index[0];
        let bottom_diff = big_left_index[1] - cur_left_index[1];

        if (top_diff < 15 && top_diff > -15 && (bottom_diff > 2 || bottom_diff < -2)) {
            let part = cur_left_index[1] - cur_left_index[0];
            diff = part / total;
            diff = diff - 1;

        } else if (bottom_diff < 15 && bottom_diff > -15 && (top_diff > 2 || top_diff < -2)) {
            let part = cur_left_index[1] - cur_left_index[0];
            diff = part / total;
            diff = 1 - diff;

        } else {
            diff = 0;
        }

        return diff
    },

    leftRightRatio(big_left_index, cur_left_index) {
        /**
         * big_left_index: 左脚/右脚的正确的index
         * cur_left_index: 目前左/右脚的目前的index
         * return：[-1, 1]
         */
        let diff
        let total = big_left_index[1] - big_left_index[0];
        let left_diff = big_left_index[2] - cur_left_index[2];
        let right_diff = big_left_index[3] - cur_left_index[3];

        if (left_diff < 15 && left_diff > -15 && (right_diff > 2 || right_diff < -2)) {
            let part = cur_left_index[3] - cur_left_index[2];
            diff = part / total;
            diff = diff - 1;

        } else if (right_diff < 15 && right_diff > -15 && (left_diff > 2 || left_diff < -2)) {
            let part = cur_left_index[3] - cur_left_index[2];
            diff = part / total;
            diff = 1 - diff;
        } else {
            diff = 0;
        }

        return diff
    }

}
export default playStage