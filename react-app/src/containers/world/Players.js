import {defaultVillageName} from "../../functions";
import {useState, Fragment} from 'react'
import {Link} from "react-router-dom";

const Players = ({world, user}) => {
    const [filters, setFilters] = useState({user: '', village: '', villagesNumber: -1})
    const [sorts, setSorts] = useState({user: 0, village: 0, villagesNumber: 0})
    const filterHandle = filter => {
        setFilters({...filters, ...filter})
    }
    const filterHandleNumber = filter => {
        const [key, value] = Object.entries(filter)[0]
        const filterParsed = {[key]: (isNaN(value) ? -1 : parseInt(value))}
        filterHandle(filterParsed)
    }
    const sortHandle = sortKey => {
        const sortValue = sorts[sortKey] + 1
        setSorts({...sorts, [sortKey]: (sortValue > 1 ? -1 : sortValue)})
    }
    return (
        <>
            <h3>Players</h3>
            <table className="players">
                <tbody>
                <tr>
                    <td><input onChange={event => filterHandle({user: event.target.value})} placeholder="user name"/></td>
                    <td><input onChange={event => filterHandle({village: event.target.value})} placeholder="village name"/></td>
                    <td><input onChange={event => filterHandleNumber({villagesNumber: event.target.value})} placeholder="villages number" type="number"/></td>
                </tr>
                <tr>
                    <th onClick={() => sortHandle('user')}>User Name{sorts.user<0 ? ' ↑' : (sorts.user ? ' ↓' : '')}</th>
                    <th onClick={() => sortHandle('village')}>Village Name{sorts.village<0 ? ' ↑' : (sorts.village ? ' ↓' : '')}</th>
                    <th onClick={() => sortHandle('villagesNumber')}>Villages Number{sorts.villagesNumber<0 ? ' ↑' : (sorts.villagesNumber ? ' ↓' : '')}</th>
                </tr>
                {[...world.users].filter(userFiltered => filters.user.length ?
                    userFiltered.name.toLowerCase().includes(filters.user.toLowerCase()) : true
                ).sort((a, b) => {
                    const modifier = sorts.user
                    const result = a.name>b.name ? 1 : (a.name<b.name ? -1 : 0)
                    return modifier*result
                }).sort((a, b) => {
                    const modifier = sorts.villagesNumber
                    const [aVillagesNumber, bVillagesNumber] = world.villages.reduce((acc, v) => v.user===a._id ? [[...acc[0], v], acc[1]] : (v.user===b._id ? [acc[0], [...acc[1], v]] : acc), [[], []]).map(x => x.length)
                    const result = aVillagesNumber>bVillagesNumber ? 1 : (aVillagesNumber<bVillagesNumber ? -1 : 0)
                    return modifier*result
                }).map((worldUser, indexWorldUser) => {
                        const userVillages = [...world.villages].filter(
                            village => village.user===worldUser._id &&
                                (filters.village.length ?
                                        (village.name ? village.name.toLowerCase() : defaultVillageName(worldUser.name.toLowerCase()))
                                            .includes(filters.village.toLowerCase()) : true
                                )
                        ).sort((a, b) => {
                            const modifier = sorts.village
                            const aName = a.name ? a.name : defaultVillageName(worldUser.name)
                            const bName = b.name ? b.name : defaultVillageName(worldUser.name)
                            const result = aName>bName ? 1 : (aName<bName ? -1 : 0)
                            return modifier*result
                        })
                        const villageFirst = userVillages[0]
                        const villagesRest = userVillages.slice(1)
                        const isFilteredVillagesNumber = filters.villagesNumber>=0 ? userVillages.length===filters.villagesNumber : true
                        if(villageFirst && isFilteredVillagesNumber) {
                            return (
                                <Fragment key={indexWorldUser}>
                                    <tr className={worldUser._id===user._id ? "player-you" : ""}>
                                        <td rowSpan={userVillages.length}>{worldUser.name}</td>
                                        <td><Link to={location => `${location.pathname}/village/${villageFirst._id}/details`}>{villageFirst.name ? villageFirst.name : defaultVillageName(worldUser.name)}</Link></td>
                                        <td rowSpan={userVillages.length}>{userVillages.length}</td>
                                    </tr>
                                    {
                                        villagesRest.map((village, indexVillage) =>
                                            <tr key={indexVillage}>
                                                <td><Link to={location => `${location.pathname}/village/${village._id}/details`}>{village.name ? village.name : defaultVillageName(worldUser.name)}</Link></td>
                                            </tr>
                                        )
                                    }
                                </Fragment>
                            )

                        } else {
                            return <Fragment key={indexWorldUser}/>
                        }
                    }
                )}
                </tbody>
            </table>
        </>
    )
}
export default Players