
import Footer from "../../components/footer/Footer";
import "./AllStores.scss";
import SingleShop from "../../components/singleShop/SingleShop";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinesses } from "../../redux/apiCalls";
import { countiesData } from '../../countiesData';
import { categories } from '../../DummyData';

function AllStores() {
  const businesses = useSelector((state) => state.business.businesses);
  const dispatch = useDispatch();

  const [selectedCounty, setSelectedCounty] = useState(null);
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  // Fetch all stores
  useEffect(() => {
    getBusinesses(dispatch);
  }, [dispatch]);

  useEffect(() => {
    filterBusinesses();
  }, [selectedCounty, selectedConstituency, selectedWard, selectedCategory, businesses]);

  // Handle county change
  const handleCountyChange = (e) => {
    const selected = countiesData.find(county => county.code === e.target.value);
    setSelectedCounty(selected);
    setSelectedConstituency(selected ? selected.constituencies[0] : null);
    setSelectedWard(selected ? selected.constituencies[0].Wards[0] : null);
  };

  // Handle constituency change
  const handleConstituencyChange = (e) => {
    const selected = selectedCounty.constituencies.find(c => c.constituencyName === e.target.value);
    setSelectedConstituency(selected);
    setSelectedWard(selected ? selected.Wards[0] : null);
  };

  // Handle ward change
  const handleWardChange = (e) => {
    const selected = selectedConstituency.Wards.find(w => w.wardName === e.target.value);
    setSelectedWard(selected);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter businesses based on the selected filters
  const filterBusinesses = () => {
    let filtered = businesses;

    if (selectedCounty) {
      filtered = filtered.filter(b => 
        b.county.toLowerCase() === selectedCounty.countyName.toLowerCase()
      );
    }

    if (selectedConstituency) {
      filtered = filtered.filter(b => 
        b.constituency.toLowerCase() === selectedConstituency.constituencyName.toLowerCase()
      );
    }

    if (selectedWard) {
      filtered = filtered.filter(b => 
        b.ward.toLowerCase() === selectedWard.wardName.toLowerCase()
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(b => 
        b.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredBusinesses(filtered);
  };

  return (
    <>
      <div className='allStores'>
        <img src="/stores.svg" alt="" className="allStoresImg" />
        <div className="storesFilter">
          <div className="storeFilterSingle">
            <span>Filter By County</span>
            <select onChange={handleCountyChange} value={selectedCounty ? selectedCounty.code : ""}>
              <option value="">All</option>
              {countiesData.map(county => (
                <option key={county.code} value={county.code}>
                  {county.countyName}
                </option>
              ))}
            </select>
          </div>
          <div className="storeFilterSingle">
            <span>Filter By Constituency</span>
            <select onChange={handleConstituencyChange} value={selectedConstituency ? selectedConstituency.constituencyName : ""}>
              <option value="">All</option>
              {selectedCounty && selectedCounty.constituencies.map(c => (
                <option key={c.constituencyNo} value={c.constituencyName}>
                  {c.constituencyName}
                </option>
              ))}
            </select>
          </div>
          <div className="storeFilterSingle">
            <span>Filter By Ward/Area</span>
            <select onChange={handleWardChange} value={selectedWard ? selectedWard.wardName : ""}>
              <option value="">All</option>
              {selectedConstituency && selectedConstituency.Wards.map(w => (
                <option key={w.wardId} value={w.wardName}>
                  {w.wardName}
                </option>
              ))}
            </select>
          </div>
          <div className="storeFilterSingle">
            <span>Filter By Category</span>
            <select onChange={handleCategoryChange} value={selectedCategory}>
              <option value="">All</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="allStoresContainer">
          {filteredBusinesses.length > 0 ? (
            filteredBusinesses.map((store) => <SingleShop key={store._id} store={store} />)
          ) : (
            <p>No available businesses</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllStores;
