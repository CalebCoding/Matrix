type Dimension = [number, number]
interface Dimension_Interface{
    m: number,
    n: number,
}

abstract class MatrixClass<Type> {
    protected Dimension: Dimension;
    protected m: number; // columns
    protected n: number; // rows
    protected Data: Array<Type>;

    protected AreSameDim(mat: NumberMatrixClass): Boolean {
        if(
            (mat.GetDimension()[0].toString() !== this.GetDimension()[0].toString())||
            (mat.GetDimension()[1].toString() !== this.GetDimension()[1].toString())
        ){
            return false
        }
        return true
    }

    constructor(Dim: Dimension, Data: Array<Type>){
        this.Dimension = Dim;
        [this.m, this.n] = Dim;
        this.SetDimension(Dim);
        this.Data = Data;

        // shorthands
        this.T = this.Transpose;
    };

    protected SetDimension(Dim: Dimension) {
        this.Dimension = Dim;
        [this.m, this.n] = Dim;
    }

    public GetDimension(){
        return this.Dimension;
    }

    public SetValue(val: Type, mn: Dimension_Interface): void;
    public SetValue(val: Type, m: number, n: number): void;
    public SetValue(val: Type, Dim: Dimension_Interface|number, N?: number){
        const {m, n} = typeof Dim == "number" && N !== undefined ? {m: Dim - 1, n: N - 1} : {m: (Dim as Dimension_Interface).m - 1, n: (Dim as Dimension_Interface).n - 1};
        this.Data[m * this.n + n] = val
    }

    public GetValue(mn: Dimension_Interface): void;
    public GetValue(m: number, n: number): void;
    public GetValue(mn: Dimension_Interface|number, N?: number): Type {
        const {m, n} = typeof mn == "number" && N !== undefined ? {m: mn - 1, n: N - 1} : {m: (mn as Dimension_Interface).m - 1, n: (mn as Dimension_Interface).n - 1};
        return this.Data[m * (this.n) + n]
    }

    public GetRawData(){
        return this.Data
    }

    public T: () => MatrixClass<Type>
    public Transpose(): MatrixClass<Type>{
        let data: Type[] = Array(this.m * this.n);
        const [M, N]: number[] = [this.m, this.n]
        let col: number, row: number;
        col = row = 0;

        this.Data.forEach((val: Type)=> {
            data[row * M + col] = val
            row++
            if(row == N){
                row = 0
                col++
            }
        });
        this.Data = data
        this.SetDimension(this.Dimension.reverse() as Dimension)
        return this
    }

    public Display(): void {
        let str: String = '';
        let n = 0;
        this.Data.forEach(val => {
            if(n == this.n){
                n = 0
                str += '\n'
            }
            str += String(val) + ',\t '
            n++
        });
        console.log(str)
    }
}

class NumberMatrixClass extends MatrixClass<number> {
    constructor(Dim: Dimension, Data: Array<number>){
        super(Dim, Data)
    }

    public Add(mat: NumberMatrixClass): NumberMatrixClass{
        if(!this.AreSameDim(mat)){
            throw new Error('MatrixClass Addtion: Dimensional Error')
        }
        const matValue = mat.GetRawData();
        const thisValue = this.GetRawData();

        let newMat = Array<number>( this.GetDimension()[0] * this.GetDimension()[1] )
        for (let i = 0; i < newMat.length; i++) {
            newMat[i] = (thisValue[i] as number) + (matValue[i] as number)
        }
        return new NumberMatrixClass(mat.GetDimension(), newMat);
    }

    public Sub(mat: NumberMatrixClass): NumberMatrixClass{
        if(!this.AreSameDim(mat)){
            throw new Error('MatrixClass Subtraction: Dimensional Error')
        }
        const matValue = mat.GetRawData();
        const thisValue = this.GetRawData();

        let newMat = Array<number>( this.GetDimension()[0] * this.GetDimension()[1] )
        for (let i = 0; i < newMat.length; i++) {
            newMat[i] = (thisValue[i] as number) - (matValue[i] as number)
        }
        return new NumberMatrixClass(mat.GetDimension(), newMat);
    }

    public multiply(scalar: number): NumberMatrixClass;
    public multiply(mat: NumberMatrixClass): NumberMatrixClass;
    public multiply(scalar: number|NumberMatrixClass): NumberMatrixClass {
        if(typeof scalar === 'number'){
            this.Data.every((val, pos, data) => {
                data[pos] = scalar * val
            })
        } else {
            const mat = scalar
            //WIP
        }
        return this
    }

    // det, multiply, divide

}

const NumberMatrix = {
    Create(Dim: Dimension, data: number[]): NumberMatrixClass{
        return new NumberMatrixClass(Dim, data)
    },
    _ident: 1,
    _spaceholder: 0,
    Identity(dim: number): NumberMatrixClass {
        if (dim < 1) throw new Error('MatrixClass Identity: Dimension Error')
        let data: number[] = Array<number>(dim * dim).fill(this._spaceholder)
        for (let i = 0; i < dim; i++) {
            data[i * (dim + 1)] = this._ident
        }
        return new NumberMatrixClass([dim, dim], data)
    }

}

export default NumberMatrix
