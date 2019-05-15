import { SHOW_SKELETON, HIDE_SKELETON } from '../actions/SkeletonActions';

const skeleton = (state = null, action) => {
  switch (action.type) {
    case SHOW_SKELETON:
      return Object.assign({}, state,
        {
          showSkeleton: true,
        });
    case HIDE_SKELETON:
      return Object.assign({}, state,
        {
          showSkeleton: false,
        });
    default:
      return state;
  }
};

export default skeleton;
