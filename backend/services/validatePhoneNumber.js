const axios = require('axios');

const token = '7f1f48c7a3f7434697dfe92500cd7cbd';

const phoneVerification = {
  ValidatePhoneNumber: async (number) => {
    let results;
    try {
      results = await axios(
        `https://phonevalidation.abstractapi.com/v1/?api_key=${token}&phone=${number}`,
      );
      if (results?.status === 200) {
        
        return Promise.resolve(results.data);
      }
      return Promise.reject(results);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

module.exports = {
  phoneVerification,
};
