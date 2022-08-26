function renderLED(ledMap: boolean[][]) {
    ledMap.forEach((row, y) => {
        row.forEach((value, x) => {
            ledToggleFromBool(4 - y, 4 - x, value);
        })
    })
}
function ledToggleFromBool(x: number, y: number, value: boolean) {
    if (value) {
        led.plot(x, y)
    } else {
        led.unplot(x, y)
    }
}
const defaultLedMap = [
    [
        true,
        false,
        false,
        false,
        false
    ],
    [
        false,
        false,
        false,
        false,
        false
    ],
    [
        false,
        false,
        false,
        false,
        false
    ],
    [
        false,
        false,
        false,
        false,
        false
    ],
    [
        false,
        false,
        false,
        false,
        false
    ]
]
let ledMap = defaultLedMap;

function rotateArray(ledMap: boolean[][], columnIndex: number): boolean[][] {
    const newLedMap = ledMap;
    newLedMap[columnIndex].push(newLedMap[columnIndex].shift());

    return newLedMap;
}

function judgeGame(ledMap: boolean[][]) {
    let isCleared = ledMap.every((list)=> JSON.stringify(list) === JSON.stringify(ledMap[0]));
    return isCleared;
}

let gameState = true;

function gameEnd(ledMap: boolean[][]) {
    const isCleared = judgeGame(ledMap);

    basic.showIcon(isCleared ? IconNames.Happy : IconNames.Sad);

    gameState = false;
}

let currentColumn = 0;

input.onButtonPressed(Button.B, function () {
    currentColumn++;
    ledMap = ledMap.map((list, index) =>
        index == currentColumn ? [true, false, false, false, false] : list
    )
})

basic.forever(function () {
    if (!gameState) {
        basic.pause(1000);
        currentColumn = 0;
        gameState = true;
        ledMap = defaultLedMap;
        return;
    }

    if (currentColumn >= 5) {
        gameEnd(ledMap);
        return;
    }

    rotateArray(ledMap, currentColumn);
    renderLED(ledMap);

    basic.pause(300);
})
