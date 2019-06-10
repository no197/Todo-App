import React, { Component } from 'react';

import TaskTodo from './components/todoItem';
import './App.css';
import './components/todoItem.css';
import tick from './imgs/tick.svg';
import classnames from 'classnames';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currFilter : 0,
            newItem: '',
            todoItems: [
                // { title: 'Đi mua bim bim', isCompleted: true },
                // { title: 'Đi đá bóng', isCompleted: false },
                // { title: 'Học react', isCompleted: true },
            ]
        }
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onItemClicked = this.onItemClicked.bind(this);
        this.onCheckAllClicked = this.onCheckAllClicked.bind(this);
        this.onClearCompleted = this.onClearCompleted.bind(this);
    }
    onItemClicked(item) {
        const { todoItems } = this.state;
        const index = todoItems.indexOf(item);
        this.setState({
            todoItems: [
                ...todoItems.slice(0, index),
                { title: item.title, isCompleted: !item.isCompleted },
                ...todoItems.slice(index + 1)
            ]
        });
    }

    onKeyUp(event) {
        if (event.keyCode === 13) {
            const text = event.target.value.trim();
            if (!text) {
                return;
            }
            this.setState({
                newItem : '',
                todoItems: [{ title: text, isCompleted: false },
                ...this.state.todoItems
                ]
            })
        }
    }

    onChange(event) {
        this.setState({ newItem: event.target.value });
    }

    onCheckAllClicked() {
        let { todoItems } = this.state;
        const unCheckAll = todoItems.findIndex((item) => {
            return !item.isCompleted; 
        }) >= 0;
        let newTodoItem = todoItems.map((item) => {
            return {'title': item.title,  'isCompleted': unCheckAll};
        })
        this.setState({todoItems: newTodoItem});
    }

    changeFilter(num) {
        this.setState({currFilter : num})
    }

    onClearCompleted(){
        const itemList = this.state.todoItems.filter((item) => {
            return !item.isCompleted;
        });
        this.setState({todoItems : itemList});

    }

    onDeleteItem(item){
        let { todoItems } = this.state;
        const index = todoItems.indexOf(item);
        todoItems.splice(index,1);
        this.setState({todoItems : todoItems})
    }

    render() {
        const { todoItems, currFilter } = this.state;
        const num_Completed = todoItems.filter((item) => item.isCompleted).length;
        let filterItems;
        switch(currFilter){
            case 1:
            filterItems = todoItems.filter((item) => !item.isCompleted);
            break;
            case 2:
            filterItems = todoItems.filter((item) => item.isCompleted);
            break;
            default: 
            filterItems = todoItems;
        }
        return (
            <div className="App">
                <div className="Header">
                    <img className ="tick" src={tick} alt="" width={25} height={25} onClick={this.onCheckAllClicked} />
                    <input type="text" placeholder="Add a new task"
                        value={this.state.newItem}
                        onChange={this.onChange}
                        onKeyUp={this.onKeyUp} />
                </div>
                {
                    todoItems.length > 0 && filterItems.map((item, index) =>
                        (<TaskTodo key={index} item={item} 
                            onDelete = {() => this.onDeleteItem(item)}
                            onClick={() => this.onItemClicked(item)} />))
                }
                {
                    todoItems.length > 0 && (
                        <div className='Footer'>
                                <p>{num_Completed} is completed</p>

                                <button className= {classnames({'btn_active': currFilter === 0})} 
                                    onClick = {() =>this.changeFilter(0)}>all</button>

                                <button className= {classnames({'btn_active': currFilter===1})}
                                    onClick = {() =>this.changeFilter(1)}>active</button>
        
                                <button className= {classnames({'btn_active': currFilter===2})}
                                onClick = {() =>this.changeFilter(2)}>completed</button>

                                <button onClick={this.onClearCompleted}>Clear completed</button>
                            </div>
                    )
                }
            </div>
        );
    }
}

export default App;
