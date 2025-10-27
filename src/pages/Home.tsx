import Header from "../component/Header";
import Footer from "../component/Footer";
import ProductCard from "../component/ProductCard";
import CauseCard from "../component/CauseCard";
import CreatorCard from "../component/CreatorCard";
import HeroImage from "../assets/Heroimg.png";
import Clothimg from "../assets/Clothimg.png";
import Bannerleft from "../assets/Bannerleft.png";
import Bannerright from "../assets/Bannerright.png";
import BannerNft from "../assets/BannerNft.png";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products, causes, creators } from '../data/databank';

const Home = () => {
    const navigate = useNavigate();
    const [popularDesigns, setPopularDesigns] = useState<any[]>([]);
    const [popularCampaigns, setPopularCampaigns] = useState<any[]>([]);
    const [showcaseCreators, setShowcaseCreators] = useState<any[]>([]);
    const [shoeCollections, setShoeCollections] = useState<any[]>([]);

    useEffect(() => {
        // Load user designs (most recent first)
        const userDesigns = JSON.parse(localStorage.getItem('userDesigns') || '[]');
        const ngoDesigns = JSON.parse(localStorage.getItem('ngoDesigns') || '[]');
        const allDesigns = [...userDesigns, ...ngoDesigns];
        
        // Sort by creation date (most recent first)
        // Mix user designs with mock data to always show 5 items
        const sortedDesigns = allDesigns
            .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        
        // Take user designs (up to 5) and pad with mock data
        const userDesignsOnly = sortedDesigns.slice(0, 5);
        const mockDesignsNeeded = 5 - userDesignsOnly.length;
        const recentDesigns = [
            ...userDesignsOnly,
            ...products.slice(0, mockDesignsNeeded)
        ];
        
        setPopularDesigns(recentDesigns);

        // Load campaigns from localStorage (if exists)
        const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
        // Sort campaigns by creation date (most recent first)
        const sortedCampaigns = campaigns
            .sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        
        // Take user campaigns (up to 5) and pad with mock causes data
        const userCampaignsOnly = sortedCampaigns.slice(0, 5);
        const mockCampaignsNeeded = 5 - userCampaignsOnly.length;
        const recentCampaigns = [
            ...userCampaignsOnly,
            ...causes.slice(0, mockCampaignsNeeded)
        ];
        
        setPopularCampaigns(recentCampaigns);
        
        // Filter shoe designs
        const allShoeDesigns = allDesigns
            .filter((design: any) => design.type?.toLowerCase() === 'shoes')
            .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        
        // Take user shoe designs (up to 5) and pad with mock products
        const userShoeDesignsOnly = allShoeDesigns.slice(0, 5);
        const mockShoesNeeded = 5 - userShoeDesignsOnly.length;
        const finalShoeCollections = [
            ...userShoeDesignsOnly,
            ...products.slice(0, mockShoesNeeded)
        ];
        
        setShoeCollections(finalShoeCollections);
        
        // For creators, use static data
        setShowcaseCreators(creators.slice(0, 6));
    }, []);
  return (
    <div>
      <Header />
      {/* Hero section */}
      <section className="relative max-h-[780px] min-h-[780px] flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={HeroImage}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative z-10 text-white px-6 pb-20 max-w-2xl">
          <h1
            className="mb-6 text-left"
            style={{
              fontFamily: "Legian Typeface",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "60px",
              lineHeight: "65px",
              letterSpacing: "-3%",
            }}
          >
            Where <span className="font-black">Creativity</span> Meets{" "}
            <span className="font-black">Social Impact</span>
          </h1>
          <p
            className="text-left text-gray-200 max-w-xl"
            style={{
              fontFamily: "Gellix",
              fontWeight: 300,
              fontStyle: "normal",
              fontSize: "20px",
              lineHeight: "30px",
              letterSpacing: "0%",
            }}
          >
            Buy or design products that give back. Every transaction supports
            verified causes and rewards you with NFT proof of donation.
          </p>
        </div>
      </section>

      {/* Popular Designs */}
      <section className="px-4 md:px-7 py-12">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">
          Popular Designs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {popularDesigns.length > 0 ? (
            popularDesigns.map((item) => {
              // Check if it's a custom design or regular product
              if (item.pieceName || item.isDesign) {
                // Custom design - show on shirt mockup
                const design = item.isDesign ? item.design : item;
                return (
                  <div 
                    key={item.id}
                    className="bg-white rounded-3xl p-4 hover:border hover:border-black/10 transition-colors cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <div className="rounded-2xl bg-[#eeeeee] mb-4">
                      <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center relative">
                        {/* T-shirt mockup background */}
                        <img 
                          src="/src/assets/shirtfront.png" 
                          alt="Shirt Mockup" 
                          className="absolute inset-0 w-full h-full object-cover rounded-xl"
                          style={{ 
                            filter: design.color === '#FFFFFF' ? 'none' : 
                                   design.color === '#000000' ? 'brightness(0)' : 'none'
                          }}
                        />
                        
                        {/* Uploaded design overlay */}
                        {design.frontDesign?.dataUrl && (
                          <div 
                            className="absolute"
                            style={{ 
                              width: '145px', 
                              height: '200px',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)'
                            }}
                          >
                            <img 
                              src={design.frontDesign.dataUrl} 
                              alt="Design" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        
                        {/* Fallback if no design */}
                        {!design.frontDesign?.dataUrl && (
                          <div className="text-center text-gray-500">
                            <div className="text-4xl mb-2">👕</div>
                            <p className="text-sm">{design.type}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[22px] font-semibold leading-tight mb-1">
                        {item.pieceName || design.pieceName}
                      </h3>
                      <p className="text-[14px] text-black/60 mb-3">Campaign: {design.campaign}</p>
                      <p className="text-[22px] font-semibold">₦{design.price}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Created: {new Date(design.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )
              } else {
                // Regular product - use ProductCard
                return (
                  <ProductCard
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    creator={item.creator}
                    price={item.price}
                    alt={item.title}
                    onClick={() => navigate(`/product/${item.id}`)}
                  />
                )
              }
            })
          ) : (
            products.slice(0, 5).map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                creator={product.creator}
                price={product.price}
                alt={product.title}
                onClick={() => navigate(`/product/${product.id}`)}
              />
            ))
          )}
        </div>
      </section>

      {/* Banner section */}
      <section className="px-4 md:px-7 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 max-h-[600px]">
          <div className="relative rounded-3xl overflow-hidden lg:col-span-6 max-h-[500px]">
            <img
              src={Bannerleft}
              alt="Design your own merch"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 p-6 md:p-10 text-white flex flex-col justify-between">
              <div>
                <h3
                  className="text-3xl md:text-5xl font-semibold leading-tight"
                  style={{
                    fontFamily: "Legian Typeface",
                    fontWeight: 400,
                    fontSize: "40px",
                    lineHeight: "45px",
                    letterSpacing: "-3%",
                  }}
                >
                  Design your own Merch
                </h3>
                <p
                  className="mt-4 text-lg md:text-xl max-w-xl"
                  style={{
                    fontFamily: "Gellix",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "28px",
                    letterSpacing: "0%",
                  }}
                >
                  Design with purpose turn your creativity into meaningful
                  contributions that support real-world causes.
                </p>
              </div>
              <div className="self-end">
                <button className="bg-white text-black rounded-full px-6 py-3 text-sm font-semibold">
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden bg-[#FFC33F] lg:col-span-4 max-h-[600px]">
            <img
              src={Bannerright}
              alt="Earn NFTs for Every Creation Bought"
              className="absolute right-0 bottom-0 h-full object-contain pointer-events-none"
            />
            <div className="absolute inset-0 p-6 md:p-10 text-white flex flex-col justify-between">
              <div>
                <h3
                  className="text-3xl md:text-5xl font-semibold leading-tight"
                  style={{
                    fontFamily: "Legian Typeface",
                    fontWeight: 400,
                    fontSize: "40px",
                    lineHeight: "45px",
                    letterSpacing: "-3%",
                  }}
                >
                  Earn NFTs for Every Creation Bought
                </h3>
                <p
                  className="mt-4 text-lg md:text-xl max-w-xl"
                  style={{
                    fontFamily: "Gellix",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "28px",
                    letterSpacing: "0%",
                  }}
                >
                  For Every Item you purchase, you're rewarded with an NFT that
                  celebrates your contribution to meaningful causes.
                </p>
              </div>
              <div className="self-end">
                <button className="bg-black text-white rounded-full px-6 py-3 text-sm font-semibold">
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Campaigns */}
      <section className="px-4 md:px-7 py-12">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">
          Popular Campaigns
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {popularCampaigns.length > 0 ? (
            popularCampaigns.map((campaign) => (
              <CauseCard
                key={campaign.id}
                image={campaign.image}
                title={campaign.title}
                organization={campaign.organization}
                alt={campaign.title}
              />
            ))
          ) : (
            causes.map((cause) => (
              <CauseCard
                key={cause.id}
                image={cause.image}
                title={cause.title}
                organization={cause.organization}
                alt={cause.title}
              />
            ))
          )}
        </div>
      </section>

      {/* Special collections */}
      <section className="px-4 md:px-7 py-12">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">
          Special Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.slice(0, 5).map((product) => (
            <ProductCard
              key={`special-${product.id}`}
              image={product.image}
              title={product.title}
              creator={product.creator}
              price={product.price}
              alt={product.title}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      </section>

      {/* How It Works Banner */}
      <section className="px-4 md:px-8 py-12">
        <div className="bg-black rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="relative flex justify-center items-center h-[350px] xl:h-[650px]">
              <img
                src={BannerNft}
                alt="NFT Card"
                className="absolute w-[40%] md:w-[35%] rotate-[16deg] left-[55%] top-[10%] object-contain"
              />

              <img
                src={Clothimg}
                alt="T-shirt"
                className="absolute w-[80%] md:w-[75%] rotate-[-20deg] left-[5%] top-[-10%] object-contain z-10"
              />
            </div>

            <div className="p-8 md:p-12 text-white flex flex-col justify-center">
              <h3
                className="font-semibold leading-tight mb-6 text-4xl md:text-5xl"
                style={{
                  fontFamily: "Legian Typeface",
                  fontWeight: 400,
                  letterSpacing: "-0.03em",
                }}
              >
                How It All Comes Together
              </h3>
              <p
                className="text-lg md:text-xl mb-8 max-w-lg"
                style={{
                  fontFamily: "Gellix",
                  fontWeight: 400,
                  lineHeight: "28px",
                }}
              >
                Creators design, supporters purchase, and together we make an
                impact powered by NFTs that track every contribution.
              </p>
              <button className="bg-white text-black rounded-full px-6 py-3 text-sm font-semibold w-fit hover:bg-gray-100 transition">
                Learn How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      

      

      {/* Creators Section */}
      <section className="px-4 md:px-7 py-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">Check Out Your Creators</h2>
           <div className="flex flex-wrap gap-6">
              {showcaseCreators.map((creator) => (
                <CreatorCard
                  key={creator.id}
                  image={creator.image}
                  name={creator.name}
                  role={creator.role}
                  alt={creator.name}
                />
              ))}
          </div>
      </section>


       {/* Shoe collections */}
       <section className="px-4 md:px-7 py-12">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">
          Shoes Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {shoeCollections.map((item) => {
            // Check if it's a custom design or regular product
            if (item.pieceName && item.frontDesign) {
              // Custom design
              return (
                <div 
                  key={`shoe-${item.id}`}
                  className="bg-white rounded-3xl p-4 hover:border hover:border-black/10 transition-colors cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="rounded-2xl bg-[#eeeeee] mb-4">
                    <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center relative">
                      {/* For shoes, show design directly */}
                      {item.frontDesign?.dataUrl && (
                        <img 
                          src={item.frontDesign.dataUrl} 
                          alt={item.pieceName}
                          className="w-full h-full object-contain"
                        />
                      )}
                      {!item.frontDesign?.dataUrl && (
                        <div className="text-center text-gray-500">
                          <div className="text-4xl mb-2">👟</div>
                          <p className="text-sm">{item.type}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[22px] font-semibold leading-tight mb-1">{item.pieceName}</h3>
                    <p className="text-[14px] text-black/60 mb-3">Campaign: {item.campaign}</p>
                    <p className="text-[22px] font-semibold">₦{item.price}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Created: {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )
            } else {
              // Regular product
              return (
                <ProductCard
                  key={`shoes-${item.id}`}
                  image={item.image}
                  title={item.title}
                  creator={item.creator}
                  price={item.price}
                  alt={item.title}
                  onClick={() => navigate(`/product/${item.id}`)}
                />
              )
            }
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
