var _a;
//Menu elements
var hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
var mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
var menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a href');
var header = document.querySelector('.header.container');
var topBarElements = document.querySelectorAll('.nav__link');
var menu = document.querySelector('.all-menu');
//Register new user elements
var registerBtn = document.getElementById("RegisterBtn");
var loginBtn = document.getElementById("LoginBtn");
var registerForm = document.getElementById("RegisterUser");
var loginForm = document.getElementById("LogIn");
// DOM Elements for the register form
var nameInput = registerForm["name"];
var phoneInput = registerForm["phoneNumber"];
var emailInput = registerForm["email"];
var passInput = registerForm["password"];
var confirmPassInput = registerForm["confirm_password"];
var address = registerForm["address"];
var validatePassword = document.getElementById('message');
// DOM Elements for the login
var logInForm = document.getElementById("LogIn");
var usernameInput = logInForm["username"];
var passwordInput = logInForm["pass"];
var services = document.getElementById('services');
//DOM Elements for the Schedule section
var scheduleSection = document.querySelector('.service-bottom');
var price = document.querySelector('.price');
var btnClose = document.getElementById('LogOut');
var orderBtn = document.getElementById('orderButton');
//Menu 
hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});
document.addEventListener('scroll', function (e) {
    e.preventDefault();
    var scroll_position = window.scrollY;
    if (scroll_position > 250) {
        header.style.backgroundColor = '#29323c';
    }
    else {
        header.style.backgroundColor = 'transparent';
    }
});
menu_item.forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
    });
});
topBarElements.forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        var element = e.target;
        if (element.classList.contains('nav__link')) {
            var id = element.getAttribute('href');
            document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
        }
    });
});
var plates = [
    {
        Name: "Salmon",
        Day: "Monday",
        Type: "Fish",
        Price: 8,
        img: "https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_960_720.jpg"
    },
    {
        Name: "Lasagna",
        Day: "Monday",
        Type: "Meat",
        Price: 7,
        img: "https://cdn.pixabay.com/photo/2016/12/11/22/41/lasagna-1900529_960_720.jpg"
    },
    {
        Name: "Sardines",
        Day: "Tuesday",
        Type: "Fish",
        Price: 6,
        img: "https://cdn.pixabay.com/photo/2016/06/30/18/49/sardines-1489626_960_720.jpg"
    },
    {
        Name: "Chicken",
        Day: "Tuesday",
        Type: "Meat",
        Price: 5,
        img: "https://cdn.pixabay.com/photo/2016/11/18/17/42/barbecue-1836053_960_720.jpg"
    },
    {
        Name: "Fish And Chips",
        Day: "Wednesday",
        Type: "Fish",
        Price: 5,
        img: "https://cdn.pixabay.com/photo/2019/11/05/00/07/fish-and-chips-4602434_960_720.jpg"
    },
    {
        Name: "Hamburguer",
        Day: "Wednesday",
        Type: "Meat",
        Price: 4,
        img: "https://cdn.pixabay.com/photo/2016/03/05/19/37/appetite-1238459_960_720.jpg"
    },
    {
        Name: "Sushi",
        Day: "Thursday",
        Type: "Fish",
        Price: 10,
        img: "https://cdn.pixabay.com/photo/2016/11/25/16/08/sushi-1858696_960_720.jpg"
    },
    {
        Name: "Spaghetti bolognese",
        Day: "Thursday",
        Type: "Meat",
        Price: 7,
        img: "https://image.freepik.com/free-photo/plate-basil-cherry-gourmet-menu_1220-1184.jpg"
    },
    {
        Name: "Chicken",
        Day: "Friday",
        Type: "Meat",
        Price: 6,
        img: "https://cdn.pixabay.com/photo/2016/11/18/17/42/barbecue-1836053_960_720.jpg"
    },
    {
        Name: "Fish Soup",
        Day: "Friday",
        Type: "Fish",
        Price: 7,
        img: "https://cdn.pixabay.com/photo/2018/01/01/17/57/fish-soup-3054627_960_720.jpg"
    }
];
//Display the plates on the menu section
var displayDishes = function (plates) {
    menu.innerHTML = '';
    plates.forEach(function (z) {
        var type = z.Type === 'Meat' ? '<img src="meat.svg" alt="meat" style="color:CornflowerBlue;width:60px;" />' : '<img src="fish.svg" alt="fish" style="color:CornflowerBlue;width:70px;" />';
        var html = "\n        \n      <div class=\"menu-item\">\n        <div class=\"menu-info\">\n\n           \n           <h1>" + z.Day + "</h1> \n           <h2>" + type + "</h2>\n           <h2>" + z.Name + "</h2>\n           <p>Price: " + z.Price + " &euro;</p>\n        </div>\n            <div class=\"menu-img\">    \n                <img src=" + z.img + " alt=\"img\">\n            </div>       \n      </div>\n    ";
        menu.insertAdjacentHTML('beforeend', html);
    });
};
displayDishes(plates);
//Register new user
//Shows the fields of the login and hide the fields of the register
loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    registerForm.classList.add('formContainer');
    loginForm.classList.remove('formContainer');
});
//Shows the fields of the registerForm and hide the fields of the login
registerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.classList.add('formContainer');
    registerForm.classList.remove('formContainer');
});
var users = JSON.parse(localStorage.getItem("users")) || []; //get users from localStorage or initialize with an empty array
//register the new user in the local storage
var registerNewUser = function (user) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
};
var verifyPassword = function () {
    var strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    if (passInput.value != confirmPassInput.value) { //verify if the passwordInput and the confirmPassword Input has the same text
        validatePassword.style.color = 'red';
        validatePassword.innerHTML = 'not matching';
        return false;
    }
    else if (!strongPassword.test(passInput.value)) { //check if the password the strenth of the password
        alert("Password length must be greater than 8 characters \nPassword must contain at least one uppercase letter \nPassword must contain at least one special character !");
        passInput.value = "";
        confirmPassInput.value = "";
        return false;
    }
    else {
        validatePassword.style.color = 'green';
        validatePassword.innerHTML = 'matching';
        return true;
    }
};
var validateForm = function () {
    //Validate name
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(nameInput.value) === false) {
        alert("Please enter a valid name");
        return false;
    }
    //Validate email
    var regexEmail = /^\S+@\S+\.\S+$/;
    if (regexEmail.test(emailInput.value) === false) {
        alert("Please enter a valid email address");
        return false;
    }
    //Validate phoneNumber
    var regexPhone = /^[1-9]\d{8}$/;
    if (regexPhone.test(phoneInput.value) === false) {
        alert("Please enter a valid 9 digit mobile number");
        return false;
    }
    return true;
};
// Verify is already exists and user on the local storage with the same phone number or the same e-mail
var checkIfUserExists = function (phoneNumber, email) {
    var verifyUser = (users.filter(function (x) { return x.email == email || x.phone == phoneNumber; }));
    return (verifyUser.length != 0) ? verifyUser[0] : null;
};
registerForm.onsubmit = function (e) {
    e.preventDefault();
    var user = {
        name: nameInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        password: passInput.value,
        address: address.value
    };
    var message = "It is not possible to register the user, since already exist an user with this phoneNumber or email";
    if (checkIfUserExists(user.phone, user.email) != null) {
        alert(message);
    }
    else if (verifyPassword() && validateForm()) {
        registerNewUser(user);
        alert("Sign up completed successfully!");
        nameInput.value = phoneInput.value = emailInput.value = passInput.value = confirmPassInput.value = address.value = ""; //clean the values
    }
};
//LogIn
var activeUser = JSON.parse(localStorage.getItem("activeUser")) || null; //get Items for the local storage
logInForm.onsubmit = function (e) {
    activeUser = (checkIfUserExists("", usernameInput.value)); //check if exists any user with the e-mail inserted
    if (checkIfUserExists("", usernameInput.value) != null && (activeUser === null || activeUser === void 0 ? void 0 : activeUser.password) === passwordInput.value) { //if user exists and the password inserted match with the password on the local storage
        alert("Welcome back");
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        services.classList.remove('formContainer');
    }
    else {
        alert("Verify the username and/or the password!");
        passwordInput.value = "";
    }
    usernameInput.value = passwordInput.value = "";
};
activeUser ? services.classList.remove('formContainer') : services.classList.add('formContainer');
var order = []; //array with the plates
var user;
var orders = JSON.parse(localStorage.getItem("orders")) || []; //get orders items for the local storage
//calculates the total price and create a div where the total price is updated
var totalPrice = function (order) {
    var total = order.length != 0 ? order.reduce(function (acc, cur, i) { return acc + cur.Price; }, 0) : 0; //calculate the total price
    var html = "\n            <h1 class=\"section-title\" id=\"total\">Tota<span>l: " + total + "</span></h1>\n        ";
    var element = document.getElementById('total');
    if (element != null)
        element.remove();
    price.insertAdjacentHTML('beforeend', html);
};
var orderNow = function (plates) {
    scheduleSection.innerHTML = '';
    plates.forEach(function (x) {
        //Inserts a div for each plate on the plates array
        var html = "\n      <div class=\"service-item\">\n        <input type = \"checkbox\" class = \"selectDishes\" id=" + plates.indexOf(x) + " name = \"" + x.Name + "\">\n        <h2><p>" + x.Day + "</p></h2>\n        <h2>" + x.Name + "</h2>\n        <p>Price: " + x.Price + " &euro;</p>\n        <p><img src=" + x.img + " alt=\"img\"></p>\n      </div>\n    ";
        scheduleSection.insertAdjacentHTML('beforeend', html);
    });
    totalPrice(order);
};
orderNow(plates);
var checkboxes = document.querySelectorAll('.selectDishes');
btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    activeUser = null; //Set activeUser as null
    services.classList.add('formContainer');
    localStorage.setItem("activeUser", JSON.stringify(activeUser)); //Set activeUser on the local Storage as null
});
//register a new order
var registerNewOrder = function (user, selectedItems) {
    if (orders.length != 0 && orders.filter(function (x) { return x.user.email == user.email; })) {
        (orders.filter(function (x) {
            if (x.user.email === user.email) {
                x.order = [];
                selectedItems.forEach(function (y) { return x.order.push(y); });
            }
            else {
                orders.push({
                    user: user,
                    order: selectedItems
                });
            }
            return orders;
        }));
    }
    else {
        orders.push({
            user: user,
            order: selectedItems
        });
    }
    return orders;
};
if (orders.length != 0) {
    var o = orders.filter(function (x) {
        if (x.user.email === activeUser.email)
            return x;
    });
    if (o.length != 0)
        _a = o[0], user = _a.user, order = _a.order;
    //Take the values of the array order and checks the checkboxes
    if (user != null) {
        if (user.email === activeUser.email) {
            order.forEach(function (x) {
                checkboxes.forEach(function (y) {
                    var plate = plates[Number(y.getAttribute('id'))];
                    if (x.Name === plate.Name && x.Day === plate.Day && x.Price === plate.Price)
                        y.checked = true;
                });
            });
        }
        totalPrice(order);
    }
}
//Take the checkboxes that are checked and push the values to order;
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        (checkbox.checked) ? order.push(plates[checkbox.id]) : order.pop();
        totalPrice(order);
    });
});
orderBtn.addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.setItem("orders", JSON.stringify(registerNewOrder(activeUser, order)));
});
//# sourceMappingURL=script.js.map