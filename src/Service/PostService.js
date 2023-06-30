import axios from 'axios';

const BASE_URL = 'http://localhost:8080/post-configuration';

class PostService {
  likePost(id) {
    return axios.put(`${BASE_URL}/post/LikePost/${id}/like`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  dislikePost(id) {
    return axios.put(`${BASE_URL}/post/DislikePost/${id}/dislike`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  getPostsByRestaurantId(restaurantId) {
    return axios.get(`${BASE_URL}/post/GetPostByRestaurantId/${restaurantId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  getAllPosts() {
    return axios.get(`${BASE_URL}/post/GetAllPost`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }
}

export default PostService;
