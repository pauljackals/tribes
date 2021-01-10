import {useEffect} from 'react'
import {defaultVillageName} from "../../../functions";
import {Link} from "react-router-dom";

const VillageDetails = ({id, user, village, getVillageDetails}) => {
    useEffect(() => {
        if(user.loggedIn) {
            getVillageDetails(id)
        }
    }, [id, user, getVillageDetails]);

    return (
        <div className="VillageDetails">
            {Object.keys(village).length ?
                <>
                    <h1>World {village.world.id}</h1>
                    <Link to={location => location.pathname.split('/village/')[0]}><button>return</button></Link>
                    <h2>{village.name ? village.name : defaultVillageName(village.user.name)}</h2>
                    <span>{village.user.name}</span>
                </> : ''
            }
        </div>
    )
}
export default VillageDetails