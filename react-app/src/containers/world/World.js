import {Redirect} from "react-router-dom";
import {useEffect, Fragment, useState} from 'react'
import '../../styles/World.css'
import Board from "./board/Board";

const World = ({user, worlds, id, board, playWorld}) => {
    useEffect(() => {
        if(user.loggedIn) {
            playWorld(id)
        }
    }, [playWorld, user, id]);

    const world = worlds.find(world => world._id === id)

    const [filters, setFilters] = useState({user: '', village: ''})
    const filterHandle = filter => {
        setFilters({...filters, ...filter})
    }

    return (
        <div className="World">
            {!user.loggedIn ?
                <Redirect push to="/"/> :

                <>
                    <h1>World {world.id}</h1>
                    <Board users={world.users} board={board} user={user}/>

                    <h3>Players</h3>
                    {/*<ul>*/}
                    {/*    {world.users.map((worldUser, indexWorldUser) =>*/}
                    {/*        <li key={indexWorldUser}>*/}
                    {/*            {worldUser.name}*/}
                    {/*            <ul>*/}
                    {/*                {*/}
                    {/*                    world.villages.filter(village => village.user===worldUser._id)*/}
                    {/*                        .map((village, indexVillage) =>*/}
                    {/*                            <li key={indexVillage}>*/}
                    {/*                                {village.name ? village.name : `${worldUser.name}'s village`}*/}
                    {/*                            </li>*/}
                    {/*                        )*/}
                    {/*                }*/}
                    {/*            </ul>*/}
                    {/*        </li>*/}
                    {/*    )}*/}
                    {/*</ul>*/}

                    <table className="players">
                        <tbody>
                            <tr>
                                <td><input onChange={event => filterHandle({user: event.target.value})} placeholder="user name"/></td>
                                <td><input onChange={event => filterHandle({village: event.target.value})} placeholder="village name"/></td>
                            </tr>
                            {world.users.filter(userFiltered => filters.user.length ? userFiltered.name.toLowerCase().includes(filters.user.toLowerCase()) : true).map((worldUser, indexWorldUser) => {
                                const userVillages = world.villages.filter(village => village.user===worldUser._id && (filters.village.length ? (village.name ? village.name.toLowerCase() : `${worldUser.name.toLowerCase()}' village`).includes(filters.village.toLowerCase()) : true))
                                const villageFirst = userVillages[0]
                                const villagesRest = userVillages.slice(1)
                                if(villageFirst) {
                                    return (
                                        <Fragment key={indexWorldUser}>
                                            <tr>
                                                <td rowSpan={userVillages.length}>{worldUser.name}</td>
                                                <td>{villageFirst.name ? villageFirst.name : `${worldUser.name}'s village`}</td>
                                            </tr>
                                            {
                                                villagesRest.map((village, indexVillage) =>
                                                    <tr key={indexVillage}>
                                                        <td>{village.name ? village.name : `${worldUser.name}'s village`}</td>
                                                    </tr>
                                                )
                                            }
                                        </Fragment>
                                    )

                                } else {
                                    return <Fragment key={indexWorldUser}/>
                                }
                            })}
                        </tbody>
                    </table>
                </>
            }
        </div>
    )
}
export default World