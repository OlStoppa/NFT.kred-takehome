import { ParamsAction, ParamsActionType } from '../model/types';
import { defaultParams } from '../constants/index';

export function paramsReducer(state: typeof defaultParams, action: ParamsAction) {
  switch (action.type) {
    case ParamsActionType.INCREMENT_PAGE:
      return { ...state, page: state.page + 1 };
    case ParamsActionType.UPDATE_COUNT:
      return { ...defaultParams, count: action.payload };
    case ParamsActionType.TOGGLE_FORSALE:
      return { ...defaultParams, onsale: action.payload }
  }
}