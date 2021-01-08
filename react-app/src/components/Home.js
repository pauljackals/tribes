const Home = ({loggedIn, worlds}) => {
    return (
        <div className="Home">
            <h1>Home</h1>
            <ul>
                {worlds.map((world, index) =>
                    <li key={index}>
                        <span>World {world.id}</span>
                        {loggedIn ? <button>join</button> : ''}
                    </li>
                )}
            </ul>
        </div>
    )
}
export default Home