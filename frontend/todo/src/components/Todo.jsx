import React, { useState } from 'react';

const Todo = ({ todo, deleteTodo, editTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedText, setUpdatedText] = useState(todo.text);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setUpdatedText(todo.text); // Reset to original text if editing is canceled
    };

    const handleSaveClick = () => {
        editTodo(todo._id, updatedText);  // Call the parent editTodo function
        setIsEditing(false);  // Exit edit mode
    };

    return (
        <div className="todo-item">
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        type="text"
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                    />
                    <button className="edit-btn" onClick={handleSaveClick}>Save</button>
                    <button className="delete-btn" onClick={handleCancelClick}>Cancel</button>
                </div>
            ) : (
                <>
                    <span>{todo.text}</span>
                    <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>Delete</button>
                </>
            )}
        </div>
    );
};

export default Todo;
