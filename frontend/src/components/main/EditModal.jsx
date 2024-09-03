import React from 'react';
import './Modal.css';

function EditModal({ isOpen, onClose, onSubmit }) {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
            <input type="text" name = "title" placeholder="Goofyahh" required />
                    <div className="form-group">
                        <label>Date</label>
                        <div className="date-range">
                            <input type="date" name="startDate" required />
                            <span> | </span>
                            <input type="date" name="endDate" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Priority</label>
                        <div className="priority-options">
                            <label><input type="radio" name="priority" value="3" required /> High</label>
                            <label><input type="radio" name="priority" value="2" /> Mid</label>
                            <label><input type="radio" name="priority" value="1" /> Low</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Tags</label>
                        <input type="text" name="tags" placeholder="separate tags with comma" />
                    </div>
                    <div className="form-buttons">
                        <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
                        <button type="submit" className="add-button">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditModal;
