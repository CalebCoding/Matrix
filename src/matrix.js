var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var dashline = function () { return console.log('------ \n'); };
var MatrixClass = /** @class */ (function () {
    function MatrixClass(Dim, Data) {
        this.Dimension = Dim;
        this.m = Dim[0], this.n = Dim[1];
        this.SetDimension(Dim);
        this.Data = Data;
        // shorthands
        this.T = this.Transpose;
    }
    MatrixClass.prototype.AreSameDim = function (mat) {
        if ((mat.GetDimension()[0].toString() !== this.GetDimension()[0].toString()) ||
            (mat.GetDimension()[1].toString() !== this.GetDimension()[1].toString())) {
            return false;
        }
        return true;
    };
    ;
    MatrixClass.prototype.SetDimension = function (Dim) {
        this.Dimension = Dim;
        this.m = Dim[0], this.n = Dim[1];
    };
    MatrixClass.prototype.GetDimension = function () {
        return this.Dimension;
    };
    MatrixClass.prototype.SetValue = function (val, Dim, N) {
        var _a = typeof Dim == "number" && N !== undefined ? { m: Dim - 1, n: N - 1 } : { m: Dim.m - 1, n: Dim.n - 1 }, m = _a.m, n = _a.n;
        this.Data[m * this.n + n] = val;
    };
    MatrixClass.prototype.GetValue = function (mn, N) {
        var _a = typeof mn == "number" && N !== undefined ? { m: mn - 1, n: N - 1 } : { m: mn.m - 1, n: mn.n - 1 }, m = _a.m, n = _a.n;
        return this.Data[m * (this.n) + n];
    };
    MatrixClass.prototype.GetRawData = function () {
        return this.Data;
    };
    MatrixClass.prototype.Transpose = function () {
        var data = Array(this.m * this.n);
        var _a = [this.m, this.n], M = _a[0], N = _a[1];
        var col, row;
        col = row = 0;
        this.Data.forEach(function (val) {
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
    };
    MatrixClass.prototype.Display = function () {
        var _this = this;
        var str = '';
        var n = 0;
        this.Data.forEach(function (val) {
            if (n == _this.n) {
                n = 0;
                str += '\n';
            }
            str += String(val) + ',\t ';
            n++;
        });
        console.log(str);
    };
    return MatrixClass;
}());
var NumberMatrixClass = /** @class */ (function (_super) {
    __extends(NumberMatrixClass, _super);
    function NumberMatrixClass(Dim, Data) {
        return _super.call(this, Dim, Data) || this;
    }
    NumberMatrixClass.prototype.Add = function (mat) {
        if (!this.AreSameDim(mat)) {
            throw new Error('MatrixClass Addtion: Dimensional Error');
        }
        var matValue = mat.GetRawData();
        var thisValue = this.GetRawData();
        var newMat = Array(this.GetDimension()[0] * this.GetDimension()[1]);
        for (var i = 0; i < newMat.length; i++) {
            newMat[i] = thisValue[i] + matValue[i];
        }
        return new NumberMatrixClass(mat.GetDimension(), newMat);
    };
    NumberMatrixClass.prototype.Sub = function (mat) {
        if (!this.AreSameDim(mat)) {
            throw new Error('MatrixClass Subtraction: Dimensional Error');
        }
        var matValue = mat.GetRawData();
        var thisValue = this.GetRawData();
        var newMat = Array(this.GetDimension()[0] * this.GetDimension()[1]);
        for (var i = 0; i < newMat.length; i++) {
            newMat[i] = thisValue[i] - matValue[i];
        }
        return new NumberMatrixClass(mat.GetDimension(), newMat);
    };
    return NumberMatrixClass;
}(MatrixClass));
var NumberMatrix = {
    Create: function (Dim, data) {
        return new NumberMatrixClass(Dim, data);
    },
    ident: 1,
    spaceholder: 0,
    Identity: function (dim) {
        if (dim < 1)
            throw new Error('MatrixClass Identity: Dimension Error');
        var data = Array(dim * dim, 0);
        for (var i = 0; i < dim; i++) {
            data[i * (dim + 1)] = this.ident;
        }
        return new NumberMatrixClass([dim, dim], data);
    }
};
// export default MatrixClass
var mat = NumberMatrix.Create([5, 4], [
    2, 3, 7, 11,
    1, 4, 9, 16,
    15, 8, 19, 22,
    11, 12, 13, 14,
    15, 16, 17, 18,
]);
mat.Display();
dashline();
NumberMatrix.Identity(3).Display();
