import NumberMatrix from './matrix';
const dashline = () => console.log('------ \n')

const mat = NumberMatrix.Create([5, 4],
    [
        2,  3,  7,  11,
        1,  4,  9,  16,
        15, 8,  19, 22,
        11, 12, 13, 14,
        15, 16, 17, 18,
    ]
)

mat.Display()
dashline()
NumberMatrix.Identity(3).Display()
dashline()
NumberMatrix.Identity(5).Display()
