import Constants from "@/constants";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return `${text.substring(0, maxLength)}...`;
  }
};

const savePost = (item, data, setData) => {
  if (localStorage.getItem(Constants.POSTS_STORAGE_KEY)) {
    let posts = JSON.parse(localStorage.getItem(Constants.POSTS_STORAGE_KEY));
    posts = posts.filter((post) => post.id !== item.id);
    posts.push(item);
    localStorage.setItem(Constants.POSTS_STORAGE_KEY, JSON.stringify(posts));

    const updatedPosts = data.map((post) => {
      if (post.id === item.id) {
        return { ...post, isPostSaved: true };
      }
      return post;
    });
    setData(updatedPosts);
  } else {
    let posts = [];
    posts.push(item);
    localStorage.setItem(Constants.POSTS_STORAGE_KEY, JSON.stringify(posts));

    const updatedPosts = data.map((post) => {
      if (post.id === item.id) {
        return { ...post, isPostSaved: true };
      }
      return post;
    });
    setData(updatedPosts);
  }
};

const removePost = (id, data, setData) => {
  let posts = JSON.parse(localStorage.getItem(Constants.POSTS_STORAGE_KEY));
  if (posts) {
    posts = posts.filter((post) => post.id !== id);
    localStorage.setItem(Constants.POSTS_STORAGE_KEY, JSON.stringify(posts));

    const updatedPosts = data.map((post) => {
      if (post.id === id) {
        return { ...post, isPostSaved: false };
      }
      return post;
    });

    setData(updatedPosts);
  }
};

const unBookmarkPost = (id, data, setData) => {
  let posts = JSON.parse(localStorage.getItem(Constants.POSTS_STORAGE_KEY));
  if (posts) {
    posts = posts.filter((post) => post.id !== id);
    localStorage.setItem(Constants.POSTS_STORAGE_KEY, JSON.stringify(posts));
    setData(posts);
  }
};

const isPostSaved = (id, data) => {
  if (data) {
    const post = data.find((post) => post.id === id);
    return post.isPostSaved;
  }
  return false;
};

export { isPostSaved, removePost, savePost, truncateText, unBookmarkPost };

