import {WORLD_GET_SUCCESS} from "../types/typesWorld";

const generateBoard = size => Array(size).fill([]).map(
    (x, indexX) => Array(size).fill({}).map(
        (y, indexY) => ({x: indexX, y: indexY})
    )
)

const reducerBoard = (state=[], action) => {
    switch (action.type) {
        case WORLD_GET_SUCCESS: {
            const world = action.payload.world
            const board = generateBoard(world.size)
            return board.map(x => x.map(location => {
                const village = world.villages.find(village => village.location.x===location.x && village.location.y===location.y)
                if(village) {
                    return {...location, village}
                } else {
                    return location
                }
            }))
        } default: {
            return state
        }
    }
}

export default reducerBoard