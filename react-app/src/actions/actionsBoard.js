import {BOARD_ADD_VILLAGES, CLEAR_BOARD, GENERATE_BOARD} from "../types/typesBoard";

export const boardAddVillagesAction = villages => {
    return {type: BOARD_ADD_VILLAGES, payload: {villages}}
}

export const clearBoardAction = () => {
    return {type: CLEAR_BOARD}
}

export const generateBoardAction = size => {
    return {type: GENERATE_BOARD, payload: {size}}
}