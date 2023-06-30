import axios from 'axios';

const BASE_URL = 'http://localhost:8080/meal-configuration';

class MealService {
  getMealById(mealId) {
    return axios.get(`${BASE_URL}/meal/getById/${mealId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  getMealsByCategory(categoryId) {
    return axios.get(`${BASE_URL}/byCategory/${categoryId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  createMeal(mealData) {
    return axios.post(`${BASE_URL}/meal/create`, mealData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  updateMealById(mealId, mealData) {
    return axios.put(`${BASE_URL}/meal/update/${mealId}`, mealData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  deleteMealById(mealId) {
    return axios.delete(`${BASE_URL}/meal/delete/${mealId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }
}

export default MealService;