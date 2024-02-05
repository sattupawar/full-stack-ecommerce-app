export function createUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/users", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "content-type": "application/json" }
        });
        const data = await response.json()

        // ! Todo : on server it will only return relavent informtation  of user (not store the user password)
        resolve({ data })
    })
}
export function checkUser(loginInfo) {

    const email = loginInfo.email;
    const password = loginInfo.password
    return new Promise(async (resolve, reject) => {
        const response = await fetch("http://localhost:8080/users?email=" + email);
        const data = await response.json()

        console.log("from authapis", data)
        // yahape data hain vo ek array return karega :
        if (data.length) {
            // check ki data aayah hain ya nahi agar aa gaya to also checki ki user ne password to sahi dala hain na :
            if (password == data[0].password) {
                resolve({ data: data[0] })

            } else {
                reject({ message: "password incorrect" })
            }

        } else {
            reject({ message: "user not found" })
        }
        // ! Todo : on server it will only return relavent informtation  of user (not store the user password)
    })
}