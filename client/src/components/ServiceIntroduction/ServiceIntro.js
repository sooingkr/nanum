/*
* Create by Yen Hua
* 11/14/2017
* */

import React from "react";
import { Image } from "react-bootstrap";

import { Link } from "react-router-dom";

const ServiceIntro = () => {
  return (
    <div className="service-intro">
      <div className="service-intro__info">
        <h1 className="service-intro__title">로그인을 하셔서 여러분에 소중한 데이터를 기록해주세요.
          여러분이 앓고있는 질병이나, 상태를 파악해 건강에 유익한 식단과 식생활 가이드를 제공해 드립니다.</h1>
        <p className="pagraph">저희는 회원가입시 여러분들의 건강데이터를 수집해 건강한 식생활이 활발하게 이루어질 수 있도록 노력합니다. 회원가입시 유저의 키와 몸무게 기본적인 신상정보를 수집하고 앓고있는 질병 또는 현재 유저의
          상태(임신, 다이어트)를 체크합니다.
        </p>
        <p className="pagraph">이렇게 수집한 건강데이터로 유저 개인만의 대시보드를 출력해 식단 관리 뿐만이 아니라 더 나아가 식품을 조회하여 조회한 식품이 유저에게 어떠한 영향을 끼치는지에 대해서 파악하고 관리합니다. </p>
        <p className="service-info__box">ex) 임산부인 &nbsp;김레클 님에게 좋지 않은 비타민 c와 비타민 e가 다량 햠유된 제품입니다. 김레클 님에게 추천하지 않습니다. </p>
        <p className="middle-pagrah">만약 유저의 몸에 악영향을 끼치는 제품이라면 위의 예시와같이 제품을 추천하지 않는다는<br></br>
          문구를 출력하여 다른 대체식품을 추천해줍니다.</p>
        <Link className="btn btn-default button-green" to="/login" target="_blank" title="로그인하기">로그인하기</Link>
      </div>
      <div className="service-intro__image">
        <div className="service-green__bg"></div>
        <div className="service-image__intro">
          <Image responsive src="https://image.freepik.com/free-photo/table-with-ingredients-to-prepare-italian-pasta_23-2147606548.jpg" alt="Dashboard"></Image>
          <h2 className="service-intro__title">로그인을 하시면 실시간 채팅으로 여러분들의 궁금한 점을
            빠르게 해결해 드립니다.</h2>
          <div className="service-image__block"><Image responsive src="https://image.freepik.com/free-photo/table-with-ingredients-to-prepare-italian-pasta_23-2147606548.jpg" alt="Chatbox"></Image></div>
          <div className="service-image__block"><Image responsive src="https://image.freepik.com/free-photo/table-with-ingredients-to-prepare-italian-pasta_23-2147606548.jpg" alt="Chatbox-HACCP"></Image></div>
          <p>로그인을 하시면  개인 상담이 실시간으로 가능하며 고객의 질문을 정확히 파악해 명확한 답변이 가능합니다.</p>
          <Link className="btn btn-default button-green" to="/login" target="_blank" title="로그인하기">로그인하기</Link>
        </div>
      </div>
    </div>
  );
}

export default ServiceIntro;