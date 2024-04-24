import './App.css'
import {useEffect, useState} from "react";

interface TodoItem {
    uuid: number;
    text: string;
    completed: boolean;
}

const App = () => {
    const [todoList, setTodoList] = useState<TodoItem[]>([])

    useEffect(() => {
        console.log(todoList)
    }, [todoList]);

    return (
        <>
            <input type={'text'} onKeyDown={
                (e) => {
                    if (e.key === 'Enter') {
                        const newTodoItem: TodoItem = {
                            uuid: Date.now(),
                            text: (e.target as HTMLInputElement).value,
                            completed: false
                        };
                        (e.target as HTMLInputElement).value = ''
                        setTodoList([...todoList, newTodoItem])
                    }
                }
            }/>
            <div>
                {todoList.map((todoItem) =>
                    <div key={todoItem.uuid}>
                        <input type={'text'} onKeyDown={
                            (e) => {
                                if (e.key === 'Enter') {
                                    setTodoList(todoList.map((item) =>
                                        item.uuid === todoItem.uuid ?
                                            {...item, text: (e.target as HTMLInputElement).value} : item
                                    ))
                                }
                            }
                        } defaultValue={todoItem.text}/>
                        <div onClick={() => {
                            setTodoList(todoList.filter((item) => item.uuid !== todoItem.uuid))
                        }}>{'Delete'}</div>
                    </div>
                )}
            </div>
        </>
    );
};

export default App

// TODO: create, edit, update
// TODO: order, filter
// TODO: localStorage