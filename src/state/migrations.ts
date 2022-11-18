import { initialState as initialListsState } from './lists/reducer';
import { initialState as initialUserState } from './user/reducer';

// https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md#example-with-createmigrate
const migrations = {
  // @ts-ignore
  0: (state) => {
    return {
      ...state,
      // lists: initialListsState,
    };
  },
};

export default migrations;
