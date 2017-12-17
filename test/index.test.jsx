import LoginModal2 from '../src/LoginModal';
import ButtonInteract2 from '../src/ButtonInteract';
import ButtonLike2 from '../src/ButtonLike';
import ButtonFollow2 from '../src/ButtonFollow';
import ButtonLogout2 from '../src/ButtonLogout';

import {
  ButtonInteract,
  LoginModal,
  ButtonLike,
  ButtonFollow,
  ButtonLogout,
} from '../src';

test('should export ButtonInteract', () => {
  expect(ButtonInteract).toEqual(ButtonInteract2);
});

test('should export LoginModal', () => {
  expect(LoginModal).toEqual(LoginModal2);
});

test('should export ButtonLike', () => {
  expect(ButtonLike).toEqual(ButtonLike2);
});

test('should export ButtonFollow', () => {
  expect(ButtonFollow).toEqual(ButtonFollow2);
});

test('should export ButtonLogout', () => {
  expect(ButtonLogout).toEqual(ButtonLogout2);
});
