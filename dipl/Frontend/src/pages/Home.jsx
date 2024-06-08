import React from 'react'
import Navbar from '../components/Home/Navbar'
import Hero_card from '../components/Home/Hero_card'
import Service_grid from '../components/Home/service_grid'
import Footer from '../components/Home/Footer'




const Home = () => {
    return (
        <>
            {/* header section start */}
            <section className="header relative">
                <Navbar />
                <Hero_card />
            </section>

            {/* header section ends */}

            {/* Service section start */}
            <section>
                <Service_grid />
            </section>
            {/* service_section ends here */}

            {/* footer section start */}
            <section>
                <Footer />
            </section>
            {/* footer section ends here */}





        </>
    )
}

export default Home
