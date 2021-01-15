import {BOARD_ADD_VILLAGES, GENERATE_BOARD} from "../types/typesBoard";

export const boardAddVillagesAction = villages => {
    return {type: BOARD_ADD_VILLAGES, payload: {villages}}
}

export const generateBoardAction = size => {
    return {type: GENERATE_BOARD, payload: {size}}
}