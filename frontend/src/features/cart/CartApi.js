export function fetchCount(amount = 1) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080");
        const data = await response.json()
        resolve({ data })
    })
}
export function addToBasket(item) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/cart", {
            method: "POST",
            body: JSON.stringify(item),
            headers: { "content-type": "application/json" }
        });
        const data = await response.json()

        // ! Todo : on server it will only return relavent informtation  of user (not store the user password)
        resolve({ data })
    })
}

// yaha pe cart ko fetch karna hain par problem ye hain  ki according user k hisab se baset ke items show hone chaiye :
// to hum basket ko fetch karege but according user id k hisaaab se 
export function fetchBasketByUserId(userId) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/cart?user=" + userId);
        const data = await response.json()
        resolve({ data })
    })
}

export function updateBasket(update) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/cart/" + update.id, {
            method: "PATCH",
            body: JSON.stringify(update),
            headers: { "content-type": "application/json" }
        });
        const data = await response.json()

        // ! Todo : on server it will only return relavent informtation  of user (not store the user password)
        resolve({ data })
    })
}

export function deleteBasket(itemId) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/cart/" + itemId, {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        });
        const data = await response.json()

        // ! Todo : on server it will only return relavent informtation  of user (not store the user password)
        resolve({ data: { id: itemId } })
    })
}

export function deleteAllItemsInBasket(userid) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/cart?user=" + userid, {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        });
        const data = await response.json()

        // ! Todo : on server it will only return relavent informtation  of user (not store the user password)
        resolve({ data })
    })
}