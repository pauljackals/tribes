import BoardField from "./BoardField";
import {connect} from 'react-redux'

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
const mapStateToProps = state => {
    return {
        board: state.reducerBoard
    }
}
export default connect(mapStateToProps)(Board)