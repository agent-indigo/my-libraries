class CORS_Anywhere {
    // Make an HTTP GET Request
    async get(url) {
        try {
            const response = await fetch(`http://localhost:8080/${url}`, {
                headers: {
                    'Origin': 'http://localhost:5500'
                }
            })
            const data = await response.json()
            return data
        } catch (error) {
            return console.error('Error encountered while retrieving:', error)
        }
    }
    // Make an HTTP POST Request
    async post(url, data) {
        try {
            const response = await fetch(`http://localhost:8080/${url}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Origin': 'http://localhost:5500'
                },
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
            return responseData
        } catch(error) {
            return console.error('Error encountered while posting:', error)
        }
    }
    // Make an HTTP PUT Request
    async put(url, data) {
        try {
            const response = await fetch(`http://localhost:8080/${url}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Origin': 'http://localhost:5050'
                },
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
            return responseData
        } catch(error) {
            return console.error('Error encountered while updating:', error)
        }
    }
    // Make an HTTP DELETE Request
    async delete(url) {
        try {
            await fetch(`http://localhost:8080/${url}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Origin': 'http://localhost:5500'
                }
            })
            return 'Deleted!'
        } catch(error) {
            return console.error('Error encountered while deleting:', error)
        }
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new CORS_Anywhere()