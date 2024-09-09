/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import "./UpdateBusiness.scss";
import axios from "axios";
import { BusinessContext } from "../../businessContext/BusinessContext";
import { apiRequests } from "../../utils/requestMethods";

const UpdateBusiness = ({ business }) => {
    const { dispatch } = useContext(BusinessContext);
    const [inputs, setInputs] = useState({});
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setInputs((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleCoverPhotoChange = (e) => {
        setCoverPhoto(e.target.files[0]);
    };

    const handleProfilePhotoChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    };

    useEffect(() => {
        let succeeded;
        if (success) {
            succeeded = setTimeout(() => {
                setSuccess(false);
            }, 1000);
        }
        return () => clearTimeout(succeeded);
    }, [success]);

    useEffect(() => {
        let failed;
        if (error) {
            failed = setTimeout(() => {
                setError(false);
            }, 2000);
        }
        return () => clearTimeout(failed);
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);

        dispatch({ type: "UPDATE_START" });
        const updatedBusiness = {
            businessId: business._id,
            ...inputs,
        };

        const updatePhotos = async (photoType, photoFile) => {
            if (photoFile) {
                const data = new FormData();
                data.append("file", photoFile);
                data.append("upload_preset", "upload");

                try {
                    const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/vmumo/image/upload", data);
                    const { url } = uploadRes.data;
                    updatedBusiness[photoType] = url;
                } catch (err) {
                    throw new Error("Photo upload failed");
                }
            }
        };

        try {
            await updatePhotos("coverPhoto", coverPhoto);
            await updatePhotos("profilePhoto", profilePhoto);
            const res = await apiRequests.put("businesses/" + business._id, updatedBusiness);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            window.location.reload();
        } catch (err) {
            setError(true);
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    console.log(inputs)

    return (
        <div className="profileUpdate">
            <form onSubmit={handleSubmit}>
                <div className="data">
                    <label>Business Name</label>
                    <input
                        type="text"
                        name="businessName"
                        placeholder={business?.businessName}
                        value={inputs.businessName || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="data">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phoneNo"
                        placeholder={business?.phoneNo}
                        value={inputs.phoneNo || "e.g 07"}
                        onChange={handleChange}
                    />
                </div>
                <div className="data">
                    <label>Website</label>
                    <input
                        type="text"
                        name="website"
                        placeholder={business?.website || "e.g me.com"}
                        value={inputs.website || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="data">
                    <label>WhatsApp Number</label>
                    <input
                        type="text"
                        name="whatsappNo"
                        placeholder={business?.whatsappNo}
                        value={inputs.whatsappNo || "e.g 07---"}
                        onChange={handleChange}
                    />
                </div>
                <div className="data">
                    <label>Instagram Account</label>
                    <input
                        type="text"
                        name="igAccount"
                        placeholder={business?.igAccount}
                        value={inputs.igAccount || "@username"}
                        onChange={handleChange}
                    />
                </div>
                <div className="data">
                    <label>Facebook Account</label>
                    <input
                        type="text"
                        name="facebookAccount"
                        placeholder={business?.facebookAccount}
                        value={inputs.facebookAccount || "@username"}
                        onChange={handleChange}
                    />
                </div>
                <div className="data">
                    <label>TikTok Account</label>
                    <input
                        type="text"
                        name="tiktokAccount"
                        placeholder={business?.tiktokAccount}
                        value={inputs.tiktokAccount || "@username"}
                        onChange={handleChange}
                    />
                </div>
                <div className="data">
                    <label>X Account</label>
                    <input
                        type="text"
                        name="xAccount"
                        placeholder={business?.xAccount}
                        value={inputs.xAccount || "@username"}
                        onChange={handleChange}
                    />
                </div>
                <div className="data">
                    <label htmlFor="coverPhoto">Cover Photo</label>
                    <input
                        type="file"
                        id="coverPhoto"
                        name="coverPhoto"
                        onChange={handleCoverPhotoChange}
                    />
                </div>
                <div className="data">
                    <label htmlFor="profilePhoto">Profile Photo</label>
                    <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        onChange={handleProfilePhotoChange}
                    />
                </div>
                <button>Update</button>
            </form>
            {success && <div className="success">Business updated successfully!</div>}
            {error && <div className="error">Failed to update business.</div>}
        </div>
    );
};

export default UpdateBusiness;
