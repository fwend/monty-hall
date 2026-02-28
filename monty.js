const State = {
    UNKNOWN: 0,
    CHOSEN: 1,
    EMPTY: 2
};

let boxes = Array(3)
let prizeIndex = 0

const reset = () => {
    boxes = boxes.fill(State.UNKNOWN)
    prizeIndex = pickRandomIndex(boxes.length)
}

const pickRandomIndex = (len) => Math.floor(Math.random() * len);

const chooseBox = () => {
    boxes[pickRandomIndex(boxes.length)] = State.CHOSEN
}

const revealBox = () => {
    // Monty can only choose an empty box that the player hasn't chosen
    // There could be one or two
    const choices = boxes.reduce((res, box, idx) => {
        if (box === State.UNKNOWN && idx !== prizeIndex) {
            res.push(idx)
        }
        return res
    }, [])
    const idx = choices[pickRandomIndex(choices.length)]
    boxes[idx] = State.EMPTY
}

const switchBox = () => {
    const chosenBoxIdx = boxes.findIndex(e => e === State.CHOSEN)
    const availableBoxIdx = boxes.findIndex(e => e === State.UNKNOWN)
    boxes[chosenBoxIdx] = State.UNKNOWN
    boxes[availableBoxIdx] = State.CHOSEN
}

const result = () => boxes[prizeIndex] === State.CHOSEN

// expected value: 1/3
function  montyHallWithoutSwitch(size) {
    let count = 0
    for (let i = 0; i < size; i++) {
        reset()
        chooseBox()
        revealBox()
        count += result()
    }
    return count / size
}

// expected value 2/3
function montyHallWithSwitch(size) {
    let count = 0
    for (let i = 0; i < size; i++) {
        reset()
        chooseBox()
        revealBox()
        switchBox()
        count += result()
    }
    return count / size
}

console.log(montyHallWithoutSwitch(1000))
console.log(montyHallWithSwitch(1000))
