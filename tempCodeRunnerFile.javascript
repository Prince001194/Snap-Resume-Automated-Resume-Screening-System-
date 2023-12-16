
function fibonacci(n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

const sequence = [];

for (let i = 0; i <= 10; i++) {
    sequence.push(fibonacci(i));
}
console.log(sequence);