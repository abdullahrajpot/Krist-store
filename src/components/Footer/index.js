import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>

            <div className="footer__two all-footer bg-dark text-light pt-5">
                <div className="container pt-30" style={{ fontSize: '17px' }}>
                    <div className="row gap-5 d-flex justify-content-center" style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <div className="col-xl-4 col-lg-5 col-md-6 lg-mb-30">
                            <div className="footer__two-widget footer-border">
                                <h4 className='mb-4'>ABOUT US</h4>
                                <div className="footer__two-widget-about">
                                    <p align="justify">Krist is more than just a clothing and footwear brand; it represents a lifestyle rooted in style, comfort, and confidence. Founded with a passion for fashion, Krist aims to provide high-quality, trendy apparel and footwear that cater to diverse tastes and preferences.

                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 md-mb-30">
                            <div className="footer__two-widget footer-border">
                                <h4 className='mb-4'>USEFUL LINKS</h4>
                                <div className="footer__two-widget-location">
                                    <div className="footer__two-widget-location-item-info pb-2">
                                        <Link to='/' className='link' >- Home</Link>
                                    </div>
                                    <div className="footer__two-widget-location-item-info pb-2">
                                        <Link to='' className='link' >- About us</Link>
                                    </div>
                                    <div className="footer__two-widget-location-item-info pb-2">
                                        <Link to='/products' className='link' >- Menu</Link>
                                    </div>
                                    <div className="footer__two-widget-location-item-info pb-2">
                                        <Link to='/cart' className='link' >- Cart</Link>
                                    </div>
                                    <div className="footer__two-widget-location-item-info pb-2">
                                        <Link to='/my-orders' className='link' >- My Orders</Link>
                                    </div>
                                    <div className="footer__two-widget-location-item-info pb-2">
                                        <Link to='/favorites' className='link'>- Favorites</Link>
                                    </div>
                                    <div className="footer__two-widget-location-item-info">
                                        <Link to='' className='link' >- Contact us</Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 md-mb-30 d-flex-end">
                            <div className="footer__two-widget footer-border">
                                <h4>CONTACT DETAILS</h4>
                                <div className="footer__two-widget-location">
                                    <div className="footer__two-widget-location-item d-flex mt-3" style={{ gap: '15px' }}>
                                        <div className="footer__two-widget-location-item-icon">
                                            <i className="fa fa-phone " style={{ color: '#0185c3' }}></i>
                                        </div>
                                        <div className="footer__two-widget-location-item-info ">
                                            <p>03007965044</p>
                                        </div>
                                    </div>
                                    <div className="footer__two-widget-location-item d-flex " style={{ gap: '15px' }}>
                                        <div className="footer__two-widget-location-item-icon">
                                            <i className="fa fa-envelope" style={{ color: '#0185c3' }}></i>
                                        </div>
                                        <div className="footer__two-widget-location-item-info">
                                            <Link to={'Naveed.syed@nextarm.net'} className='link'>abdullahtarqi5044@gmail.com</Link>
                                        </div>
                                    </div>
                                    <div className="footer__two-widget-location-item d-flex mt-3" style={{ gap: '15px' }}>
                                        <div className="footer__two-widget-location-item-icon">
                                            <i className="fa fa-map-marker-alt" style={{ color: '#0185c3' }}></i>
                                        </div>
                                        <div className="footer__two-widget-location-item-info">
                                            <p>Lyllpur Galleria, 2nd floor , canal road Faisalabad</p>
                                        </div>
                                    </div>
                                    <div className="footer__two-widget-about-social">
                                        <ul style={{ display: 'flex', gap: '3px', listStyle: 'none', marginTop: '19px' }}>
                                            <li>
                                                <Link to='https://www.linkedin.com/' target='blank'>
                                                <i className='social fab fa-linkedin'
                                                    style={{
                                                        
                                                        borderRadius: '23px', padding: '15px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)'
                                                    }} />
                                                    </Link>
                                            </li>
                                            <li>
                                                <Link to='https://www.instagram.com/' target='blank'>
                                                    <i className='social fab fa-instagram' width={'50px'}
                                                        style={{

                                                            borderRadius: '23px', padding: '15px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)'
                                                        }} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='https://www.facebook.com/' target='blank'>
                                                    <i className='social fab fa-facebook-f ' width={'50px'}
                                                        style={{

                                                            borderRadius: '25px', padding: '15px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)'
                                                        }} />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="copyright__two mt-5">
                    <div className="container-fluid pt-3" style={{ backgroundColor: 'black' }}>
                        <div className="row">
                            <div className="col-xl-12 text-center ">
                                <p>&copy; 2024 <a >Krist</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
