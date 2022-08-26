/**
 * [value]に対応した点灯・消灯をする
 * @param {number} x the horizontal coordinate of the LED starting at 0
 * @param {number} y the vertical coordinate of the LED starting at 0
 * @param {boolean} value trueなら点灯、falseなら消灯
 */
function ledToggleFromBool(x: number, y: number, value: boolean) {
    if (value) {
        led.plot(x, y)
    } else {
        led.unplot(x, y)
    }
}
/**
 * 5*5の2次元配列に対応したLEDを点灯させる
 * @param {boolean[][]} ledMap 光らせたい位置をtrueにした5*5の2次元配列
 */
function renderLED(ledMap: boolean[][]) {
    ledMap.forEach((row, y) => {
        row.forEach((value, x) => {
            ledToggleFromBool(y, x, value);
        })
    })
}
/**
 * [array]を回転させる (参照渡し的に)
 * @param {array} 回転させる配列
 */
function rotateArray(array: boolean[]) {
    array.unshift(array.pop());
}
/**
 * 2次元配列の要素がすべて等しいかを返す。ゲームのクリア判定用
 * @param {boolean[][]} 検証したい2次元配列
 * @return {boolean} すべて等しい配列かどうか
 */
function judgeGame(ledMap: boolean[][]): boolean {
    let isCleared = ledMap.every((list) => JSON.stringify(list) === JSON.stringify(ledMap[0]));
    return isCleared;
}
const defaultLedMap = [
    [
        false,
        false,
        false,
        false,
        true
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
let currentColumn = 0;

input.onButtonPressed(Button.B, function () {
    currentColumn++;
    // 新しい列に移動するときにtrueを追加する
    ledMap = ledMap.map((list, index) =>
        index == currentColumn ? [false, false, false, false, true] : list
    )
})

let gameLevel = 0;
// let gameTicks = [300, 300, 300, 300]
let gameTicks = [300, 200, 100, 70];
let maxGameLevel = gameTicks.length;

basic.forever(function () {
    // 一巡終わり時
    if (currentColumn >= 5) {
        const isCleared = judgeGame(ledMap);

        if (isCleared) {
            basic.showIcon(IconNames.Happy);
            basic.pause(1000);

            gameLevel = gameLevel + 1;

            if (gameLevel >= maxGameLevel) {
                basic.showIcon(IconNames.SmallHeart);
                basic.pause(100);
                basic.showIcon(IconNames.Heart);
                basic.pause(100);
                basic.showIcon(IconNames.SmallHeart);
                basic.pause(100);
                basic.showIcon(IconNames.Heart);
                basic.pause(100);
                basic.showIcon(IconNames.SmallHeart);
                basic.pause(100);
                basic.showIcon(IconNames.Heart);
                basic.pause(100);


                return;
            }
        } else {
            basic.showIcon(IconNames.Sad);
            basic.pause(1000);
            gameLevel = 0;
        }

        // 初期化処理
        currentColumn = 0;
        ledMap = defaultLedMap;
        return;
    }

    rotateArray(ledMap[currentColumn]);
    renderLED(ledMap);

    basic.pause(gameTicks[gameLevel]);
})
