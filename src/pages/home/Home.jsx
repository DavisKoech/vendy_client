import '../home/Home.css';
import Feed from '../../components/feed/Feed'
import Footer from '../../components/footer/Footer';
import Categories from '../../components/categories/Categories';
import Intro from "../../components/intro/Intro"
import TopStores from "../../components/topStores/TopStores"
import OutroBanner from '../../components/outroBanner/OutroBanner';
import Brands from "../../components/brands/Brands"



const Home = () => {

 
  return (
    <div className="home">
    <Categories/>
    <Intro/>
    <Brands/>
    <TopStores/>
    <OutroBanner/>
    <Feed/>
    <Footer/>
    </div>
  )
}

export default Home