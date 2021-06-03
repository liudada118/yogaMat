var scijs = {

    matrixMultiplication(a, b) {
        /**
         * 矩阵乘法
         * a: 矩阵a
         * b：矩阵b
         * return: 相乘之后的矩阵
         */
        if (a.length === 0 || b.length) {
            console.info('Empty array is not possible');
            return null
        }
        let len = a.length,
            arr = [];
        for (let i = 0; i < len; i++) {
            arr[i] = [];
            for (let j = 0; j < len; j++) {
                arr[i][j] = 0;
                for (let k = 0; k < len; k++) {
                    arr[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return arr;
    },

    matrixAddition(a, b) {
        /**
         * 矩阵加法
         * a：矩阵a
         * b：矩阵b
         * return：a与b相加得到的矩阵
         */
        if (a.length === 0 || b.length == 0) {
            console.info('Empty matrix is not possible to add');
            return null
        }

        if (a.length != b.length || a[0].length != b[0].length) {
            console.info('Unexpected size of matrixs');
            return null
        }


        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[0].length; j++) {
                a[i][j] = a[i][j] + b[i][j];
            }
        }
        return a
    },

    matrixSubtraction(a, b) {
        /**
         * 矩阵减法
         * a：矩阵a
         * b：矩阵b
         * return：a-b的矩阵
         */
        if (a.length === 0 || b.length == 0) {
            console.info('Empty matrix is not possible to add');
            return null
        }

        if (a.length != b.length || a[0].length != b[0].length) {
            console.info('Unexpected size of matrixs');
            return null
        }


        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[0].length; j++) {
                a[i][j] = a[i][j] - b[i][j];
            }
        }
        return a
    },

    matrixTranspose(M) {
        /**
         * 矩阵转置
         * input：输入的矩阵
         * return：转置后的矩阵
         */
        if (M.length === 0) {
            console.info('Empty array is not possible');
            return null
        }
        let reversedArr = [];
        for (let n = 0; n < M[0].length; n++) {
            reversedArr[n] = [];
            for (let j = 0; j < M.length; j++) {
                reversedArr[n][j] = sourceArr[j][n];
            }
        }
        return reversedArr;
    },

    matrixInvert(M) {
        /**
         * 求矩阵的逆
         * M: 输入的矩阵
         * return: 矩阵的逆
         */

        //如果矩阵不是M，返回
        if (M.length !== M[0].length || M.length === 0) {
            console.info('matrix is not available for invert');
            return null
        }

        let i = 0,
            ii = 0,
            j = 0,
            dim = M.length,
            e = 0,
            t = 0;
        let I = [],
            C = [];
        for (i = 0; i < dim; i += 1) {
            I[I.length] = [];
            C[C.length] = [];
            for (j = 0; j < dim; j += 1) {
                if (i == j) { I[i][j] = 1; } else { I[i][j] = 0; }
                C[i][j] = M[i][j];
            }
        }

        for (i = 0; i < dim; i += 1) {
            e = C[i][i];
            if (e == 0) {
                for (ii = i + 1; ii < dim; ii += 1) {
                    if (C[ii][i] != 0) {
                        for (j = 0; j < dim; j++) {
                            e = C[i][j];
                            C[i][j] = C[ii][j];
                            C[ii][j] = e;
                            e = I[i][j];
                            I[i][j] = I[ii][j];
                            I[ii][j] = e;
                        }
                        break;
                    }
                }
                e = C[i][i];

                if (e == 0) { return }
            }
            for (j = 0; j < dim; j++) {
                C[i][j] = C[i][j] / e;
                I[i][j] = I[i][j] / e;
            }

            for (ii = 0; ii < dim; ii++) {
                if (ii == i) { continue; }
                e = C[ii][i];

                for (j = 0; j < dim; j++) {
                    C[ii][j] -= e * C[i][j];
                    I[ii][j] -= e * I[i][j];
                }
            }
        }
        return I;
    },

    matrixDet(M) {
        /**
         * M：输入矩阵
         * return：M的行列式
         */

        // 方阵约束
        if (M.length !== M[0].length || M.length === 0) {
            console.info('the matrix is not available for compute')
            return null
        }
        // 方阵阶数
        let n = M.length;
        let result = 0;
        if (n > 3) {
            // n 阶
            for (let column = 0; column < n; column++) {
                // 去掉第 0 行第 column 列的矩阵
                let matrix = new Array(n - 1).fill(0).map(arr => new Array(n - 1).fill(0));
                for (let i = 0; i < n - 1; i++) {
                    for (let j = 0; j < n - 1; j++) {
                        if (j < column) {
                            matrix[i][j] = M[i + 1][j];
                        } else {
                            matrix[i][j] = M[i + 1][j + 1];
                        }
                    }
                }
                result += M[0][column] * Math.pow(-1, 0 + column) * det(matrix);
            }
        } else if (n === 3) {
            // 3 阶
            result = M[0][0] * M[1][1] * M[2][2] +
                M[0][1] * M[1][2] * M[2][0] +
                M[0][2] * M[1][0] * M[2][1] -
                M[0][2] * M[1][1] * M[2][0] -
                M[0][1] * M[1][0] * M[2][2] -
                M[0][0] * M[1][2] * M[2][1];
        } else if (n === 2) {
            // 2 阶
            result = M[0][0] * M[1][1] - M[0][1] * M[1][0];
        } else if (n === 1) {
            // 1 阶
            result = M[0][0];
        }
        return result
    }
        

}
export default scijs