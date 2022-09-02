import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './About.scss'
import google from '../../img/google.png';
import naver from '../../img/naver.png';
import blog from '../../img/blog.png';
import instagram from '../../img/instagram.png';
import map from '../../img/map.png';
import logo_blue from '../../img/logo_blue.png';
import nextravel from '../../img/nextravel.gif';
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    });   

    return (
        <div className="About">
            <h1>NEXTRAVEL 소개</h1>
            <div className="about-wrap about1">
                <div className="about-txt" data-aos="fade-right">
                    <h2>여행 계획, <br /> 어떻게 세우시나요?</h2>
                    <p><b>검색 사이트</b>에서 검색을 하고, <br />캡처하거나 북마크 저장!</p>
                </div>
                <div className="about-img">
                    <img src={google} alt="google homepage" data-aos="fade-left" data-aos-delay="200" />
                    <img src={naver} alt="naver homepage" data-aos="fade-left" data-aos-delay="300" />
                </div>
            </div>

            <div className="about-wrap about2" data-aos="fade" data-aos-delay="600">
                <div className="about-img">
                    <ul>
                        <li><img src={blog} alt="blog icon" /></li>
                        <li><img src={map} alt="map icon" /></li>
                        <li><img src={instagram} alt="instagram icon" /></li>
                    </ul>
                </div>
                <div className="about-txt" data-aos="fade-up" data-aos-delay="300">
                    <p>블로그, 지도, 인스타그램 등<br /><b>다양한 어플</b>을 사용하느라 번거로우셨죠.</p>
                </div>
            </div>

            <div className="next-travel">
                <div className="n-title" data-aos="fade-down">
                    <h3>그래서 준비한 <b>여행 일정 플래닝 사이트</b></h3>
                    <img src={logo_blue} alt="NEXTRAVEL" />
                </div>

                <div className="next-travel-img" data-aos="fade" data-aos-delay="200">
                    <img src={nextravel} alt="hompage" />
                </div>

                <div className="next-travel-txt">
                    <div className="txt-box" data-aos="fade-right">
                        <h3><span>01</span>손쉬운 여행플래닝</h3>
                        <p>저장한 장소를 모아보고 손 쉽게 일정을 세워보세요!</p>
                    </div>
                    <div className="txt-box" data-aos="fade-right" data-aos-delay="200">
                        <h3><span>02</span>실 후기 일정 공유 시스템</h3>
                        <p>사용자들의 실제 경험을 공유할 수 있어요!</p>
                    </div>
                </div>

                <div className="n-btn-wrap" data-aos="fade">
                    <button onClick={() => navigate('/makeplan')}>지금 바로 일정 만들기</button>
                </div>
            </div>

        </div>
    );
};

export default About;