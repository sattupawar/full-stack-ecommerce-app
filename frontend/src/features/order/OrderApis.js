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