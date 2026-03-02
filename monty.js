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
    const chosenDoorIdx = doors.findIndex(e => e === DoorState.CHOSEN)
    const availableDoorIdx = doors.findIndex(e => e === DoorState.UNKNOWN)
    doors[chosenDoorIdx] = DoorState.UNKNOWN
    doors[availableDoorIdx] = DoorState.CHOSEN
}

const wonPrize = () => DoorState.CHOSEN === doors[prizeIndex]

// expected value: 1/3
const montyHallWithoutSwitch = (limit) => {
    let count = 0
    for (let i = 0; i < limit; i++) {
        reset()
        chooseDoor()
        // reveal omitted since we're not switching anyway
        count += wonPrize()
    }
    return count / limit
}

// expected value: 2/3
const montyHallWithSwitch = (limit) => {
    let count = 0
    for (let i = 0; i < limit; i++) {
        reset()
        chooseDoor()
        revealDoor()
        switchDoor()
        count += wonPrize()
    }
    return count / limit
}

console.log(montyHallWithoutSwitch(1000))
console.log(montyHallWithSwitch(1000))
