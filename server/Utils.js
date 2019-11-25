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
        "Warning!! There´s some members wrong. Follow the reference error table: "
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

    //   axios.get(`http://work.mediasmart.io?page=${page}&page_size=${membersBuffer}`, {headers: {authorization:"mediasmart2019"}})
    // .then(response => {
    //   if (response.data) {
    //     cache.del(cache.page);
    //     const fixedMembers = fixArrFn(response.data);
    //     cache.set(page, fixedMembers);
    //     return fixedMembers;
    //   }
    //   const cacheNotUpdated = cache.get(cache.page);
    //   cache.del(cache.page);
    //   cache.set(page, cacheNotUpdated);
    //   console.log("Api din´t answer");
    //   return "WARNING - SERVER ERROR"
    // })
    // .catch(err => console.log(err))
    // }
  },


  updateDBandCache: async function(page, membersBuffer, fixArrFn) {
    console.log("updating db");
    return axios
      .get(
        `http://work.mediasmart.io?page=${page}&page_size=${membersBuffer}`,
        { headers: { authorization: process.env.API_KEY } }
      )
      .then(response => {
        console.log("response from api", response.data.length);

        if (response.data && response.data.length > 0) {
          console.log("collection is dropping", response.data.length);
          if( page === 0 ) {
            Member.collection.drop();
            console.log("collection dropped");
          }
          let fixedResponseArr = fixArrFn(response.data);
          let fixedResponseArrToCache = fixedResponseArr.slice(0, 120);
          cache.set(page, fixedResponseArrToCache);
          response.data.forEach((member, idx) => {
            fixedResponseArr[idx]._id = member.id;
          });
          console.log("ready to insert in mongo", fixedResponseArr.length);
          Member.collection.insertMany(fixedResponseArr);
          console.log("inserted. conclude", fixedResponseArr.length);
          return fixedResponseArr;
        }
        else {
          return;
        }
      })
      .catch(err => console.log(err));
  },




seedDB: async function (page, membersBuffer, fixArrFn, updateDBFn) {
  console.log("fire async")
    let promise = updateDBFn( page, membersBuffer, fixArrFn)
    let result = await promise;
    let nextPage = page;
    while(result.length > 0 && result.length === membersBuffer) {
      console.log("db actualizada y resulta mas de 120. sigue")
      result = [];
      nextPage += 1;
      promise = updateDBFn( nextPage, membersBuffer, fixArrFn);
      result = await promise;
      console.log("result actualizado recursivo", result.length)
    }  
}
};
