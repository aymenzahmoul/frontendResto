import axios from 'axios';

const BASE_URL = 'http://localhost:8080/panier-resources';

class PanierService {
  addItemToPanier(panierId, mealId, quantity) {
    return axios.post(`${BASE_URL}/AddItem/${panierId}/items`, null, {
      params: {
        mealId,
        quantity
      }
    })
      .then(response => {
        console.log('Item added to panier');
      })
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  removeItemFromPanier(panierId, panierItemId) {
    return axios.delete(`${BASE_URL}/RemoveItem/${panierId}/items/${panierItemId}`)
      .then(response => {
        console.log('Item removed from panier');
      })
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  clearPanier(panierId) {
    return axios.delete(`${BASE_URL}/Clear/${panierId}`)
      .then(response => {
        console.log('Panier cleared');
      })
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  getPanierById(panierId) {
    return axios.get(`${BASE_URL}/GetByiD/${panierId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  getPanierItems(panierId) {
    return axios.get(`${BASE_URL}/${panierId}/items`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }
}

export default PanierService;
