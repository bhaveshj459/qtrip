import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
    // TODO: MODULE_ADVENTURES
    // 1. Extract the city id from the URL's Query Param and return it

    let city = search.slice(6);
    return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
    // TODO: MODULE_ADVENTURES
    // 1. Fetch adventures using the Backend API and return the data
    try {
        let urlA = config.backendEndpoint + "/adventures?city=" + city;

        const response = await fetch(urlA);
        const data = await response.json();


        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
    // TODO: MODULE_ADVENTURES
    // 1. Populate the Adventure Cards and insert those details into the DOM
    adventures.forEach(key => {
        let col1 = document.createElement("a");
        col1.setAttribute("class", "col-md-3 col-sm-6 m-2 adventure-detail-card");
        col1.setAttribute("id", key.id);
        col1.setAttribute("href", "detail/?adventure=" + key.id);

        let img = document.createElement("img");
        img.setAttribute("src", key.image);
        img.setAttribute("class", "activity-card-image");
        col1.appendChild(img);

        let category = document.createElement("div");
        category.setAttribute("class", "category-filter category-banner");
        category.innerHTML = key.category;
        col1.appendChild(category);

        let row = document.createElement("div");
        row.setAttribute("class", "row");
        let col2 = document.createElement("div");
        col2.setAttribute("class", "col-md-6");
        col2.innerHTML = key.name;
        row.appendChild(col2);

        let col3 = document.createElement("div");
        col3.setAttribute("class", "col-md-6");
        col3.innerHTML = "₹" + key.costPerHead;
        row.appendChild(col3);

        let col4 = document.createElement("div");
        col4.setAttribute("class", "col-md-6");
        col4.innerHTML = "Duration";
        row.appendChild(col4);

        let col5 = document.createElement("div");
        col5.setAttribute("class", "col-md-6");
        col5.innerHTML = key.duration;
        row.appendChild(col5);

        col1.appendChild(row);

        document.querySelector("#data").appendChild(col1);

    });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
    // TODO: MODULE_FILTERS
    // 1. Filter adventures based on Duration and return filtered list
    let newlist = [];
    list.forEach(likey => {
        if ((likey.duration <= high) && (likey.duration >= low)) {
            console.log(high, low);
            newlist.push(likey);
        }
    });
    return newlist;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
    // TODO: MODULE_FILTERS
    // 1. Filter adventures based on their Category and return filtered list
    let newlist = [];
    list.forEach(likey => {
        categoryList.forEach(catkey => {
            if (likey.category == catkey)
                newlist.push(likey);
        });
    });
    return newlist;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
    // TODO: MODULE_FILTERS
    // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
    // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

    if ((filters.category.length != 0) && (filters.duration != " ")) {

        let temp1 = filterByCategory(list, filters.category);
        let dur = filters.duration.split("-");
        return filterByDuration(temp1, dur[0], dur[1]);

    } else if (filters.category.length != 0) {

        return filterByCategory(list, filters.category);

    } else if (filters.duration) {
        let dur = filters.duration.split("-");
        return filterByDuration(list, dur[0], dur[1]);
    }



    // Place holder for functionality to work in the Stubs
    return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
    // TODO: MODULE_FILTERS
    // 1. Store the filters to localStorage using JSON.stringify()

    window.localStorage.setItem('filters', JSON.stringify(filters));

}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
    // TODO: MODULE_FILTERS
    // 1. Get the filters from localStorage and return in JSON format

    let filter = JSON.parse(window.localStorage.getItem('filters'));
    if (filter)
        return filter;

    // Place holder for functionality to work in the Stubs
    return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
    // TODO: MODULE_FILTERS
    // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
    if (filters.category) {
        filters.category.forEach(key => {
            let cate = document.createElement("div");
            cate.setAttribute("class", "category-filter filterpills");

            cate.innerHTML = key;
            document.querySelector("#category-list").appendChild(cate);
        });


    }


    if (filters.duration) {
        let cate = document.createElement("div");
        cate.setAttribute("class", "category-filter filterpills");

        cate.innerHTML = filters.duration;
        document.querySelector("#category-list").appendChild(cate);
    }




}


export {
    getCityFromURL,
    fetchAdventures,
    addAdventureToDOM,
    filterByDuration,
    filterByCategory,
    filterFunction,
    saveFiltersToLocalStorage,
    getFiltersFromLocalStorage,
    generateFilterPillsAndUpdateDOM,

};