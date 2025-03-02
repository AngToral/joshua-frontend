import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import ScrollAnimation from 'react-animate-on-scroll';

const PrivacyPolicy = () => {

    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = "#e6eae9"
    }, []);

    function handleHome() {
        navigate("/")
    }

    function handleDashboard() {
        navigate("/dashboard")
    }

    return (
        <>
            <div className='h-screen'>
                <ScrollAnimation animateIn="animate__animated animate__fadeIn" animateOnce={true}>
                    <div className="flex flex-wrap md:h-[130px] h-[100px] text-xl">
                        <div className="flex">
                            <a>
                                <img onClick={handleHome} src="logoCompletoNegro.png" alt="logoJoshua" className='m-6 h-20 w-20 cursor-pointer' />
                            </a>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center m-10 gap-4'>
                        <h1 className='text-xl md:text-2xl text-joshua-800'>Privacy Policy</h1>
                        <div className='mb-5'>
                            <p className="text-joshua-800 md:mx-20 mx-1">At Joshua's Training we are committed to protecting and respecting your privacy. This Privacy Policy describes how we collect, use and protect the personal information we collect through our website. By using our website, you agree to the terms of this Privacy Policy.</p>
                            <p className="text-joshua-800 md:mx-20 mx-1 underline">Collection of Information</p>
                            <p className="text-joshua-800 md:mx-20 mx-1">We collect personal information when you voluntarily provide it to us through contact forms, newsletter subscriptions or other interactions with our website. The personal information we collect may include your name, email address, phone number, and any other information you choose to provide to us.</p>
                            <p className="text-joshua-800 md:mx-20 mx-1">We also automatically collect certain non-personal information when you visit our website. This may include your IP address, browser type, Internet Service Provider (ISP), referring/exit pages, operating system, timestamp and browsing data. This information is collected anonymously and used to analyze trends, administer the website, track users' movements around the site and gather demographic information.</p>
                            <p className="text-joshua-800 md:mx-20 mx-1 underline">Use of Information</p>
                            <p className="text-joshua-800 md:mx-20 mx-1">We use the personal information we collect to provide you with the services and products you request, respond to your inquiries, improve our website, and send communications related to our services. We may also use the information for internal research, analysis and new product development purposes.</p>
                            <p className="text-joshua-800 md:mx-20 mx-1 underline">Disclosure of Information</p>
                            <p className="text-joshua-800 md:mx-20 mx-1">We do not sell, rent or share your personal information with third parties without your consent, except in the following circumstances:</p>
                            <p className="text-joshua-800 md:mx-20 mx-1">If we have your express consent to share the information.</p>
                            <p className="text-joshua-800 md:mx-20 mx-1">If it is necessary to comply with a legal obligation, such as responding to a court order or complying with legal requirements.</p>
                            <p className="text-joshua-800 md:mx-20 mx-1">If we believe in good faith that disclosure is necessary to protect our rights, your safety or the safety of others, investigate fraud, or respond to a government request.</p>
                            <p className="text-joshua-800 md:mx-20 mx-1">If our company or part of our company is merged, acquired or sold, personal information may be transferred as part of that transaction.</p>
                            <p className="text-joshua-800 md:mx-20 mx-1 underline">Information Security</p>
                            <p className="text-joshua-800 md:mx-20 mx-1">We are committed to ensuring the security of your personal information. We have implemented appropriate technical and organizational measures to protect the personal information we collect and maintain. However, you should be aware that no data transmission over the Internet or electronic storage is completely secure, and we cannot guarantee its absolute security.</p>
                            <p className="text-joshua-800 md:mx-20 mx-1 underline">Links to Other Websites</p>
                            <p className="text-joshua-800 md:mx-20 mx-1">Our website may contain links to other third party websites. This Privacy Policy applies only to our website, so we encourage you to read the privacy policies of other websites you visit.</p>
                            <p className="text-joshua-800 md:mx-20 mx-1 underline">Your Rights</p>
                            <p className="text-joshua-800 md:mx-20 mx-1">You have the right to access, correct, update and delete your personal information in our possession. If you wish to exercise any of these rights, please contact us using the contact information provided below. We will process your request in accordance with applicable laws and regulations.</p>
                            <p className="text-joshua-800 md:mx-20 mx-1 underline">Changes to this Privacy Policy</p>
                            <p className="text-joshua-800 md:mx-20 mx-1">We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective upon posting on our website. We encourage you to periodically review this Privacy Policy to be aware of any changes or updates.</p>
                            <p className="text-joshua-800 md:mx-20 mx-1 underline">Contact</p>
                            <p className="text-joshua-800 md:mx-20 mx-1">If you have any questions, concerns or requests regarding this Privacy Policy, please feel free to contact us through the following means:</p>
                            <p className="text-joshua-800 md:mx-20 mx-1 font-bold">Company Name: Joshua Destigter</p>
                            <p className="text-joshua-800 md:mx-20 mx-1 font-bold">Address:</p>
                            <p className="text-joshua-800 md:mx-20 mx-1 font-bold">Email:</p>
                            <p className="text-joshua-800 md:mx-20 mx-1">We appreciate your trust in Joshua's Training and are committed to protecting your privacy and maintaining the security of your personal information.</p>
                        </div>
                    </div>
                </ScrollAnimation>
                <Footer />
            </div>
        </>
    )
}

export default PrivacyPolicy