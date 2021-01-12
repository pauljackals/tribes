import {useEffect, useState} from 'react'
import {defaultVillageName} from "../../../functions";
import {Link} from "react-router-dom";

const VillageDetails = ({id, user, village, getVillageDetails, patchVillageName}) => {
    useEffect(() => {
        getVillageDetails(id)
    }, [id, getVillageDetails]);

    const [edit, setEdit] = useState(false)
    const [villageNameNew, setVillageNameNew] = useState('')

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
            {Object.keys(village).length ?
                <>
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
                </> : ''
            }
        </div>
    )
}
export default VillageDetails