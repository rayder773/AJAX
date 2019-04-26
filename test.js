

const URL = "https://test-users-api.herokuapp.com/";

let users = [];

const promise = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const getUsers = async () => {
   
        const response = await promise.get("users/");
        users = response.data.data;
        console.log(users);
        

    
}

getUsers();