import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import '../feed/Feed.scss';
import Post from '../post/Post';
import { countiesData } from '../../countiesData';
import { getBusinesses, getProducts } from '../../redux/apiCalls';
import { categories } from '../../DummyData'; 

const Feed = () => {
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const businesses = useSelector((state) => state.business.businesses);

  useEffect(() => {
    getProducts(dispatch);
    getBusinesses(dispatch);
  }, [dispatch]);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCounty, selectedConstituency, selectedWard, selectedCategory, businesses]);

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

  // Filter products based on the selected filters
  const filterProducts = () => {
    let filtered = products;

    if (selectedCounty) {
      filtered = filtered.filter(p => {
        const business = businesses.find(b => b._id === p.business);
        return business && business.county === selectedCounty.countyName;
      });
    }

    if (selectedConstituency) {
      filtered = filtered.filter(p => {
        const business = businesses.find(b => b._id === p.business);
        return business && business.constituency === selectedConstituency.constituencyName;
      });
    }

    if (selectedWard) {
      filtered = filtered.filter(p => {
        const business = businesses.find(b => b._id === p.business);
        return business && business.ward === selectedWard.wardName;
      });
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => {
        const business = businesses.find(b => b._id === p.business);
        return business && business.category === selectedCategory;
      });
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <h2>Recent Posts from stores near you. Explore</h2>
        <div className='filteringArea'>
          <div className='filterCriteria'>
            <label>Filter By County</label>
            <select onChange={handleCountyChange} value={selectedCounty ? selectedCounty.code : ""}>
              <option value="">All</option>
              {countiesData.map(county => (
                <option key={county.code} value={county.code}>
                  {county.countyName}
                </option>
              ))}
            </select>
          </div>
          <div className='filterCriteria'>
            <label>Filter By Constituency</label>
            <select onChange={handleConstituencyChange} value={selectedConstituency ? selectedConstituency.constituencyName : ""}>
              <option value="">All</option>
              {selectedCounty && selectedCounty.constituencies.map(c => (
                <option key={c.constituencyNo} value={c.constituencyName}>
                  {c.constituencyName}
                </option>
              ))}
            </select>
          </div>
          <div className='filterCriteria'>
            <label>Filter By Ward/Area</label>
            <select onChange={handleWardChange} value={selectedWard ? selectedWard.wardName : ""}>
              <option value="">All</option>
              {selectedConstituency && selectedConstituency.Wards.map(w => (
                <option key={w.wardId} value={w.wardName}>
                  {w.wardName}
                </option>
              ))}
            </select>
          </div>
          <div className='filterCriteria'>
            <label>Filter By Category</label>
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
        <div className='posts'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(p => (
              <Post key={p._id} post={p} />
            ))
          ) : (
            <p>Sorry No products available for now check later.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
