import React from 'react';
import { mount } from 'enzyme';
// import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ChatBoxContainer from '../ChatBoxContainer';
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
      openChatBox: undefined,
      toggleChatBox: undefined
    };
    mountedChatBox = undefined;


  });
  it('renders without crashing', () => {
    shallow(<ChatBoxContainer {...props} />);
  });
});


