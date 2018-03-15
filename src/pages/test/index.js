import '@/base';
import '@/pages/test/index.css';
import img from './test.jpg';

const a = Object.assign({
    a: 1
}, {
    b: 6
});

const b = () => {
    console.log(a)
}

console.log(img);

window.dy = b;