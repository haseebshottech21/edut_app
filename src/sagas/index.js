import {fork} from 'redux-saga/effects';
import user from './user';
import challenge from './challenge';
import journal from './journal';
import group from './group';
import oneToOneChat from './oneToOneChat';
import appInfo from './appInfo';
import profile from './profile';
import stripe from './stripe';

export default function* root() {
  yield fork(user);
  yield fork(challenge);
  yield fork(journal);
  yield fork(group);
  yield fork(oneToOneChat);
  yield fork(appInfo);
  yield fork(profile);
  yield fork(stripe);
}
