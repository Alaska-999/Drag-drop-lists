import './App.css'
import {useState} from "react";

function App() {
    const [boards, setBoards] = useState(
        [
            {
                id: 1, title: 'To do', items: [
                    {id: 2, title: 'Go to the mall'},
                    {id: 3, title: 'Throw out the trash'},
                    {id: 4, title: 'Code review'}]
            },
            {
                id: 2, title: 'To check', items: [
                    {id: 5, title: 'Cook dinner'},
                    {id: 6, title: 'Learn React'},
                    {id: 7, title: 'Learn traffic rules'},]
            },
            {
                id: 3, title: 'Done', items: [
                    {id: 8, title: 'Сlean in the apartment'},
                    {id: 9, title: 'Finish the book'}]
            }
        ]
    )

    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)

    function dragStartHandler(e, board, item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className == 'item') {
            e.target.style.boxShadow = '0 2px 3px gray'
        }
    }

    function dropHandler(e, board, item) {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }


    function dropCardHandler(e, board) {
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }

    return (
        <div className="app">
            {boards.map(board =>
                <div className='board'
                onDragOver={(e) => dragOverHandler(e)}
                     onDrop={(e) => dropCardHandler(e,board)}
                >
                    <div className='board__title'>{board.title}</div>
                    {board.items.map(item =>
                        <div
                            onDragStart={(e) => dragStartHandler(e, board, item)}
                            onDragLeave={(e) => dragEndHandler(e)}
                            onDragEnd={(e) => dragLeaveHandler(e)}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDrop={(e) => dropHandler(e, board, item)}
                            className='todo'
                            draggable={true}
                            className='item'
                        >{item.title}</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
