import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'
import Banner from '../component/Banner'
import CampaignCard from '../component/CampaignCard'
import Button from '../component/Button'
import { campaigns } from '../data/databank'

const CampaignDetails = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [donationAmount, setDonationAmount] = useState<string>('')

    const campaign = campaigns.find(c => c.id === parseInt(id || '1'))

    if (!campaign) {
        return (
            <div>
                <Header />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold mb-4">Campaign not found</h1>
                        <button 
                            onClick={() => navigate('/campaign')}
                            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    const handleDonate = () => {
        // Handle donation logic here
        console.log('Donating to campaign:', campaign.title)
        console.log('Amount:', donationAmount)
    }

    return (
        <div>
            <Header />
            
            {/* Campaign Detail Section */}
            <section className="px-4 md:px-7 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Campaign Image */}
                    <div className="mb-8">
                        <img
                            src={campaign.image}
                            alt={campaign.title}
                            className="w-full h-[400px] object-cover rounded-3xl"
                        />
                    </div>

                    {/* Campaign Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">
                        {campaign.title}
                    </h1>

                    {/* Progress Bar */}
                    <div className="mb-12">
                        <div className="relative h-16 rounded-full overflow-hidden bg-white border-2 border-gray-300">
                            {/* Filled portion (green background) */}
                            <div 
                                className="absolute inset-0 bg-[#4ADE80] rounded-full transition-all duration-500"
                                style={{ width: `${campaign.percentage}%` }}
                            >
                                {/* Amount text on green background */}
                                <div className="absolute left-0 top-0 h-full flex items-center px-6 min-w-fit">
                                    <span className="text-xl font-semibold text-black whitespace-nowrap">{campaign.amountRaised}</span>
                                </div>
                            </div>
                            
                            {/* Percentage text on right side */}
                            <div className="absolute right-6 top-0 h-full flex items-center z-10">
                                <span className="text-xl font-semibold text-black">{campaign.percentage}%</span>
                            </div>
                        </div>
                        
                        {/* Target Amount */}
                        <div className="mt-2 text-right">
                            <span className="text-base text-gray-600">of {campaign.goal}</span>
                        </div>
                    </div>
                    {/* Donate Button */}
                    <div className="mb-12">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-black mb-2">
                                Enter Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500">₦</span>
                                <input
                                    type="text"
                                    value={donationAmount}
                                    onChange={(e) => setDonationAmount(e.target.value)}
                                    placeholder="0"
                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                                />
                            </div>
                        </div>
                        <Button 
                            variant="primary-bw"
                            size="lg"
                            onClick={handleDonate}
                            className="w-full rounded-lg py-4 text-lg"
                            disabled={!donationAmount.trim()}
                        >
                            Make Donation
                        </Button>
                    </div>

                    {/* Campaign Sections */}
                    <div className="space-y-6 mb-12">
                        {/* About Campaign */}
                        <div>
                            <h2 className="text-xl font-semibold text-black mb-3">About Campaign</h2>
                            <p className="text-base text-gray-700 leading-relaxed">
                                {campaign.about}
                            </p>
                        </div>

                        {/* How It Works */}
                        <div>
                            <h2 className="text-xl font-semibold text-black mb-3">How It Works</h2>
                            <p className="text-base text-gray-700 leading-relaxed">
                                {campaign.howItWorks}
                            </p>
                        </div>

                        {/* Use Of Funds */}
                        <div>
                            <h2 className="text-xl font-semibold text-black mb-3">Use Of Funds</h2>
                            <p className="text-base text-gray-700 leading-relaxed">
                                {campaign.useOfFunds}
                            </p>
                        </div>
                    </div>

                   
                </div>
            </section>

            {/* You may also like section */}
            <section className="px-4 md:px-7 py-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                        You may also like
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {campaigns
                        .filter(c => c.id !== campaign.id)
                            .slice(0, 5)
                        .map((relatedCampaign) => (
                            <CampaignCard
                                key={relatedCampaign.id}
                                image={relatedCampaign.image}
                                title={relatedCampaign.title}
                                amountRaised={relatedCampaign.amountRaised}
                                goal={relatedCampaign.goal}
                                percentage={relatedCampaign.percentage}
                                alt={relatedCampaign.title}
                                onClick={() => navigate(`/campaign/${relatedCampaign.id}`)}
                                />
                            ))}
                    </div>
            </section>

<Banner />
            <Footer />
        </div>
    )
}

export default CampaignDetails
