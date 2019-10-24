"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matrix_1 = require("./matrix");
const dashline = () => console.log('------ \n');
const mat = matrix_1.default.Create([5, 4], [
    2, 3, 7, 11,
    1, 4, 9, 16,
    15, 8, 19, 22,
    11, 12, 13, 14,
    15, 16, 17, 18,
]);
mat.Display();
dashline();
console.log(mat.GetCol(2));
//# sourceMappingURL=index.js.map