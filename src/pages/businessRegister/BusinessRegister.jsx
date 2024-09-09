import { useEffect, useState } from "react";
import "./BusinessRegister.scss";
import { Link } from "react-router-dom";
import { apiRequests } from "../../utils/requestMethods";
import { countiesData } from "../../countiesData";
import { categories } from "../../DummyData";
import CircularProgress from '@mui/material/CircularProgress';

const BusinessRegister = () => {
  const [businessName, setBusinessName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ownerID, setOwnerID] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCounty, setSelectedCounty] = useState(countiesData[0]);
  const [selectedConstituency, setSelectedConstituency] = useState(countiesData[0].constituencies[0]);
  const [selectedWard, setSelectedWard] = useState(countiesData[0].constituencies[0].Wards[0]);
  const [businessCenter, setBusinessCenter] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        window.location.replace("/storeAuth");
      }, 2000);
    }
  }, [success]);

  const handleCountyChange = (e) => {
    const selected = countiesData.find(county => county.code === e.target.value);
    setSelectedCounty(selected);
    setSelectedConstituency(selected.constituencies[0]);
    setSelectedWard(selected.constituencies[0].Wards[0]);
  };

  const handleConstituencyChange = (e) => {
    const selected = selectedCounty.constituencies.find(c => c.constituencyName === e.target.value);
    setSelectedConstituency(selected);
    setSelectedWard(selected.Wards[0]);
  };

  const handleWardChange = (e) => {
    const selected = selectedConstituency.Wards.find(w => w.wardName === e.target.value);
    setSelectedWard(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await apiRequests.post("/businesses/register", {
        businessName,
        firstName,
        lastName,
        ownerID,
        phoneNo,
        password,
        category,
        county: selectedCounty.countyName,
        constituency: selectedConstituency.constituencyName,
        ward: selectedWard.wardName,
        businessCenter,
      });

      if (res.data) {
        setSuccess(true);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="businessRegister">
      <div className="wrapper">
        <h2>Welcome to Vendy, the best platform to grow your business</h2>
        <form onSubmit={handleSubmit}>
          <div className="left">
            <div className="data">
              <input
                type="text"
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>
            <div className="data">
              <input
                type="text"
                placeholder="Owner First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="data">
              <input
                type="text"
                placeholder="Owner Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="data">
              <input
                type="text"
                placeholder="Owner National ID"
                value={ownerID}
                onChange={(e) => setOwnerID(e.target.value)}
                required
              />
            </div>
            <div className="data">
              <input
                type="text"
                placeholder="Phone No"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>
            <div className="data">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="right">
            <div className="data">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="data">
              <label>County:</label>
              <select
                value={selectedCounty.code}
                onChange={handleCountyChange}
                required
              >
                {countiesData.map((county) => (
                  <option key={county.code} value={county.code}>
                    {county.countyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="data">
              <label>Constituency:</label>
              <select
                value={selectedConstituency.constituencyName}
                onChange={handleConstituencyChange}
                required
              >
                {selectedCounty.constituencies.map((c) => (
                  <option key={c.constituencyNo} value={c.constituencyName}>
                    {c.constituencyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="data">
              <label>Ward:</label>
              <select
                value={selectedWard.wardName}
                onChange={handleWardChange}
                required
              >
                {selectedConstituency.Wards.map((w) => (
                  <option key={w.wardId} value={w.wardName}>
                    {w.wardName}
                  </option>
                ))}
              </select>
            </div>
            <div className="data">
              <input
                type="text"
                placeholder="Business Center"
                value={businessCenter}
                onChange={(e) => setBusinessCenter(e.target.value)}
                required
              />
            </div>
            <div className="accessing">
              <div className="access">
                <button className="storeR" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <CircularProgress size={20} /> : "Register"}
                </button>
              </div>
              <div className="access">
                <span>You have an account already?</span>
                <Link to="/storeAuth">
                  <button className="storeL" disabled={isSubmitting}>
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
        {success && (
          <div className="success">
            <h6>Registration Successful. Redirecting to Login...</h6>
          </div>
        )}
        {error && (
          <div className="error">
            <h6>{error}</h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessRegister;
