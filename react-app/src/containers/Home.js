import {useEffect, useState} from "react";

const Home = ({user, worlds, fetchWorlds}) => {
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchWorldsAsync = async () => {
            const result = await fetchWorlds()
            if(result && !result.success) {
                setError(true)
            }
        }
        fetchWorldsAsync().then()
    }, [fetchWorlds, setError]);

    return (
        <div className="Home">
            <h1>Home</h1>
            {error ? <div className="error">Connection error</div> : ''}

            <ul>
                {worlds.map((world, index) =>
                    <li key={index}>
                        <span>World {world.id}</span>
                        {user.loggedIn ?
                            (
                                user.worlds.find(worldUser => worldUser===world._id) ?
                                    <button>play</button> :
                                    <button>join</button>
                            ) : ''}
                    </li>
                )}
            </ul>
        </div>
    )
}
export default Home