const axios = require("axios");
const cache = require("./cache");
const Member = require("./models/Member");

module.exports = {

  fixArr: arr => {
    let fixedArr = [...arr];
    let membersToFix = [];

    arr.forEach((member, idx) => {
      const regexImg = /^https:\/\/www.mediasmart.io\S*(.jpg|.png)$/;
      const defaultImgProfile = "http://localhost:5000/defaultUserImage.png";
      let memberToFix = [member.id];
      if (!regexImg.test(member.image)) {
        fixedArr[idx].image = defaultImgProfile;
        memberToFix.push("image");
      }
      if (typeof member.name !== "string") {
        fixedArr[idx].name = `Missing name. id: ${member.id}`;
        memberToFix.push("name");
      }
      if (typeof member.bio !== "string") {
        fixedArr[idx].bio = `Missing biography`;
        memberToFix.push("bio");
      }
      if (typeof member.age !== "number") {
        fixedArr[idx].age = `Missing age`;
        memberToFix.push("age");
      }
      return memberToFix.length > 1 ? membersToFix.push(memberToFix) : null;
    });
    if (membersToFix.length > 0) {
      console.log(
        "Warning!! There´s some data wrong. Follow the reference error table: "
      );
      console.table(membersToFix);
    }

    return fixedArr;
  },


  updateCache: (page, membersBuffer, fixArrFn) => {
    Member.find()
      .limit(membersBuffer)
      .skip(page)
      .then(response => {
        if (response.length > 0) {
          cache.del(page);
          cache.set(page, response);
          return;
        } else {
          axios
            .get(
              `http://work.mediasmart.io?page=${page}&page_size=${membersBuffer}`,
              { headers: { authorization: process.env.API_KEY } }
            )
            .then(response => {
              if (response.data.length > 0) {
                let fixedMembers = fixArrFn(response.data);
                cache.set(page, fixedMembers);
                response.data.forEach((member, idx) => {
                  fixedMembers[idx]._id = member.id;
                });
                Member.collection.drop();
                Member.collection.insertMany(fixedMembers);
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  },


  updateDBandCache: async function(page, membersBuffer, fixArrFn) {
    console.log("updating db & cache");
    return axios
      .get(
        `http://work.mediasmart.io?page=${page}&page_size=${membersBuffer}`,
        { headers: { authorization: process.env.API_KEY } }
      )
      .then(response => {
        if (response.data && response.data.length > 0) {
          if (page === 0) {
            Member.collection.drop();
          }
          let fixedResponseArr = fixArrFn(response.data);
          let fixedResponseArrToCache = fixedResponseArr.slice(0, 120);
          cache.set(page, fixedResponseArrToCache);
          response.data.forEach((member, idx) => {
            fixedResponseArr[idx]._id = member.id;
          });
          Member.collection.insertMany(fixedResponseArr);
          return fixedResponseArr;
        } 
      })
      .catch(err => console.log("WARNING! Api error: ", err));
  },

  
  seedDB: async function(page, membersBuffer, fixArrFn, updateDBandCacheFn) {
    let promise = updateDBandCacheFn(page, membersBuffer, fixArrFn);
    let result = await promise;
    let nextPage = page;

    while (result.length === membersBuffer) {
      result = [];
      nextPage += 1;
      promise = updateDBandCacheFn(nextPage, membersBuffer, fixArrFn);
      result = await promise;
    }
    Member.find()
    .limit(membersBuffer)
    .skip(page)
    .then(response => {
       return response
    })
    .catch(err=> console.log(err))
  }

};  