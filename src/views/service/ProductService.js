import axios from 'axios';

export const ProductService = {
  async getProductsData() {
    try {
      const response = await axios.get('http://localhost:8080/meal-configuration/meal/all');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  
  // Other methods...



   

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};

