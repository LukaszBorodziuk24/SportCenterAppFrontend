import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './AddUserForm.css';

const AddUserForm = ({ show, handleClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        imageUrl: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add your API call here to save the user
            console.log('Form data:', formData);
            handleClose();
            // Reset form
            setFormData({
                name: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                imageUrl: ''
            });
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Replace with your preset

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );
            const data = await response.json();
            setFormData(prev => ({
                ...prev,
                imageUrl: data.secure_url
            }));
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered >
            <Modal.Header closeButton className="add-user-bg">
                <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body className="add-user-bg">
                <Form onSubmit={handleSubmit} >
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                            type="tel" 
                            placeholder="Enter phone number"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Profile Image</Form.Label>
                        <Form.Control 
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        {formData.imageUrl && (
                            <img 
                                src={formData.imageUrl} 
                                alt="Preview" 
                                className="mt-2"
                                style={{ maxWidth: '200px' }}
                            />
                        )}
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save User
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddUserForm;