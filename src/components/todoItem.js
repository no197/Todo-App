import React, { Component } from 'react';
import classnames from 'classnames'
import PropTypes from 'prop-types';

import check from './../imgs/check.svg';
import checkcompleted from './../imgs/check-completed.svg'
import close from './../imgs/close.svg'

class TaskTodo extends Component {
    render() {
        const { item, onClick, onDelete } = this.props;
        const url = item.isCompleted ? checkcompleted : check;
        return (
            <div className={classnames('todoItem',
                    { 'todoItem-completed': item.isCompleted })}>
                    <img onClick={onClick} 
                        src={url} alt="" width={32} height={32} />
                    <p onClick={onClick} >{item.title}</p>
                    <img onClick = {onDelete}
                        src={close} className="close" alt="" width={15} height={15} />
            </div>

        );
    }
}


TaskTodo.propTypes= {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool
    }),
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default TaskTodo;
