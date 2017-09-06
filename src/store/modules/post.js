import postApi from '../../api/post';

const actions = {
  createPost(context, payload) {
    postApi.createPost(payload)
      .then(() => {
        // do something...
      });
  },
};

export default {
  actions,
};
