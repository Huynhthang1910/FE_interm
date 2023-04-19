const tokenTaken = sessionStorage.getItem("token");

export const AvatarData = async () => {
    return fetch('https://be-intern.onrender.com/api/v2/employee/information', {
        headers: {
            Authorization: `Bearer ${tokenTaken}`, // Add the token as a bearer token
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => { data = 2 })
};