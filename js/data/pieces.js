/**
 * @description 棋子初始数据
 * @author zegu  zhangbin
 */

let piecesType = {

    soldiers_b: { //兵
        id: 0,
        img: '../image/pieces/soldiers_b.png'
    },
    soldiers_r: {
        id: 0,
        img: '../image/pieces/soldiers_r.png'
    },
    general_b: { //将
        id: 1,
        img: '../image/pieces/general_b.png'
    },
    general_r: {
        id: 1,
        img: '../image/pieces/general_r.png'
    },

    scholar_b: { //士
        id: 2,
        img: '../image/pieces/scholar_b.png'
    },
    scholar_r: {
        id: 2,
        img: '../image/pieces/scholar_r.png'
    },
    horse_b: { // 马
        id: 3,
        img: '../image/pieces/horse_b.png'
    },
    horse_r: {
        id: 3,
        img: '../image/pieces/horse_r.png'
    },
    elephant_b: { //象
        id: 4,
        img: '../image/pieces/elephant_b.png'
    },
    elephant_r: {
        id: 4,
        img: '../image/pieces/elephant_r.png'
    },
    gun_b: { //炮
        id: 5,
        img: '../image/pieces/gun_b.png'
    },
    gun_r: {
        id: 5,
        img: '../image/pieces/gun_r.png'
    },

    car_b: { //车
        id: 6,
        img: '../image/pieces/car_b.png'
    },
    car_r: {
        id: 6,
        img: '../image/pieces/car_r.png'
    }
}

let piecesList = [

    //          玩家1
    { //车
        id: 0,
        piecesType: piecesType.car_b,
        position: {
            x: 0,
            y: 0
        }

    },
    { //马
        id: 1,
        piecesType: piecesType.horse_b,
        position: {
            x: 1,
            y: 0
        }

    },
    { //象
        id: 2,
        piecesType: piecesType.elephant_b,
        position: {
            x: 2,
            y: 0
        }

    },
    { //士
        id: 3,
        piecesType: piecesType.scholar_b,
        position: {
            x: 3,
            y: 0
        }

    },
    { //将
        id: 4,
        piecesType: piecesType.general_b,
        position: {
            x: 4,
            y: 0
        }

    },
    { //士
        id: 5,
        piecesType: piecesType.scholar_b,
        position: {
            x: 5,
            y: 0
        }

    },
    { //象
        id: 6,
        piecesType: piecesType.elephant_b,
        position: {
            x: 6,
            y: 0
        }

    },
    { //马
        id: 7,
        piecesType: piecesType.horse_b,
        position: {
            x: 7,
            y: 0
        }

    },
    { //车
        id: 8,
        piecesType: piecesType.car_b,
        position: {
            x: 8,
            y: 0
        }
    },
    { //炮
        id: 9,
        piecesType: piecesType.gun_b,
        position: {
            x: 1,
            y: 2
        }

    },
    { //炮
        id: 10,
        piecesType: piecesType.gun_b,
        position: {
            x: 7,
            y: 2
        }
    },
    { //兵
        id: 11,
        piecesType: piecesType.soldiers_b,
        position: {
            x: 0,
            y: 3
        }

    },
    { //兵
        id: 12,
        piecesType: piecesType.soldiers_b,
        position: {
            x: 2,
            y: 3
        }

    },
    { //兵
        id: 13,
        piecesType: piecesType.soldiers_b,
        position: {
            x: 4,
            y: 3
        }
    },
    { //兵
        id: 14,
        piecesType: piecesType.soldiers_b,
        position: {
            x: 6,
            y: 3
        }

    },
    { //兵
        id: 15,
        piecesType: piecesType.soldiers_b,
        position: {
            x: 8,
            y: 3
        }
    },


    // ***********************       玩家2

    { //兵
        id: 16,
        piecesType: piecesType.soldiers_r,
        position: {
            x: 0,
            y: 6
        }
    },
    { //兵
        id: 17,
        piecesType: piecesType.soldiers_r,
        position: {
            x: 2,
            y: 6
        }
    },
    { //兵
        id: 18,
        piecesType: piecesType.soldiers_r,
        position: {
            x: 4,
            y: 6
        }
    },
    { //兵
        id: 19,
        piecesType: piecesType.soldiers_r,
        position: {
            x: 6,
            y: 6
        }
    },
    { //兵
        id: 20,
        piecesType: piecesType.soldiers_r,
        position: {
            x: 8,
            y: 6
        }
    },
    { //炮
        id: 21,
        piecesType: piecesType.gun_r,
        position: {
            x: 1,
            y: 7
        }
    },
    { //炮
        id: 22,
        piecesType: piecesType.gun_r,
        position: {
            x: 7,
            y: 7
        }
    },
    { //车
        id: 23,
        piecesType: piecesType.car_r,
        position: {
            x: 0,
            y: 9
        }
    },
    { //马
        id: 24,
        piecesType: piecesType.horse_r,
        position: {
            x: 1,
            y: 9
        }
    },
    { //象
        id: 25,
        piecesType: piecesType.elephant_r,
        position: {
            x: 2,
            y: 9
        }
    },
    { //士
        id: 26,
        piecesType: piecesType.scholar_r,
        position: {
            x: 3,
            y: 9
        }
    },
    { //将
        id: 27,
        piecesType: piecesType.general_r,
        position: {
            x: 4,
            y: 9
        }
    },
    { //士
        id: 28,
        piecesType: piecesType.scholar_r,
        position: {
            x: 5,
            y: 9
        }
    },
    { //象
        id: 29,
        piecesType: piecesType.elephant_r,
        position: {
            x: 6,
            y: 9
        }
    },
    { //马
        id: 30,
        piecesType: piecesType.horse_r,
        position: {
            x: 7,
            y: 9
        }
    },
    { //车
        id: 31,
        piecesType: piecesType.car_r,
        position: {
            x: 8,
            y: 9
        }
    }
]

let piecesListBack = []
piecesList.forEach(Element => {
    piecesListBack.push({
        id: Element.id,
        piecesType: Element.piecesType,
        position: {
            x: Element.position.x,
            y: Element.position.y
        }
    })
})


/*象棋段位 */
let chessBit = [{
        cod: 1000,
        bit: "业余一段"
    },
    {
        cod: 2000,
        bit: "业余三段"
    },
    {
        cod: 3000,
        bit: "业余五段"
    },
    {
        cod: 4000,
        bit: "业余七段"
    },
    {
        cod: 5000,
        bit: "业余九段"
    },
    {
        cod: 6000,
        bit: "象棋大师"
    }
]