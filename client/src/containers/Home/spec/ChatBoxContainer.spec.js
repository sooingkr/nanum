import React from 'react';
import { shallow, mount } from 'enzyme';

import { ChatBoxContainer } from '../ChatBoxContainer';
import ChatBox from "../../../components/Home/ChatBox";

describe('ChatBoxContainer component', () => {
  let props;
  let mountedChatBox;

  const chatBoxContainer = () => {
    if (!mountedChatBox) {
      mountedChatBox = mount(
        <ChatBoxContainer {...props}/>
      )
    }
    return mountedChatBox;
  }

  beforeEach(() => {
    props = {
      userId: '1',
      messages: [
        {
          id: '1',
          content: '',
          admes: 'HACCP 교육 일정을 알려주세요.'
        },
        {
          id: '2',
          content: '무엇을 도와드릴까요?',
          admes: 'HACCP 교육 일정을 알려주세요.'
        },
        {
          id: '3',
          content: '무엇을 도와드릴까요?',
          admes: ''
        },
        {
          id: '1',
          content: '무엇을 도와드릴까요?',
          admes: 'HACCP 교육 일정을 알려주세요.'
        },
        {
          id: '1',
          content: '무엇을 도와드릴까요?',
          admes: 'ad message 2'
        },
        {
          id: '1',
          content: '무엇을 도와드릴까요?',
          admes: ''
        }
      ],
    };

    mountedChatBox = undefined;
  });

  it('renders without crashing', () => {
    shallow(<ChatBoxContainer {...props} />);
  });

  describe('render ChatBox component', () => {
    it ("always render ChatBox component", () => {
      expect(chatBoxContainer().find(ChatBox).length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('<form/> element', () => {
    it('should have a `<form>` element in ChatBoxContainer', () => {
      expect(chatBoxContainer().find('form').length).toBe(1);
    });

    describe('<input/> element', () => {
      it('`<input>` element should be of type `text`', () => {
        expect(chatBoxContainer().find('form').childAt(0).props().type).toBe('text');
      });

      it('`<input>` element value should be empty', () => {
        expect(
          chatBoxContainer().find('form').childAt(0).props().value).toBe('');
      });

    });

    describe('<button/> element', () => {
      it('should have a `<button>` element', () => {
        const form = chatBoxContainer().find('form');
        expect(form.find("button").length).toBe(1);
      });
    });
  });

});




