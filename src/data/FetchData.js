export const DataFetch = async () => {
    return fetch('https://be-intern.onrender.com/api/v2/employee/information', {
        // return fetch('https://jsonplaceholder.typicode.com/users/1', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJlbXBsb3llZUlkXCI6XCJOVi0yZjljNTRkOS01NTYyLTQxOTctYmNiZS1hZGU1YmM2M2ExM2NcIixcImFjY291bnRSb2xlXCI6XCJNYW5hZ2VyXCJ9IiwiZXhwIjoxNjgxMTE4OTYwfQ.d34YkuW8ZSlXcmmJMjOYn9iO3hu8SRwflDzApbG_MGMeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJlbXBsb3llZUlkXCI6XCJOVi0yZjljNTRkOS01NTYyLTQxOTctYmNiZS1hZGU1YmM2M2ExM2NcIixcImFjY291bnRSb2xlXCI6XCJNYW5hZ2VyXCJ9IiwiZXhwIjoxNjgxMTE2NzM4fQ.N1XYSCfAuR - BLo - 9WGclW1dUcvo - cwTGWjfpWEKM0wc'}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .catch(error => {
            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                // CORS error occurred
                console.error('CORS error:', error.message);
            } else {
                // Other error occurred
                console.error('Error:', error);
            }

            return { "dataError": "error" };

        });
};