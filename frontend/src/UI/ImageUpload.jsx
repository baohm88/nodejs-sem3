import { useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";

export default function ImageUpload({ onImageUpload, onImageRemove }) {
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleImageUpload = (event) => {
        const files = event.target.files;
        const imagesArray = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                imagesArray.push(reader.result);
                if (imagesArray.length === files.length) {
                    setUploadedImages([...uploadedImages, ...imagesArray]);
                    onImageUpload([...uploadedImages, ...imagesArray]);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(newImages);
        onImageRemove(newImages);
    };

    return (
        <>
            <input type="file" multiple onChange={handleImageUpload} />
            <Row className="mt-3">
                {uploadedImages.map((image, index) => (
                    <Col key={index} md={2} className="mb-2">
                        <Image src={image} thumbnail />
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemoveImage(index)}
                        >
                            Remove
                        </Button>
                    </Col>
                ))}
            </Row>
        </>
    );
}
