export function fetchProducts() {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json()
        resolve({ data })
    })
}
export function fetchProductsFilter(filter) {

    /* here why we used for in loop : because filter : ek object aa raha hain jisme key and value ain :
       -> agar key and value mujhe extract karna hain from filter object or any object : i want separate key and value : to mujhe for in loop ka use karna padega :

   */
    let queryString = "";

    //! for loop lagane ka main mahatv ek proper object ki key and value ko access kar sake isliey 
    for (let key in filter) {
        queryString += `${key}=${filter[key]}&`
    }


    console.log("current", filter);

    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8080/products?` + queryString);
        const data = await response.json()
        resolve({ data })
    })
}   