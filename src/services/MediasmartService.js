import axios from 'axios';

class MediasmartService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5000/api'
    });
  }

  members = (page, size) => {
    return this.service.get(`/members/${page}`)
    .then( response => response.data) 
    .catch( err => console.log(err))
  }
  member = (id) => {
    return this.service.get(`/members/member/${id}`)
    .then( response => response.data) 
    .catch( err => console.log(err))
  }

}

export default MediasmartService;