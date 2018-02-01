/*
* Create by Yen Hua
* 11/14/2017
* */

import React from "react";
import { Image } from "react-bootstrap";
import DashboardImg from '../../assets/images/promotion_image1.png';
import ChatboxImg from '../../assets/images/promotion_image2.png';

const ServiceIntro = ({isMobile}) => {
  const authenLink = isMobile ? '/mobile/realAuthentication.do?redirectUrl=%2Fmobile%2Fmain.do' : '/realAuthentication.do';
  return (
    <div className="service-intro">
      <div className="service-intro__info">
        <h1 className="service-intro__title">
          로그인을 하셔서 여러분에 소중한 데이터를 기록해주세요.
          여러분이 앓고 있는 질병이나, 상태를 파악해 건강에 유익한 식단과 식생활 가이드를 제공해 드립니다.
        </h1>
        <p className="paragraph">
          회원가입 시 여러분의 건강데이터를 수집해 건강한 식생활이 활발하게 이루어질 수 있도록 노력하고자 합니다. 회원가입 시 본인의 키와 몸무게 등 기본적인 신상정보를 수집하여 앓고 있는 질병 또는 현재 본인의 상태(임신, 다이어트 등)를 분석합니다.
          이렇게 분석한 건강 데이터로 본인 개인에 특화된 맞춤형 안전먹거리 추천 화면(대시보드 형태)을 제공하여 식단 뿐만 아니라 본인의 생애주기까지 고려한 건강 컨설턴트 시스템으로 발전시키고자 합니다.
        </p>
        <p className="service-info__box">ex) 임산부인 김해썹 님에게 좋지 않은 XX첨가물과 비타민 E가 다량 함유된 제품입니다. 김해썹 님에게 권유하지 않습니다.</p>
        <p className="middle-paragraph">
          만약 본인의 몸에 나쁜 영향을 끼치는 제품이라면 위의 예시와 같은 정보를 알려주고 다른 대체식품을 추천해줍니다.
        </p>
        <div className="service-intro__btn">
          <a className="btn btn-default button-green" href={authenLink} title="로그인하기">로그인하기</a>
        </div>        
      </div>
      <div className="service-intro__image">
        <div className="service-green__bg"></div>
        <div className="service-image__intro">
          <Image responsive src={DashboardImg} alt="Dashboard" className="img-dashboard"/>
          <h2 className="service-intro__title">
            로그인을 하시면 실시간 채팅으로 여러분들의 궁금한 점을 빠르게 해결해 드립니다.
          </h2>
          <div className="service-image__block">
            <Image responsive src={ChatboxImg} alt="Chatbox"/>
          </div>
          <div className="service-intro__btn">
            <a className="btn btn-default button-green" href={authenLink} target="_blank" title="로그인하기">로그인하기</a>
          </div>          
        </div>
      </div>
    </div>
  );
}

export default ServiceIntro;