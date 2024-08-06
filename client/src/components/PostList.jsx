/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import PostListItem from "./PostListItem";

const PostList = ({ posts }) => {
  return (
    <>
      <h3>Posts</h3>
      <ul className="post-list">
        {posts?.map((post) => {
          return <PostListItem post={post} key={post.id} />;
        })}
      </ul>
    </>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PostList;
