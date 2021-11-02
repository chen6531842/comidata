import {objAny} from './common/common-interface';

declare global {
  interface Window {
    subscribers: objAny
  }
}