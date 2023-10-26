
function login(username, password, callback) {
    // Define the login data
    const loginData = {
      username: username,
      password: password,
    };
  
    // Make a POST request to the login endpoint
    fetch('/account/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token for session-based authentication
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.status === 200) {
          // Authentication successful
          return response.json();
        } else if (response.status === 400) {
          // Handle invalid credentials
          return response.json();
        } else {
          throw new Error('An error occurred');
        }
      })
      .then((data) => {
        // Store user data in local storage, if needed
        if (data.user_id) {
          localStorage.setItem('user_id', data.user_id);
        }
        callback(null, data);
      })
      .catch((error) => {
        // Handle other server errors
        callback('An error occurred');
      });
  }

  function signup(username, password, callback) {
    // Create an object with user data
    const userData = {
        username: username,
        password: password,
    };

    // Make a POST request to the signup endpoint
    fetch('/account/signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token for session-based authentication
        },
        body: JSON.stringify(userData),
    })
    .then((response) => {
        if (response.status === 201) {
            // Signup successful
            callback(null);
        } else if (response.status === 400) {
            // Handle validation or user registration error
            return response.json();
        } else {
            throw new Error('An error occurred');
        }
    })
    .then((data) => {
        // Handle validation or user registration errors
        if (data) {
            callback(data); // Pass validation or registration error data to the callback
        }
    })
    .catch((error) => {
        // Handle other errors
        callback('An error occurred');
    });
}


  
function logout(callback) {
// Make a POST request to the logout endpoint
    fetch('/api/logout/', {
        method: 'POST',
        headers: {
        'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token for session-based authentication
        },
    })
        .then((response) => {
        if (response.status === 200) {
            // Logout successful
            callback(null);
        } else {
            throw new Error('An error occurred');
        }
        })
        .catch((error) => {
        // Handle errors
        callback('An error occurred');
        });
}
  // Function to get the CSRF token from cookies
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  
  
  
  // Function to find business accounts
  function findBusinessAccounts(latitude, longitude, maxRange, cuisineNames, callback) {
    // Define the search parameters
    let searchParams ;
    // console.log(cuisineNames,Array.isArray(cuisineNames) && cuisineNames.length == 0  )
    if((Array.isArray(cuisineNames) && cuisineNames.length == 0 )|| cuisineNames == undefined)
    {

         searchParams = {
            latitude: latitude,
            longitude: longitude,
            max_range: maxRange,
            // cuisine_name: cuisineNames.join(','), // Convert cuisine names to a comma-separated string
          };

    }
    else{
        
        searchParams = {
            latitude: latitude,
            longitude: longitude,
            max_range: maxRange,
            cuisine_name: cuisineNames.join(','), // Convert cuisine names to a comma-separated string
        };
    }
    
    // console.log(searchParams);
    // Make a GET request to the find business accounts endpoint
    fetch(`/business/find_business_accounts/?${new URLSearchParams(searchParams).toString()}`, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('An error occurred');
        }
      })
      .then((data) => {
        // Handle the retrieved data, which includes business accounts within the specified range
        callback(null, data);
      })
      .catch((error) => {
        // Handle errors
        callback(error, null);
      });
  }
  

   // Function to update HTML content based on response data
   function updateHTMLContent(data) {
    for (const key in data) {
        const value = data[key];
        if (typeof value === 'object') {
            // If the value is an object, handle it accordingly
            updateHTMLContent( value);
        } else {
            const element = document.querySelector(`.${key}`);
            if (element) {
                element.textContent = value;
            } else {
                console.log(`Variable ${key} not found in HTML.`);
            }
        }
        
    }
}

  
  
  
  
  
  
  

document.addEventListener('DOMContentLoaded', function () {
    // Check if the logout button is present on the page
    const logoutButton = document.querySelector('.btn-logout');
    
    if (logoutButton) {
        // If the logout button is found, add the login event listener
        logoutButton.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default form submission

            
            // Call the login function with the provided credentials
            logout( function (error, data) {
                if (error) {
                    // Handle login error here, e.g., display an error message
                    console.error('Login failed: ' + error);
                } else {
                    // Handle successful login
                   
                    window.location.href = '/';
                }
            });
        });
    }
});


function getUserDetails(callback) {
    // Make a GET request to the user details endpoint
    fetch('/account/user/details/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token for session-based authentication
        },
    })
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('An error occurred');
        }
    })
    .then((data) => {
        // Handle the retrieved user details
        callback(null, data);
    })
    .catch((error) => {
        // Handle errors
        callback(error, null);
    });
}
