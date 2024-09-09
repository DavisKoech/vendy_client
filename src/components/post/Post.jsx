/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import "./Post.scss";
import { apiRequests } from '../../utils/requestMethods';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addProduct } from "../../redux/cartRedux";

const Post = ({ post }) => {
    const [postBusiness, setPostBusiness] = useState({});
    const [isHovered, setIsHovered] = useState(false);
    const [buttonText, setButtonText] = useState("Add To Cart");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBusiness = async () => {
            const res = await apiRequests.get(`/businesses/${post.business}`);
            setPostBusiness(res.data);
        };
        fetchBusiness();
    }, [post.business]);

    //const formattedDate = new Date(post.createdAt).toLocaleString();

    const handleAddToCart = () => {
        dispatch(addProduct({ ...post, quantity: 1 }));
        setButtonText("Added");
        setTimeout(() => {
            setButtonText("Add To Cart");
        }, 500);
    };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="left">
                        <img src={postBusiness?.profilePhoto || "/business.png"} alt="" />
                        <Link to={`/store/${postBusiness?._id}`} className='links'>
                            <h4>{postBusiness?.businessName}</h4>
                        </Link>
                    </div>
                    <button>Follow</button>
                </div>
                <div className="postCenter">
                    <div className="productDetails">
                        <div className="name">
                            <h3>{post?.name}</h3>
                        </div>
                        <button
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            View Desc
                        </button>
                    </div>
                    <div className={`postDesc ${isHovered ? 'show' : ''}`}>{post?.desc}</div>
                    <img src={post?.img || "/biz.png"} alt="" />
                </div>
                <div className="postBottom">
                    <h3>Ksh {post?.price.toLocaleString()}</h3>
                    <button onClick={handleAddToCart}>{buttonText}</button>
                </div>
                <div className="postActivity">
                    <div className="actions">
                        <img src="/like.jpeg" alt="" />
                        <img src="/share.jpeg" alt="" />
                        <img src="/comment.jpeg" alt="" />
                    </div>
                    <div className="rating">
                      <img src="/star.png" alt="" />
                      <img src="/star.png" alt="" />
                      <img src="/star.png" alt="" />
                      <img src="/star.png" alt="" />
                      <img src="/star.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
