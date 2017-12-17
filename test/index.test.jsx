import LoginModal2 from '../src/LoginModal';
import ButtonInteract2 from '../src/ButtonInteract';

import { ButtonInteract, LoginModal } from '../src';

test('should export ButtonInteract', () => {
  expect(ButtonInteract).toEqual(ButtonInteract2);
});

test('should export LoginModal', () => {
  expect(LoginModal).toEqual(LoginModal2);
});
