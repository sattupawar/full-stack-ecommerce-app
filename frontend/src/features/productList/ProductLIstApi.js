export function fetchProducts() {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json()
        resolve({ data })
    })
}
export function fetchProductsFilter(filter, sort, pagination) {

    /* here why we used for in loop : because filter : ek object aa raha hain jisme key and value ain :
       -> agar key and value mujhe extract karna hain from filter object or any object : i want separate key and value : to mujhe for in loop ka use karna padega :

   */
    let queryString = "";

    //! for loop lagane ka main mahatv ek proper object ki key and value ko access kar sake isliey 
    //! Todo : on server  we will support multiple values :

    // lastCategoryValues :
    // filter={"category":["smartphones","laptops"]}
    // sort={_sort:"price",_order:"desc"}
    // pagination={_page:1,_limit:10}
    for (let key in filter) {
        const categoryValues = filter[key]
        if (categoryValues.length) {
            const lastCategoryValues = categoryValues[categoryValues.length - 1];
            queryString += `${key}=${lastCategoryValues}&`
        }

    }


    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`
    }
    for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`
    }
    console.log(queryString)

    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8080/products?` + queryString);
        const data = await response.json();
        // json server hame ek count provide karta hain in headers : jisme api me total kitne objects hain uska count aata hain  :
        const totalItems = await response.headers.get("X-Total-Count")
        resolve({ data: { products: data, totalItems: +totalItems } })
    })
}

export function fetchAllProductCategory() {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/category");
        const data = await response.json()
        resolve({ data })
    })
}
export function fetchAllProductBrands() {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/brands");
        const data = await response.json()
        resolve({ data })
    })
}
export function fetchProductsbyId(id) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/products/" + id);
        const data = await response.json()
        resolve({ data })
    })
}