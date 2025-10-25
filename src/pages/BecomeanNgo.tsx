import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { ChevronDown, Upload, CheckCircle } from 'lucide-react'

const BecomeanNgo = () => {
    const navigate = useNavigate()
    
    // Form state
    const [currentSection, setCurrentSection] = useState(1)
    const [ngoName, setNgoName] = useState('')
    const [missionStatement, setMissionStatement] = useState('')
    const [categories, setCategories] = useState<string[]>([])
    const [country, setCountry] = useState('')
    const [officeAddress, setOfficeAddress] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [websiteLink, setWebsiteLink] = useState('')
    const [registrationCert, setRegistrationCert] = useState<File | null>(null)
    const [proofOfAddress, setProofOfAddress] = useState<File | null>(null)
    const [organizerId, setOrganizerId] = useState<File | null>(null)
    const [walletAddress, setWalletAddress] = useState('')
    const [preferredNetwork, setPreferredNetwork] = useState('')
    const [accuracyConfirmed, setAccuracyConfirmed] = useState(false)
    const [policyAccepted, setPolicyAccepted] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const categoryOptions = [
        'Education',
        'Health',
        'Environment',
        'Poverty Alleviation',
        'Human Rights',
        'Animal Welfare',
        'Others'
    ]

    const networkOptions = ['Hedera', 'Ethereum',]

    const handleCategoryToggle = (category: string) => {
        setCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }

    const handleFileUpload = (file: File, type: 'registration' | 'address' | 'id') => {
        if (type === 'registration') {
            setRegistrationCert(file)
        } else if (type === 'address') {
            setProofOfAddress(file)
        } else if (type === 'id') {
            setOrganizerId(file)
        }
    }

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'registration' | 'address' | 'id') => {
        const file = event.target.files?.[0]
        if (file) {
            handleFileUpload(file, type)
        }
    }

    const handleConnectWallet = () => {
        // In a real implementation, this would connect to the user's wallet
        // For now, we'll simulate a wallet address
        setWalletAddress('0x1234567890abcdef1234567890abcdef12345678')
    }

    const isSection1Valid = () => {
        return ngoName.trim() !== '' && 
               missionStatement.trim() !== '' && 
               categories.length > 0 &&
               country !== '' &&
               officeAddress.trim() !== '' &&
               contactEmail.trim() !== ''
    }

    const isSection2Valid = () => {
        return registrationCert !== null && proofOfAddress !== null
    }

    const isSection3Valid = () => {
        return walletAddress !== '' && preferredNetwork !== ''
    }

    const isSection4Valid = () => {
        return accuracyConfirmed && policyAccepted
    }

    const handleSubmit = () => {
        // Save NGO data to localStorage
        const ngoData = {
            id: Date.now(),
            ngoName,
            missionStatement,
            categories,
            country,
            officeAddress,
            contactEmail,
            websiteLink,
            walletAddress,
            preferredNetwork,
            verified: false,
            createdAt: new Date().toISOString()
        }

        const existingNgos = JSON.parse(localStorage.getItem('ngos') || '[]')
        existingNgos.push(ngoData)
        localStorage.setItem('ngos', JSON.stringify(existingNgos))

        // Show success modal
        setShowSuccessModal(true)

        // Redirect to NGO profile after 3 seconds
        setTimeout(() => {
            navigate('/ngo-profile')
        }, 3000)
    }

    const nextSection = () => {
        if (currentSection < 4) {
            setCurrentSection(currentSection + 1)
        }
    }

    const prevSection = () => {
        if (currentSection > 1) {
            setCurrentSection(currentSection - 1)
        }
    }

    const canProceed = () => {
        switch (currentSection) {
            case 1: return isSection1Valid()
            case 2: return isSection2Valid()
            case 3: return isSection3Valid()
            case 4: return isSection4Valid()
            default: return false
        }
    }

    return (
        <div>
            <Header />
            
            <section className="px-4 md:px-7 py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    {/* Page Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-black mb-2">
                            Become a Verified NGO on DonateOnchain
                        </h1>
                        <p className="text-gray-600">
                            To help us verify your organization and enable crypto donations, please complete the form below carefully.
                        </p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex justify-center mb-8 gap-2">
                        {[1, 2, 3, 4].map((section) => (
                            <div key={section} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                                    currentSection === section ? 'bg-black text-white' : 
                                    currentSection > section ? 'bg-green-500 text-white' :
                                    'bg-gray-300 text-gray-600'
                                }`}>
                                    {currentSection > section ? '✓' : section}
                                </div>
                                {section < 4 && (
                                    <div className={`w-12 h-1 mx-1 ${
                                        currentSection > section ? 'bg-green-500' : 'bg-gray-300'
                                    }`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Section 1: Organization Details */}
                    {currentSection === 1 && (
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-black mb-6">📝 Section 1: Organization Details</h2>
                            
                            {/* NGO Name */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    1. NGO Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={ngoName}
                                    onChange={(e) => setNgoName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder="Enter your organization's registered name"
                                />
                            </div>

                            {/* Mission Statement */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    2. Mission Statement / Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={missionStatement}
                                    onChange={(e) => setMissionStatement(e.target.value)}
                                    rows={6}
                                    maxLength={300}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                                    placeholder="Describe what your organization does and the causes you support (max 300 words)"
                                />
                                <p className="text-sm text-gray-500 mt-1">{missionStatement.length}/300 characters</p>
                            </div>

                            {/* Category */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    3. Category <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {categoryOptions.map((category) => (
                                        <label key={category} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={categories.includes(category)}
                                                onChange={() => handleCategoryToggle(category)}
                                                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-2"
                                            />
                                            <span className="text-sm text-black">{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Country */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    4. Country of Operation <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    >
                                        <option value="">Select a country</option>
                                        <option value="Nigeria">Nigeria</option>
                                        <option value="Ghana">Ghana</option>
                                        <option value="Kenya">Kenya</option>
                                        <option value="South Africa">South Africa</option>
                                        <option value="United States">United States</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                                </div>
                            </div>

                            {/* Office Address */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    5. Office Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={officeAddress}
                                    onChange={(e) => setOfficeAddress(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder="Enter your organization's official address"
                                />
                            </div>

                            {/* Contact Email */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    6. Contact Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder="contact@yourngo.org"
                                />
                            </div>

                            {/* Website */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    7. Website or Social Media Link (Optional)
                                </label>
                                <input
                                    type="url"
                                    value={websiteLink}
                                    onChange={(e) => setWebsiteLink(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder="https://yourngo.org"
                                />
                            </div>
                        </div>
                    )}

                    {/* Section 2: Verification Documents */}
                    {currentSection === 2 && (
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-black mb-6">📁 Section 2: Verification Documents</h2>
                            
                            {/* Registration Certificate */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    8. Registration Certificate <span className="text-red-500">*</span>
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    {registrationCert ? (
                                        <div className="flex items-center justify-center gap-2 text-green-600">
                                            <CheckCircle size={20} />
                                            <span>{registrationCert.name}</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                                            <p className="text-sm text-gray-600">Upload PDF or image file</p>
                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileInputChange(e, 'registration')}
                                                className="hidden"
                                                id="registration-upload"
                                            />
                                            <label htmlFor="registration-upload" className="mt-2 inline-block cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                                                Click to upload
                                            </label>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Proof of Address */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    9. Proof of Address / Utility Bill <span className="text-red-500">*</span>
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    {proofOfAddress ? (
                                        <div className="flex items-center justify-center gap-2 text-green-600">
                                            <CheckCircle size={20} />
                                            <span>{proofOfAddress.name}</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                                            <p className="text-sm text-gray-600">Upload PDF or image file</p>
                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileInputChange(e, 'address')}
                                                className="hidden"
                                                id="address-upload"
                                            />
                                            <label htmlFor="address-upload" className="mt-2 inline-block cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                                                Click to upload
                                            </label>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Identity of Organization Head */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    10. Identity of Organization Head (Optional)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    {organizerId ? (
                                        <div className="flex items-center justify-center gap-2 text-green-600">
                                            <CheckCircle size={20} />
                                            <span>{organizerId.name}</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                                            <p className="text-sm text-gray-600">Upload PDF or image file</p>
                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileInputChange(e, 'id')}
                                                className="hidden"
                                                id="id-upload"
                                            />
                                            <label htmlFor="id-upload" className="mt-2 inline-block cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                                                Click to upload
                                            </label>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 3: Wallet Setup */}
                    {currentSection === 3 && (
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-black mb-6">💳 Section 3: Wallet Setup</h2>
                            
                            {/* Connect Wallet */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    11. Connect Your Wallet <span className="text-red-500">*</span>
                                </label>
                                {walletAddress ? (
                                    <div className="px-4 py-3 border border-green-300 rounded-lg bg-green-50">
                                        <p className="text-sm text-green-800">Connected: {walletAddress.substring(0, 10)}...{walletAddress.substring(walletAddress.length - 8)}</p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleConnectWallet}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-black transition-colors text-black font-medium"
                                    >
                                        Connect Wallet
                                    </button>
                                )}
                            </div>

                            {/* Preferred Network */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    12. Preferred Network <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {networkOptions.map((network) => (
                                        <button
                                            key={network}
                                            onClick={() => setPreferredNetwork(network)}
                                            className={`px-4 py-3 border-2 rounded-lg font-medium transition-colors ${
                                                preferredNetwork === network
                                                    ? 'border-black bg-black text-white'
                                                    : 'border-gray-300 text-black hover:border-gray-400'
                                            }`}
                                        >
                                            {network}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 4: Review & Confirmation */}
                    {currentSection === 4 && (
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-black mb-6">✅ Section 4: Review & Confirmation</h2>
                            
                            {/* Review Information */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    13. Review Your Information
                                </label>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                                    <p><strong>NGO Name:</strong> {ngoName}</p>
                                    <p><strong>Mission:</strong> {missionStatement.substring(0, 100)}...</p>
                                    <p><strong>Categories:</strong> {categories.join(', ')}</p>
                                    <p><strong>Country:</strong> {country}</p>
                                    <p><strong>Email:</strong> {contactEmail}</p>
                                    <p><strong>Network:</strong> {preferredNetwork}</p>
                                </div>
                            </div>

                            {/* Terms & Conditions */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    14. Terms & Conditions
                                </label>
                                <div className="space-y-3">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={accuracyConfirmed}
                                            onChange={(e) => setAccuracyConfirmed(e.target.checked)}
                                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-2"
                                        />
                                        <span className="text-sm text-black">I confirm that all information provided is accurate.</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={policyAccepted}
                                            onChange={(e) => setPolicyAccepted(e.target.checked)}
                                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-2"
                                        />
                                        <span className="text-sm text-black">I agree to DonateOnchain's verification and transparency policy.</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={prevSection}
                            disabled={currentSection === 1}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                                currentSection === 1
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-200 text-black hover:bg-gray-300'
                            }`}
                        >
                            Previous
                        </button>
                        
                        {currentSection < 4 ? (
                            <button
                                onClick={nextSection}
                                disabled={!canProceed()}
                                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                                    canProceed()
                                        ? 'bg-black text-white hover:bg-gray-800'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!canProceed()}
                                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                                    canProceed()
                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                Submit Application
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-black mb-2">🎉 Thank you for applying!</h2>
                        <p className="text-gray-600 mb-6">
                            Your NGO profile has been submitted for verification.
                            You'll receive a notification once approved — after which you can start creating fundraising campaigns and accepting crypto donations.
                        </p>
                        <p className="text-sm text-gray-500">Redirecting to your profile...</p>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}

export default BecomeanNgo

