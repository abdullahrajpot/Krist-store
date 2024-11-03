import { Col, Input, Row, Typography, Button, Form, Upload, Select } from 'antd';
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { firestore, storage } from '../../../config/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'; 

const { Title } = Typography;
const { toastify } = window;

const initialstatte = { name: '', description: '', category: '', price: '' };

export default function AddProducts() {

  const [add, setAdd] = useState(initialstatte);
  const [file, setFile] = useState(null);

  const handleChange = (e) => setAdd((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleFileChange = (info) => {
    // Extract file from Upload component
    const fileObj = info.file.originFileObj;
    setFile(fileObj); // <-- Use file.originFileObj for the actual file
  };

  

  const handleSubmit = async () => {
    let { name, description, category, price } = add;

    if (name.length < 3) return toastify("Enter correct name of product.", "error");
    if (!description) return toastify("Please enter the description of the products", "error");
    if (!price) return toastify("Please enter the price of the products.", "error");

    const id = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    let imageUrl = "";

    if (file) {
      console.log("Uploading file:", file); // Debug: Log file details
      const storageRef = ref(storage, `images/${id}-${file.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log("Upload successful:", snapshot);
        imageUrl = await getDownloadURL(snapshot.ref);

      } catch (error) {
        console.error("Image upload error:", error);
        return toastify("Failed to upload image", "error");
      }
    } else {
      console.log("No file selected");
    }

    const formData = { name, description, price, category, id, dateAdded: serverTimestamp(), imageUrl };

    try {
      await setDoc(doc(firestore, "items", id), formData);
      toastify("Product added successfully", "success");
      setAdd(initialstatte); // Reset form
      setFile(null); // Reset file
    } catch (e) {
      console.error("Error adding document: ", e);
      toastify("An error occurred while adding new items.", "error");
    }
  };

  return (
    <>
      <Row className="min-vh-100">
        <Col xs={24} sm={{ span: 24, offset: 4 }} md={{ span: 24, offset: 0 }} lg={24} className="d-flex flex-column justify-content-center align-items-center text-center p-4 p-md-5">
          <div className="text-center text-md-start mb-3">
            <Title level={2} className='fw-bold mb-0'>Add New Product</Title>
          </div>

          <Form className="w-50" layout='vertical' style={{ border: '1px solid gray', borderRadius: '10px', padding: '30px' }} onFinish={handleSubmit}>
            <Form.Item label="Name" className='mb-3 p-0'>
              <Input type='text' placeholder='Enter Name' className='w-100' name='name' size='large' onChange={handleChange} />
            </Form.Item>
            
            <Form.Item label="Description" className='mb-3 p-0'>
              <Input.TextArea type='text' placeholder='Enter Item description' rows={4} className='w-100' name='description' size='large' style={{ resize: 'none' }} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Category" className='mb-3 p-0'>
              <Input type='text' placeholder='Enter item category' className='w-100' name='category' size='large' onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Price" className='mb-3'>
              <Input type='text' placeholder='Price' className='w-100' name='price' size='large' onChange={handleChange} />
            </Form.Item>
           
            
           
            <Form.Item label="Image Upload" className='mb-3'>
              <Upload
                beforeUpload={() => false}
                onChange={handleFileChange}
                showUploadList={{ showPreviewIcon: false }}
              >
                <Button icon={<UploadOutlined />}>Click to Upload Image</Button>
              </Upload>
            </Form.Item>

            <div className="d-flex justify-content-center align-items-center mt-2 w-100">
              <Button type="primary" htmlType="submit" className='w-75 bg-dark' size='large'>
                Add item
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}
