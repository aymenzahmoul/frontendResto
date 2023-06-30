import axios from 'axios';

const BASE_URL = 'http://localhost:8080/restaurant-configuration';

class RestaurantService {
  getRestaurantById(restaurantId) {
    return axios.get(`${BASE_URL}/restaurant/getRestaurantById/${restaurantId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  getAllRestaurants() {
    return axios.get(`${BASE_URL}/restaurants/all`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  searchRestaurants(keyword) {
    return axios.get(`${BASE_URL}/search`, { params: { keyword } })
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }
}

export default RestaurantService;
