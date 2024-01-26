export function fetchProducts() {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json()
        resolve({ data })
    })
}
export function fetchProductsFilter(filter, sort, pagination) {
    // filter={"category":"smartphone"}
    // console.log(filter)
    let queryString = "";
    for (let key in filter) {   
        console.log(filter[key])
        const categoryValue = filter[key]
        if (categoryValue.length > 0) {
            const lastCategoryValue = categoryValue[categoryValue.length - 1]
            queryString += `${key}=${lastCategoryValue}&`
        }

    }

    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`
    }
    console.log("queryString",queryString)  


    // console.log("before",queryString)
    for (let key in pagination) {
         queryString += `${key}=${pagination[key]}&`
    }
    // console.log( "pagination",pagination,queryString)
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8080/products?` + queryString);
        const data = await response.json()
        resolve({ data })
    })
}