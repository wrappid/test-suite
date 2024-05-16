"use strict";
const axios = require('axios');
const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data;
        }
        else {
            console.error("Failed to fetch data. Status code:", response.status);
            return null;
        }
    }
    catch (error) {
        console.error("An error occurred:", error);
        return null;
    }
};
const url = "https://stageapi.rxefy.com/noauth/business/all/Routes?limit=2";
fetchData(url)
    .then((data) => {
    if (data) {
        console.log("Data fetched successfully:");
        console.log(JSON.stringify(data.data.rows, null, 2));
    }
})
    .catch((error) => {
    console.error("An error occurred while fetching data:", error);
});
//# sourceMappingURL=fetchData.js.map