import Header from "../component/Header";
import Footer from "../component/Footer";
import HeroImage from "../assets/Heroimg.png";
import Clothimg from "../assets/Clothimg.png";
import Causeimg from "../assets/Causeimg.png";
import Bannerleft from "../assets/Bannerleft.png";
import Bannerright from "../assets/Bannerright.png";
import BannerNft from "../assets/BannerNft.png";

const Home = () => {
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

      {/* Popular campaign */}
      <section className="px-4 md:px-7 py-12">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">
          Popular Campaigns
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
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

      {/* Popular causes */}
      <section className="px-4 md:px-7 py-12">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">
          Popular Causes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Causeimg}
                  alt="Cause"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Children In Gaza
              </h3>
              <p className="text-[14px] text-black/60">The Palestine NGO</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Causeimg}
                  alt="Cause"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Children In Gaza
              </h3>
              <p className="text-[14px] text-black/60">The Palestine NGO</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Causeimg}
                  alt="Cause"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Children In Gaza
              </h3>
              <p className="text-[14px] text-black/60">The Palestine NGO</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Causeimg}
                  alt="Cause"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Children In Gaza
              </h3>
              <p className="text-[14px] text-black/60">The Palestine NGO</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Causeimg}
                  alt="Cause"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Children In Gaza
              </h3>
              <p className="text-[14px] text-black/60">The Palestine NGO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special collections */}
      <section className="px-4 md:px-7 py-12">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">
          Special Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
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
           <div className="flex flex-wrap  gap-6">
              <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors text-center">
                   <div className="rounded-full bg-[#eeeeee] w-32 h-32 lg:w-[250px] lg:h-[250px] mx-auto flex items-center justify-center">
                      <img src={Clothimg} alt="Creator" className="w-[85%] h-[85%] object-contain rounded-full" />
                  </div>
                  <div className="mt-4">
                      <h3 className="text-[22px] font-semibold leading-tight">OluwaDayo</h3>
                      <p className="text-[14px] text-black/60">Creator</p>
                  </div>
              </div>
              <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors text-center">
                   <div className="rounded-full bg-[#eeeeee] w-32 h-32 lg:w-[250px] lg:h-[250px] mx-auto flex items-center justify-center">
                      <img src={Clothimg} alt="Creator" className="w-[85%] h-[85%] object-contain rounded-full" />
                  </div>
                  <div className="mt-4">
                      <h3 className="text-[22px] font-semibold leading-tight">Sarah Johnson</h3>
                      <p className="text-[14px] text-black/60">Creator</p>
                  </div>
              </div>
              
              <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors text-center">
                   <div className="rounded-full bg-[#eeeeee] w-32 h-32 lg:w-[250px] lg:h-[250px] mx-auto flex items-center justify-center">
                      <img src={Clothimg} alt="Creator" className="w-[85%] h-[85%] object-contain rounded-full" />
                  </div>
                  <div className="mt-4">
                      <h3 className="text-[22px] font-semibold leading-tight">Sarah Johnson</h3>
                      <p className="text-[14px] text-black/60">Creator</p>
                  </div>
              </div>
              <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors text-center">
                   <div className="rounded-full bg-[#eeeeee] w-32 h-32 lg:w-[250px] lg:h-[250px] mx-auto flex items-center justify-center">
                      <img src={Clothimg} alt="Creator" className="w-[85%] h-[85%] object-contain rounded-full" />
                  </div>
                  <div className="mt-4">
                      <h3 className="text-[22px] font-semibold leading-tight">Mike Chen</h3>
                      <p className="text-[14px] text-black/60">Creator</p>
                  </div>
              </div>
              <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors text-center">
                   <div className="rounded-full bg-[#eeeeee] w-32 h-32 lg:w-[250px] lg:h-[250px] mx-auto flex items-center justify-center">
                      <img src={Clothimg} alt="Creator" className="w-[85%] h-[85%] object-contain rounded-full" />
                  </div>
                  <div className="mt-4">
                      <h3 className="text-[22px] font-semibold leading-tight">Emma Rodriguez</h3>
                      <p className="text-[14px] text-black/60">Creator</p>
                  </div>
              </div>
          </div>
      </section>


       {/* Shoe collections */}
       <section className="px-4 md:px-7 py-12">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">
          Shoes Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
          <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
            <div className="rounded-2xl bg-[#eeeeee]">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                <img
                  src={Clothimg}
                  alt="Cloth"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[22px] font-semibold leading-tight">
                Live In Balance
              </h3>
              <p className="text-[14px] text-black/60">By OluwaDayo</p>
              <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
