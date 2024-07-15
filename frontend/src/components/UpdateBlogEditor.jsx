import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_BLOG, UPLOAD_IMAGE } from '../graphql/mutations/blogMutation.js';
import { Button, Form, Badge, Container } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_BLOG } from '../graphql/queries/blogQuery.js';

const EditBlog = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [updateBlog] = useMutation(UPDATE_BLOG);
    const [uploadImage] = useMutation(UPLOAD_IMAGE);
    const { loading, error, data } = useQuery(GET_BLOG, { variables: { id } });
    const quillRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            const { title, content, category, images } = data.blog;
            setTitle(title);
            setContent(content);
            setSelectedCategories(category);
            setImages(images);
        }
    }, [data]);

    const categories = ["technology", "health", "science", "sports", "politics", "entertainment", "education", "fashion", "food", "finance"];

    const handleImageUpload = async (file) => {
        try {
            const { data } = await uploadImage({ variables: { file } });
            const newImage = data.uploadImage;
            setImages((prevImages) => [...prevImages, newImage]);
            return newImage;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBlog({
                variables: {
                    blogId: id,
                    input: {
                        title,
                        content,
                        images,
                        category: selectedCategories,
                    },
                },
            });
            toast.success("Blog updated successfully");
            navigate(`/blog/${id}`);
        } catch (error) {
            console.error('Error updating blog:', error);
            toast.error(error.message);
        }
    };

    const handleCategoryClick = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const imageHandler = async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                try {
                    const url = await handleImageUpload(file);
                    const editor = quillRef.current.getEditor();
                    const range = editor.getSelection();
                    if (range) {
                        editor.insertEmbed(range.index, 'image', url);
                        editor.setSelection(range.index + 1);
                    } else {
                        console.error('Editor range is not valid');
                    }
                } catch (error) {
                    console.error('Error inserting image:', error);
                }
            }
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            handlers: { image: imageHandler },
            container: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['link', 'image'],
                ['clean'],
            ],
        },
        clipboard: {
            matchVisual: false,
        },
    }), []);

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label className='my-3 px-3 fs-2'>Title</Form.Label>
                    <Form.Control
                        className='my-3 py-3 px-3'
                        type="text"
                        placeholder="Enter blog title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formContent">
                    <Form.Label className='my-3 px-3 fs-3'>Content</Form.Label>
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
                        ref={quillRef}
                        className="react-quill"
                    />
                </Form.Group>

                <Form.Group controlId="formCategory">
                    <Form.Label className='my-3 py-3 px-3 fs-3'>Category</Form.Label>
                    <div className='my-3 py-3 px-3'>
                        {categories.map((category) => (
                            <Badge
                                key={category}
                                pill
                                className='px-3 py-3 my-2'
                                bg={selectedCategories.includes(category) ? 'black' : 'secondary'}
                                onClick={() => handleCategoryClick(category)}
                                style={{ cursor: 'pointer', marginRight: '5px' }}
                            >
                                {category}
                            </Badge>
                        ))}
                    </div>
                </Form.Group>

                <Button className='submit-button' type="submit">
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
};

export default EditBlog;
