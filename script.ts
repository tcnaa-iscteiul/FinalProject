//Menu elements
const hamburger: HTMLElement = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu: HTMLElement = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item: NodeListOf<HTMLElement> = document.querySelectorAll('.header .nav-bar .nav-list ul li a href');
const header: HTMLElement = document.querySelector('.header.container');
const topBarElements: NodeListOf<HTMLElement> = document.querySelectorAll('.nav__link')
const menu: HTMLElement = document.querySelector('.all-menu');
//Register new user elements
const registerBtn: HTMLElement = document.getElementById("RegisterBtn");
const loginBtn: HTMLElement = document.getElementById("LoginBtn");
const registerForm: HTMLElement = document.getElementById("RegisterUser");
const loginForm: HTMLElement = document.getElementById("LogIn");
// DOM Elements for the register form
const nameInput: HTMLInputElement = registerForm["name"];
const phoneInput: any = registerForm["phoneNumber"];
const emailInput: any = registerForm["email"];
const passInput: any = registerForm["password"];
const confirmPassInput: any = registerForm["confirm_password"];
const address: any = registerForm["address"];
const validatePassword: any = document.getElementById('message');
// DOM Elements for the login
const logInForm: HTMLElement = document.getElementById("LogIn");
const usernameInput: any = logInForm["username"];
const passwordInput: any = logInForm["pass"];
const services = document.getElementById('services');
//DOM Elements for the Schedule section
const scheduleSection: HTMLElement = document.querySelector('.service-bottom');
const price: HTMLElement = document.querySelector('.price');
const btnClose: HTMLElement = document.getElementById('LogOut');
const orderBtn: HTMLElement = document.getElementById('orderButton');

//Menu 
hamburger.addEventListener('click', (): void => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', (e: Event): void => {
    e.preventDefault();
    let scroll_position = window.scrollY;
    if (scroll_position > 250) {
        header.style.backgroundColor = '#29323c';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});

menu_item.forEach((item): void => {
    item.addEventListener('click', (e: Event): void => {
        e.preventDefault();
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
    });
});


topBarElements.forEach((item): void => {
    item.addEventListener('click', (e: Event) => {
        e.preventDefault();
        let element = e.target as HTMLElement;
        if (element.classList.contains('nav__link')) {
            const id = element.getAttribute('href');
            document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
        }
    })
});


//Feed the menu section with plates
type Plate = {
    Name: string,
    Day: string,
    Type: string,
    Price: number,
    img: string
}
let plates: Plate[] = [
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
]

//Display the plates on the menu section
const displayDishes = (plates): void => {
    menu.innerHTML = '';

    plates.forEach(z => {
        const type: string = z.Type === 'Meat' ? '<img src="meat.svg" alt="meat" style="color:CornflowerBlue;width:60px;" />' : '<img src="fish.svg" alt="fish" style="color:CornflowerBlue;width:70px;" />';
        const html: string = `
        
      <div class="menu-item">
        <div class="menu-info">

           
           <h1>${z.Day}</h1> 
           <h2>${type}</h2>
           <h2>${z.Name}</h2>
           <p>Price: ${z.Price} &euro;</p>
        </div>
            <div class="menu-img">    
                <img src=${z.img} alt="img">
            </div>       
      </div>
    `;
        menu.insertAdjacentHTML('beforeend', html);
    });
}

displayDishes(plates);

//Register new user
//Shows the fields of the login and hide the fields of the register
loginBtn.addEventListener("click", (e: Event): void => {
    e.preventDefault();
    registerForm.classList.add('formContainer');
    loginForm.classList.remove('formContainer');
})
//Shows the fields of the registerForm and hide the fields of the login
registerBtn.addEventListener("click", (e: Event): void => {
    e.preventDefault();
    loginForm.classList.add('formContainer');
    registerForm.classList.remove('formContainer');
})


type User = { name: string, phone: string, email: string, password: string, address: string };
const users: User[] = JSON.parse(localStorage.getItem("users")) || [];//get users from localStorage or initialize with an empty array
//register the new user in the local storage
const registerNewUser = (user: User): void => {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
};

