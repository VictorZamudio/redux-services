/* import fetch from "cross-fetc";

export const REQUEST_POSTS = 'REQUEST_POSTS'; 
export const RECEIVE_POSTS = 'RECEIVE_POSTS'; 
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'; 
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'; 

export function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

export function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

export function fetchPosts(subreddit) {
  return fetch(`https:www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts, json))
}

export function shouldFetchPosts(subreddit) {
  const posts = state.postsBySubReddit[subreddit];
  if (!posts) {
    return true;  
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  }
}

export function selectSubReddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

export function invalidateSubReddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
} */

import fetch from "cross-fetch";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

function receivePosts(subreddit, json) {
  console.log("json: ", json);

   return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.map(data => data),
    receivedAt: Date.now()
  };
/*     return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
 */}

function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit));
    // return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    return fetch('http://api.icndb.com/jokes/')
    .then(response => response.json())
    // .then(json => dispatch(receivePosts(subreddit, json)));
      .then((data) => {
        dispatch(receivePosts(subreddit, data.value))
      })
  };
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  };
}