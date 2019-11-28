import axios from 'axios';

class MediasmartService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5000/api'
    });
  }

  members = (page) => {
    return this.service.get(`/members/${page}`)
    .then( response => response.data) 
    .catch( err => console.log(err))
  }

}

export default MediasmartService;