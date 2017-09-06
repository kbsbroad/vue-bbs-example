function createPost({ subject, content }) {
  return new Promise((resolve) => {
    resolve({ subject, content });
  });
}

export default {
  createPost,
};
