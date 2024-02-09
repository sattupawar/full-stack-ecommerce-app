export function addToOrder(order) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/orders", {
            method: "POST",
            body: JSON.stringify(order),
            headers: { "content-type": "application/json" }
        });
        const data = await response.json()

        // ! Todo : on server it will only return relavent informtation  of user (not store the user password)
        resolve({ data })
    })
}



export function fetchAllOrders({ pagination }) {


    let queryString = "";

    for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`
    }
    console.log(queryString)

    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8080/orders?` + queryString);
        const data = await response.json();
        // json server hame ek count provide karta hain in headers : jisme api me total kitne objects hain uska count aata hain  :
        const totalItems = await response.headers.get("X-Total-Count")
        resolve({ data: { orders: data, totalOrders: +totalItems } })


    })
}