import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBlog = { title, body, author, image };
        console.log(newBlog);

        setIsPending(true);

        // fetch('http://localhost:8000/blogs', {
        fetch('http://localhost:3016/insertBlog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBlog)
        })
            .then(() => {
                console.log('Blog saved');
                setIsPending(false);
                setShowPopup(true);
                setTimeout(() => {
                    navigate('/dataFromDb'); // Navigate to '/dataFromDb' after success
                }, 2000); // Wait 2 seconds to show popup

                setTitle('');
                setBody('');
                setAuthor('');
                setImage('');
            })
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows="8"
                />

                <label>Author:</label>
                <select
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="">Select Author</option>
                    <option value="Fatemeh">Fatemeh</option>
                    <option value="Anna">Anna</option>
                    <option value="Mina">Mina</option>
                </select>

                <label>Image URL:</label>
                <input
                    type="text"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />

                <button type="submit">Add Blog</button>
            </form>
            {/* {title}
            {author}
            {body}
            {image} */}

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Blog added successfully!</p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Create;
