import BoardField from "./BoardField";

const Board = ({board, user, users}) => {

    return (
        <table className="board">
            <tbody>
                {board.map((row, indexRow) => <tr key={indexRow}>
                    {row.map((field, indexField) => <BoardField key={indexField} village={field.village} user={user} users={users}/>)}
                </tr>)}
            </tbody>
        </table>
    )
}
export default Board