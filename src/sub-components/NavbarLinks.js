import React from "react";
import {Row, Col, InputGroup, FormControl} from 'react-bootstrap';

export default function NavbarLinks() {
    return(
        <>
            <Row className="show-desktop" style={{marginTop: 10, marginBottom: 2, width: "100%"}}>
                <Col>
                    <dl>
                        <dt>Company Info</dt>
                        <dd><p  id="about us">About Us</p></dd>
                        <dd><p  id="careers">Careers</p></dd>
                        <dd><p  id="social responsibility">Social Responsibility</p></dd>
                        <dd><p  id="affiliate program" target="_blank">Affiliate Program</p></dd>
                        <dd><p id="business with us">Business With Us</p></dd>
                        <dd><p  id="press talent">Press &amp; Talent</p></dd>
                        <dd><p  id="find a store">Find a Store</p></dd>
                            <dd><p  id="site map">Site Map</p></dd>
                    </dl>
                </Col>
                <Col>
                    <dl>
                        <dt>Help</dt>
                        <dd><p  id="contact us">Contact Us</p></dd>
                        <dd><p id="order status">Order Status</p></dd>
                        <dd><p  id="shipping info">Shipping Info</p></dd>
                        
                        <dd><p  id="online returns">Online Returns &amp; Exchanges</p></dd>
                        <dd><p  id="store returns">Store Return &amp; Exchange</p></dd>
                        <dd><p  id="size guide">Size Guide</p></dd>
                        <dd><p  id="faq">FAQ</p></dd>
                    </dl>
                </Col>
                <Col>
                    <dl>
                        <dt>Quick Links</dt>
                            <dd><p  id="special offers">Special Offers</p></dd>
                        <dd><p  id="gift cards">Gift Cards</p></dd>
                            <dd><p id="quicklinks_f21_blog" target="_blank">Blog</p></dd>
                        <dd><p  id="nav_privacy_policy"> Privacy Policy</p></dd>
                        
                        <dd><p  id="california privacy rights">Your California Privacy Rights</p></dd>
                        <dd><p  id="CA supply chains act">CA Transparency in Supply Chains Act</p></dd>
                        <dd><p  id="terms of use">Terms of Use </p></dd>
                        <dd><p  id="was">Web Accessibility Statement</p></dd>
                    </dl>
                </Col>
                <Col>
                    <dl>
                        <dt>Forever Rewarded</dt>
                        <dd><p id="credit card application">Apply Now</p></dd>
                        <dd><p  id="credit card benefits">Card Benefit</p></dd>
                        <dd><span>Manage Account</span></dd>
                        <dd className="pl_5 t_gray"><p  id="forever 21 credit card">- Forever 31 Credit Card</p></dd>
                        <dd className="pl_5 t_gray"><p  id="visa credit card">- Forever 31 VISA Credit Card</p></dd>
                    </dl>
                </Col>
                <Col>
                    <div style={{marginBottom: 50}}>
                        <h4 style={{fontWeight: "bold"}}>Fear of missing out?</h4>
                        <h6>Be the first to know about the latest deals, style updates & more!</h6>
                        <InputGroup size="sm" className="mb-1 mt-2">
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{color: "#FFFFFF", backgroundColor: "#212529"}} id="inputGroup-sizing-sm">JOIN</InputGroup.Text>
                            </InputGroup.Prepend>
                        </InputGroup>
                        <small style={{lineHeight: 0.5}}>By clicking 'JOIN', I am requesting that Forever 31 send me promotional offers to this email address. I understand that my information will be subject to this <u>Privacy Policy.</u></small>
                    </div>
                </Col>
            </Row>
            <Row style={{justifyContent: "center", marginBottom: 10}}>
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="fa fa-facebook">{}</a>
                <a href="https://instagram.com/" rel="noopener noreferrer" target="_blank" className="fa fa-instagram">{}</a>
                <a href="https://youtube.com/"  rel="noopener noreferrer" target="_blank" className="fa fa-youtube">{}</a>
                <a href="https://twitter.com/"  rel="noopener noreferrer" target="_blank" className="fa fa-twitter">{}</a>
                <a href="https://foursquare.com/"  rel="noopener noreferrer" target="_blank" className="fa fa-foursquare">{}</a>
                <a href="https://linkedin.com/"  rel="noopener noreferrer" target="_blank" className="fa fa-linkedin">{}</a>
                <a href="https://yahoo.com/"  rel="noopener noreferrer" target="_blank" className="fa fa-yahoo">{}</a>
                <a href="https://reddit.com/"  rel="noopener noreferrer" target="_blank" className="fa fa-reddit">{}</a><br/><br/>
            </Row>
            <small>© 2020 Forever31 Inc. All rights reserved.</small>
        </> 
    );
}