import banner from "../assets/banner.jpg"
import bannerMobile from '../assets/banner-mobile.jpg'
const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)

  return (
    <section className="bg-white">
      <div className="container mx-auto">
        <div className={`w-full h-full min-h-48 rounded bg-blue-100 ${!banner && "animate-pulse my-2"} `}>
          <img className="w-full h-full hidden lg:block" src={banner} alt="banner" />
          <img className="w-full h-full lg:hidden" src={bannerMobile} alt="banner" />
        </div>
      </div>
      <div className="container mx-auto px-4 my-2">
        {
          new Array(20).fill(null).map((c, index) => {
            return(
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Home;