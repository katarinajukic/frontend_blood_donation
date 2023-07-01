import http from "../common/http-common";
import authHeader from "../common/authHeader";

class DonationDataService {
  getAll(userId) {
    return http.get(`/donations?userId=${userId}`, { headers: authHeader() });
  }
  
  create(userId, data) {
    return http.post(`/donations?userId=${userId}`, data, { headers: authHeader() });
  }
  

  delete(id) {
    return http.delete(`/donations/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/donations`, { headers: authHeader() });
  }

}

const donationDataService = new DonationDataService();
export default donationDataService;
