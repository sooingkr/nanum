import { mount } from 'enzyme';

export const mountedWithProps = (jsx, mountedComponent) => {
  if(!mountedComponent) {
    mountedComponent = mount(jsx);
  }
  return mountedComponent;
}