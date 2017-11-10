import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';

import { ChatBoxContainer, SendMessageFormView } from '../ChatBoxContainer';
import ChatBox from "../../../components/Home/ChatBox";

describe('ChatBoxContainer component', () => {
  const wrapper = shallow(<ChatBoxContainer/>);

  const handleClick = sinon.spy();

  it('should render <ChatBoxContainer /> components', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('div class="chat-box"', () => {
    it('should render a div className="chat-box"', () => {
      expect(wrapper.find(".chat-box").length).toBe(1);
    });

    it('should render a div className="block__chat-box"', () => {
      expect(wrapper.children().find(".block__chat-box").length).toBe(1);
    });

    const btnOpen = wrapper.children().find(".btn-open");
    it('should render a button className="btn-open"', () => {
      expect(btnOpen.length).toBe(1);
    });

    it('click button open to open chatbox container"', () => {
      btnOpen.simulate('click');
      expect(handleClick.calledOnce).toEqual(true);
    });

  const collapseDiv = wrapper.find(".collapse");

    describe('div class="collapse"', () => {
      it('should render a div className="collapse"', () => {
        expect(collapseDiv.length).toBe(1);
      });

      it('should render a div className="chat-box__title"', () => {
        expect(collapseDiv.find(".chat-box__title").length).toBe(1);
      });

      it('should render a div className="chat-box__title-text"', () => {
        expect(collapseDiv.children().find(".chat-box__title-text").length).toBe(1);
      });

      const btnClose = collapseDiv.children().find(".btn-close");
      it('should render a div className="btn-close"', () => {
        expect(btnClose.length).toBe(1);
      });

      it('click button close to close chatbox container"', () => {
        btnClose.simulate('click');
        expect(handleClick.calledOnce).toEqual(true);

      });
    });

    describe('div class="chat-messages"', () => {
      it('should render a div className="chat-messages"', () => {
        expect(collapseDiv.children().find(".chat-messages").length).toBe(1);
      });

      it('should render a div className="block__chat-messages"', () => {
        expect(collapseDiv.children().find(".block__chat-messages").length).toBe(1);
      });

      it('should render <ChatBox /> component', () => {
        expect(collapseDiv.children().find(ChatBox).length).toBe(1);
      });
    });

    const formBlock = collapseDiv.children().find(".chat-messages__form");

    describe('div class="chat-messages__form"', () => {

      it('should render a div className="chat-messages__form"', () => {
        expect(formBlock.length).toBe(1);
      });

      it('should render <SendMessageFormView typingMessage />', () => {
        expect(formBlock.find(SendMessageFormView).prop('typingMessage').length).toBe(1);
      });

      const chatBoxForm = formBlock.find("form");

      it('should render a form', () => {
        expect(chatBoxForm.length).toBe(1);
      });

      it('should render a div class="form-group" ', () => {
        expect(chatBoxForm.find('form-group').length).toBe(1);
      });

      it('should render input text', () => {
        expect(chatBoxForm.find('input[type="text"]').length).toBe(1);
      });

      it('should render button send', () => {
        expect(chatBoxForm.find('.btn-send').length).toBe(1);
      });

      it('click to send a message', () => {
        chatBoxForm.find('.btn-send').simulate('click');
        expect(handleClick.calledOnce).toEqual(true);
      });
    });
  });
});




