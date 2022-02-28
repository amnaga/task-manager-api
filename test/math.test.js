const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

test('should calculate total with tip', () => {
    const total = calculateTip(100,.03)
    expect(total).toBe(103)
})

// test('This should fail', () => {
//     throw new Error('Failure')
// })

test('Should convert Farenheit to celcious', () => {
    const celcious = fahrenheitToCelsius(32)
    expect(celcious).toBe(0)
})

test('Should convert celcious to Farenheit', () => {
    const Farenheit = celsiusToFahrenheit(0)
    expect(Farenheit).toBe(32)
})

test('Async test demo', (done)=>{
    setTimeout(()=> {
        expect(2).toBe(2)        
        done()
    },2000)
})

test('should add two numbers', (done) => {
    add(2,3).then((sum) => {
        expect(5).toBe(sum)
        done()
    })
})

// test('should add two numbers async/await', async (done) => {
//     const sum = await add(11,22)
//     expect(sum).toBe(33)
// })