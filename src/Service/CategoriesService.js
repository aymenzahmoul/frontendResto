import axios from 'axios';

const BASE_URL = 'http://localhost:8080/category-configuration';

class CategoriesService {
  getCategoryById(categoryId) {
    return axios.get(`${BASE_URL}/category/getById/${categoryId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  getAllCategories() {
    return axios.get(`${BASE_URL}/category/all`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  getCategoriesByRestaurantId(restaurantId) {
    return axios.get(`${BASE_URL}/restaurant/${restaurantId}/categories`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  createCategory(name, image, restaurantId) {
    const categoryData = { name, image, restaurantId };
    return axios.post(`${BASE_URL}/category/create`, categoryData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }
  updateCategory(categoryId, updatedData) {
    return axios.put(`${BASE_URL}/category/update/${categoryId}`, updatedData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }
}

export default CategoriesService;
