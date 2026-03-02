const DoorState = {
    UNKNOWN: 0,
    CHOSEN: 1,
    GOAT: 2
};

const doors = Array(3)
let prizeIndex = 0

const reset = () => {
    doors.fill(DoorState.UNKNOWN)
    prizeIndex = pickRandomIndex(doors.length)
}

const pickRandomIndex = (len) => Math.floor(Math.random() * len);

const chooseDoor = () => {
    doors[pickRandomIndex(doors.length)] = DoorState.CHOSEN
}

const revealDoor = () => {
    // Monty can only choose a door that the player hasn't chosen
    // and that doesn't have the prize. There could be one or two
    const choices = doors.reduce((res, door, idx) => {
        if (door === DoorState.UNKNOWN && idx !== prizeIndex) {
            res.push(idx)
        }
        return res
    }, [])
    const idx = choices[pickRandomIndex(choices.length)]
    doors[idx] = DoorState.GOAT
}

const switchDoor = () => {
    const chosenDoor = doors.findIndex(e => e === DoorState.CHOSEN)
    const availableDoor = doors.findIndex(e => e === DoorState.UNKNOWN)
    doors[chosenDoor] = DoorState.UNKNOWN
    doors[availableDoor] = DoorState.CHOSEN
}

const wonPrize = () => DoorState.CHOSEN === doors[prizeIndex]

// expected value: 1/3
const montyHallWithoutSwitch = (numPlays) => {
    let countWins = 0
    for (let i = 0; i < numPlays; i++) {
        reset()
        chooseDoor()
        // reveal omitted since we're not switching anyway
        countWins += wonPrize()
    }
    return countWins / numPlays
}

// expected value: 2/3
const montyHallWithSwitch = (numPlays) => {
    let countWins = 0
    for (let i = 0; i < numPlays; i++) {
        reset()
        chooseDoor()
        revealDoor()
        switchDoor()
        countWins += wonPrize()
    }
    return countWins / numPlays
}

console.log(montyHallWithoutSwitch(1000))
console.log(montyHallWithSwitch(1000))
