import {BOARD_ADD_VILLAGES, CLEAR_BOARD, GENERATE_BOARD} from "../types/typesBoard";

const generateBoard = size => Array(size).fill([]).map(
    (x, indexX) => Array(size).fill({}).map(
        (y, indexY) => ({x: indexX, y: indexY})
    )
)

const reducerBoard = (state=[], action) => {
    switch (action.type) {
        case GENERATE_BOARD: {
            return generateBoard(action.payload.size)
        } case BOARD_ADD_VILLAGES: {
            const villages = action.payload.villages
            return state.map(x => x.map(location => {
                const village = villages.find(village => village.location.x===location.x && village.location.y===location.y)
                if(village) {
                    return {...location, village}
                } else {
                    return location
                }
            }))
        } case CLEAR_BOARD: {
            return []
        } default: {
            return state
        }
    }
}

export default reducerBoard