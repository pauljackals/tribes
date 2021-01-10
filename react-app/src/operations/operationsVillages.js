import axios from "axios";
import {getAxiosUrl} from "../functions";
import {setVillageAction} from "../actions/actionsVillage";

export const getVillageDetailsOperation = idVillage => dispatch => {
    axios.get(getAxiosUrl(`/villages/${idVillage}/details`))
        .then(res => {
            const village = res.data.village
            dispatch(setVillageAction(village))
        }).catch(() => {
        console.log("getVillageDetails operation error")
    })
}