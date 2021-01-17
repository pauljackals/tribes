import {useEffect, useState} from 'react'
import {defaultVillageName} from "../../../functions";
import {Link, Redirect} from "react-router-dom";

const VillageDetails = ({id, user, village, getVillageDetails, patchVillageName}) => {
    useEffect(() => {
        if(user.loggedIn) {
            getVillageDetails(id)
        }
    }, [id, getVillageDetails, user]);

    const [edit, setEdit] = useState(false)
    const [villageNameNew, setVillageNameNew] = useState('')

    if(!user.loggedIn) {
        return (
            <Redirect to="/"/>
        )
    }

    const villageName = village.name ? village.name : defaultVillageName(village.user.name)
    const editHandle = () => {
        setVillageNameNew(villageName)
        setEdit(true)
    }
    const saveHandle = () => {
        setEdit(false)
        patchVillageName(village._id, villageNameNew)
        setVillageNameNew('')
    }

    return (
        <div className="VillageDetails">
            <h1>World {village.world.id}</h1>
            <Link to={location => location.pathname.split('/village')[0]}><button>return</button></Link>
            <h2>{
                !edit ?
                    <>
                        {villageName}
                        {user._id===village.user._id ? <button onClick={editHandle}>edit</button> : ''}
                    </> :
                    <>
                        <input onChange={event => setVillageNameNew(event.target.value)} placeholder={defaultVillageName(user.name)} defaultValue={villageName}/>
                        <button onClick={saveHandle}>save</button><button onClick={() => setEdit(false)}>cancel</button>
                    </>
            }</h2>
            <span>{village.user.name}</span>
        </div>
    )
}
export default VillageDetails