const verifyPassword = (): boolean => {
    const strongPassword: RegExp = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    if (passInput.value != confirmPassInput.value) {//verify if the passwordInput and the confirmPassword Input has the same text
        validatePassword.style.color = 'red';
        validatePassword.innerHTML = 'not matching';
        return false;
    }
    else if (!strongPassword.test(passInput.value)) {//check if the password the strenth of the password
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
}

const validateForm = (): boolean => {
    //Validate name
    const regex: RegExp = /^[a-zA-Z\s]+$/;
    if (regex.test(nameInput.value) === false) {
        alert("Please enter a valid name")
        return false;
    }
    //Validate email
    const regexEmail: RegExp = /^\S+@\S+\.\S+$/;
    if (regexEmail.test(emailInput.value) === false) {
        alert("Please enter a valid email address");
        return false;
    }
    //Validate phoneNumber
    const regexPhone: RegExp = /^[1-9]\d{8}$/;
    if (regexPhone.test(phoneInput.value) === false) {
        alert("Please enter a valid 9 digit mobile number");
        return false;
    }
    return true;
}

// Verify is already exists and user on the local storage with the same phone number or the same e-mail
const checkIfUserExists = (phoneNumber: string, email: string): User => {
    const verifyUser: User[] = (users.filter(x => x.email == email || x.phone == phoneNumber));
    return (verifyUser.length != 0) ? verifyUser[0] : null;
}

registerForm.onsubmit = (e: Event): void => {
    e.preventDefault();
    let user: User = {
        name: nameInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        password: passInput.value,
        address: address.value
    };
    const message: string = "It is not possible to register the user, since already exist an user with this phoneNumber or email";
    if (checkIfUserExists(user.phone, user.email) != null) {
        alert(message);
    }
    else if (verifyPassword() && validateForm()) {
        registerNewUser(user);
        alert("Sign up completed successfully!");
        nameInput.value = phoneInput.value = emailInput.value = passInput.value = confirmPassInput.value = address.value = "";//clean the values
    }
};

//LogIn

let activeUser: User = JSON.parse(localStorage.getItem("activeUser")) || null;//get Items for the local storage

logInForm.onsubmit = (e: Event): void => {
    activeUser = (checkIfUserExists("", usernameInput.value));//check if exists any user with the e-mail inserted
    if (checkIfUserExists("", usernameInput.value) != null && activeUser?.password === passwordInput.value) {//if user exists and the password inserted match with the password on the local storage
        alert("Welcome back");
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        services.classList.remove('formContainer');
    }
    else {
        alert("Verify the username and/or the password!")
        passwordInput.value = "";
    }
    usernameInput.value = passwordInput.value = "";
}

activeUser ? services.classList.remove('formContainer') : services.classList.add('formContainer');


//Schedule section
type Orders = {
    user: User,
    order: Plate[]
}
let order: Plate[] = []; //array with the plates
let user: User;
const orders: Orders[] = JSON.parse(localStorage.getItem("orders")) || [];//get orders items for the local storage
//calculates the total price and create a div where the total price is updated
const totalPrice = (order): void => {
    let total: number = order.length != 0 ? order.reduce((acc, cur, i) => acc + cur.Price, 0) : 0;//calculate the total price
    const html: string = `
            <h1 class="section-title" id="total">Tota<span>l: ${total}</span></h1>
        `;
    const element: HTMLElement = document.getElementById('total');
    if (element != null) element.remove();
    price.insertAdjacentHTML('beforeend', html);
};
const orderNow = (plates): void => {
    scheduleSection.innerHTML = '';

    plates.forEach(x => {
        //Inserts a div for each plate on the plates array
        const html: string = `
      <div class="service-item">
        <input type = "checkbox" class = "selectDishes" id=${plates.indexOf(x)} name = "${x.Name}">
        <h2><p>${x.Day}</p></h2>
        <h2>${x.Name}</h2>
        <p>Price: ${x.Price} &euro;</p>
        <p><img src=${x.img} alt="img"></p>
      </div>
    `;

        scheduleSection.insertAdjacentHTML('beforeend', html);
    });
    totalPrice(order);
};
orderNow(plates);
const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.selectDishes');

btnClose.addEventListener('click', (e: Event): void => {
    e.preventDefault();
    activeUser = null;//Set activeUser as null
    services.classList.add('formContainer');
    localStorage.setItem("activeUser", JSON.stringify(activeUser));//Set activeUser on the local Storage as null
});


//register a new order
const registerNewOrder = (user: User, selectedItems: Plate[]): Orders[] => {
    if (orders.length != 0 && orders.filter(x => x.user.email == user.email)) {
        (orders.filter(x => {
            if (x.user.email === user.email) {
                x.order = [];
                selectedItems.forEach(y => x.order.push(y))
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

    let o: Orders[] = orders.filter(x => {
        if (x.user.email === activeUser.email)
            return x;
    });
    if (o.length != 0)
        [{ user, order }] = o;

    //Take the values of the array order and checks the checkboxes
    if (user != null) {

        if (user.email === activeUser.email) {
            order.forEach(x => {
                checkboxes.forEach(y => {
                    let plate: Plate = plates[Number(y.getAttribute('id'))];

                    if (x.Name === plate.Name && x.Day === plate.Day && x.Price === plate.Price)
                        y.checked = true;
                });
            });
        }
        totalPrice(order);
    }
}


//Take the checkboxes that are checked and push the values to order;
checkboxes.forEach((checkbox): void => {
    checkbox.addEventListener('change', (): void => {
        (checkbox.checked) ? order.push(plates[checkbox.id] as Plate) : order.pop();
        totalPrice(order);
    });
});

orderBtn.addEventListener('click', (e: Event): void => {
    e.preventDefault();
    localStorage.setItem("orders", JSON.stringify(registerNewOrder(activeUser, order)));
});