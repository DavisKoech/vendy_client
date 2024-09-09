/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./CreateProduct.scss";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/apiCalls";
import { BusinessContext } from "../../businessContext/BusinessContext";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const CreateProduct = ({ close }) => {
    const { business } = useContext(BusinessContext);
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    // Function to introduce delay
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Inputs for product properties
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (file) {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "upload");

                const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/vmumo/image/upload", data);
                const { url } = uploadRes.data;
                const product = { ...inputs, img: url, business: business._id };
                await createProduct(product, dispatch);
            } else {
                const product = { ...inputs, business: business._id };
                await createProduct(product, dispatch);
            }
            setSuccess(true);
        } catch (error) {
            console.log(error);
            setError(true);
        }

        await delay(300);
        setSuccess(false);
        setError(false);
        setIsSubmitting(false);
        close();
    };

    return (
        <div className='createPost'>
            <div className="createPostTop">
                <h3>Create</h3>
                <img src="/delete.png" alt="" onClick={close} />
            </div>
            <div className="createPostBottom">
                <form onSubmit={handleSubmit}>
                    <div className="createFormData">
                        <label>ProductName:</label>
                        <input type="text" placeholder="enter name here" name="name" onChange={handleChange} required />
                    </div>
                    <div className="createFormData">
                        <label>Desc:</label>
                        <textarea placeholder="maximum 60 words" name="desc" onChange={handleChange} required></textarea>
                    </div>
                    <div className="createFormData">
                        <label>Price:</label>
                        <input type="number" placeholder="200,300,etc" name="price" onChange={handleChange} required />
                    </div>
                    <div className="createFormData">
                        <label htmlFor="file">
                            <img src="/upload.png" alt="" className="uploadingImg" />
                        </label>
                        <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
                        <img src={file ? URL.createObjectURL(file) : "/products.png"} alt="" className="selectedImg" />
                    </div>
                    {success && <div className="createPostSuccess">Uploaded successfully</div>}
                    {error && <div className="createPostError">Error occurred, try again</div>}
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <CircularProgress size={20} /> : 'Create'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
