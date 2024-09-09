import { brands } from "../../DummyData"
import "./Brands.scss"

const Brands = () => {
  return (
    <div className='brands'>
        <div className="brandsContainer">
            <h3>Official Brands</h3>
            <div className="allBrands">
               {brands.map((brand) => (
                 <img src={brand.img} alt=""  key={brand.id}/>
               ))}
            </div>
        </div>
    </div>
  )
}

export default Brands