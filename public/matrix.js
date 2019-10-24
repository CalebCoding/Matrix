"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MatrixClass {
    constructor(Dim, Data) {
        this.Dimension = Dim;
        [this.m, this.n] = Dim;
        this.SetDimension(Dim);
        this.Data = Data;
        this.T = this.Transpose;
    }
    AreSameDim(mat) {
        if ((mat.GetDimension()[0].toString() !== this.GetDimension()[0].toString()) ||
            (mat.GetDimension()[1].toString() !== this.GetDimension()[1].toString())) {
            return false;
        }
        return true;
    }
    ;
    SetDimension(Dim) {
        this.Dimension = Dim;
        [this.m, this.n] = Dim;
    }
    GetDimension() {
        return this.Dimension;
    }
    SetValue(val, Dim, N) {
        const { m, n } = typeof Dim == "number" && N !== undefined ? { m: Dim - 1, n: N - 1 } : { m: Dim.m - 1, n: Dim.n - 1 };
        this.Data[m * this.n + n] = val;
    }
    GetValue(mn, N) {
        const { m, n } = typeof mn == "number" && N !== undefined ? { m: mn - 1, n: N - 1 } : { m: mn.m - 1, n: mn.n - 1 };
        return this.Data[m * (this.n) + n];
    }
    GetRawData() {
        return this.Data;
    }
    GetRow(m) {
        if (m <= this.m && m > 0) {
            return this.Data.slice((m - 1) * this.n, m * this.n);
        }
        else {
            throw new Error('Get Matrix Row: Incorrect row number.');
        }
    }
    GetCol(n) {
        if (n <= this.n && n > 0) {
            const Col = Array(this.m);
            for (let M = 0; M < this.m; M++) {
                Col[M] = this.Data[M * this.n + n - 1];
            }
            return Col;
        }
        else {
            throw new Error('Get Matrix Col: Incorrect col number.');
        }
    }
    Transpose() {
        let data = Array(this.m * this.n);
        const [M, N] = [this.m, this.n];
        let col, row;
        col = row = 0;
        this.Data.forEach((val) => {
            data[row * M + col] = val;
            row++;
            if (row == N) {
                row = 0;
                col++;
            }
        });
        this.Data = data;
        this.SetDimension(this.Dimension.reverse());
        return this;
    }
    Display() {
        let str = '';
        let n = 0;
        this.Data.forEach(val => {
            if (n == this.n) {
                n = 0;
                str += '\n';
            }
            str += String(val) + ',\t ';
            n++;
        });
        console.log(str);
    }
}
class NumberMatrixClass extends MatrixClass {
    constructor(Dim, Data) {
        super(Dim, Data);
    }
    Add(mat) {
        if (!this.AreSameDim(mat)) {
            throw new Error('MatrixClass Addtion: Dimensional Error');
        }
        const matValue = mat.GetRawData();
        const thisValue = this.GetRawData();
        let newMat = Array(this.GetDimension()[0] * this.GetDimension()[1]);
        for (let i = 0; i < newMat.length; i++) {
            newMat[i] = thisValue[i] + matValue[i];
        }
        return new NumberMatrixClass(mat.GetDimension(), newMat);
    }
    Sub(mat) {
        if (!this.AreSameDim(mat)) {
            throw new Error('MatrixClass Subtraction: Dimensional Error');
        }
        const matValue = mat.GetRawData();
        const thisValue = this.GetRawData();
        let newMat = Array(this.GetDimension()[0] * this.GetDimension()[1]);
        for (let i = 0; i < newMat.length; i++) {
            newMat[i] = thisValue[i] - matValue[i];
        }
        return new NumberMatrixClass(mat.GetDimension(), newMat);
    }
    multiply(scalar) {
        if (typeof scalar === 'number') {
            this.Data.every((val, pos, data) => {
                data[pos] = scalar * val;
            });
        }
        else {
            const mat = scalar;
        }
        return this;
    }
}
const NumberMatrix = {
    Create(Dim, data) {
        return new NumberMatrixClass(Dim, data);
    },
    _ident: 1,
    _spaceholder: 0,
    Identity(dim) {
        if (dim < 1)
            throw new Error('MatrixClass Identity: Dimension Error');
        let data = Array(dim * dim).fill(this._spaceholder);
        for (let i = 0; i < dim; i++) {
            data[i * (dim + 1)] = this._ident;
        }
        return new NumberMatrixClass([dim, dim], data);
    }
};
exports.default = NumberMatrix;
//# sourceMappingURL=matrix.js.map