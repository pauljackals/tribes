import axios from "axios";
import {getAxiosUrl} from "../functions";
import {setVillageAction, setVillageNameAction} from "../actions/actionsVillage";

export const getVillageDetailsOperation = idVillage => dispatch => {
    axios.get(getAxiosUrl(`/villages/${idVillage}/details`))
        .then(res => {
            const village = res.data.village
            dispatch(setVillageAction(village))
        }).catch(() => {
        console.log("getVillageDetails operation error")
        })
}

export const patchVillageNameOperation = (idVillage, name) => async dispatch => {
    axios.patch(getAxiosUrl(`/villages/${idVillage}`), {name})
        .then(res => {
            const village = res.data.village
            dispatch(setVillageNameAction(village.name))
        }).catch((err) => {
            console.log("patchVillageName operation error")
            console.log(err)
        })
}