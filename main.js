const API = 'https://test-users-api.herokuapp.com/';

const promise = axios.create({
  baseURL: API,
  headers: {
      'Content-Type': 'application/json'
  }
});

const getUsers = async () => {
  try {
    const res = await promise.get('users/');
    return res.data.data;

  } catch(err) {
    console.log('Couldn`t get users');
  }
}

const createUser = async () => {
  const name = document.querySelector('#name').value;
  const age = document.querySelector('#age').value;
  const user = {name, age};
  
  try {
    const res = await promise.post('users/', user);
  } catch(err) {
    console.log('Couldn`t POST user');
  }
  render();
}

const deleteUser = async (user, userCard) => {
  console.log(user);
  
  const res = await promise.delete(`users/${user.id}`);
  console.log(res);
  
  userCard.remove();
  render();
}

const render = async () => {
  const users = await getUsers();
  const usersList = document.querySelector('.users');
  usersList.innerHTML = '';
  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.classList.add('user');
    userCard.innerHTML = `
      Name: ${user.name} <span class='age'>Age: ${user.age}<span>
    `
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = '';
    removeBtn.addEventListener('click', () => {
      deleteUser(user, userCard);
    });
    userCard.append(removeBtn);
    usersList.append(userCard);
    
  });
  
}

document.addEventListener('DOMContentLoaded', () => {
  render();
  // const loadBtn = document.querySelector('.load-btn');
  // loadBtn.addEventListener('click', () => {
  //   render();
  // })
  const createBtn = document.querySelector('#create-btn'); 
  createBtn.addEventListener('click', () => {
    createUser();
  })
})


// const loadUsers = async () => {
//   users = await getUsers();
//   renderUsers()
// }

// const getUsers = async () => {
//   const response = await promise.get("users/");
//   return users = response.data.data;
// };

// const deleteUser = async (userId, userElement) => {
//   try {
//     const res = await fetch(API + 'users/' + userId, {method: 'DELETE'});
//     if (res.status !== 200) throw new Error();
//     users = users.filter((item) => item.id !== userId);
//     userElement.remove();
//   } catch(err) {
//     console.log('couldnt delete user', err);
//   }
// }

// const renderUsers = () => {
//   const container = document.querySelector('.users');

//   container.innerHTML = '';

//   users.forEach(item => {
//     const userElement = document.createElement('div');
//     userElement.classList.add('user');
//     userElement.innerHTML = `
//       <h4>${item.name}</h4>
//       <h5>${item.email}</h5>
//     `;
//     const removeBtn = document.createElement('button');
//     removeBtn.classList.add('user__remove');
//     removeBtn.textContent = 'X';
//     removeBtn.addEventListener('click', () => {
//       deleteUser(item.id, userElement)
//     });

//     userElement.append(removeBtn);
//     container.append(userElement);
//   });
// }


// const createUser = async () => {
//   const name = document.querySelector('#name').value;
//   const age = document.querySelector('#email').value;
//   const user = {name, age};

//   const res = await promise.post("users/", user);

//   console.log(res);
  
  
//   if (res.data.status >= 200 && res.data.status < 300) {
//     getUsers();
//     renderUsers();
   
// }

//   // fetch(API + 'users', {
//   //   method: 'POST',
//   //   body: JSON.stringify({name: name, email: email})
//   // }).then(res => {
//   //   return res.json();
//   // }).then(({id}) => {
//   //   const user = {
//   //     name,
//   //     email,
//   //     id
//   //   };
//     // users.unshift(user)
//     renderUsers();
//   // })
//   // .catch(err => {
//   //   console.log('couldnt create a user', err);
//   // })

// }

// document.addEventListener('DOMContentLoaded', () => {
//   const loadBtn = document.querySelector('.load-users')
//   loadBtn.addEventListener('click', loadUsers);

//   const createUserBtn = document.querySelector('#create-user-btn')
//   createUserBtn.addEventListener('click', createUser);
// });