let price = 2.5;
let quantity = 1;
let qurrentTime = '';
let time = 1
let discount = 1
let email
let currentUser = {}

if(JSON.parse(localStorage.getItem('user'))){
    document.getElementById('login').textContent = 'Logout'
    document.getElementById('username').textContent = JSON.parse(localStorage.getItem('user')).email
}

var firebaseConfig = {
    apiKey: "AIzaSyATjqB7LLGJUxEXQuj7bFJwqmgzIyQyiro",
    authDomain: "proxyseller-2d663.firebaseapp.com",
    databaseURL: "https://proxyseller-2d663.firebaseio.com",
    projectId: "proxyseller-2d663",
    storageBucket: "proxyseller-2d663.appspot.com",
    messagingSenderId: "37717530792",
    appId: "1:37717530792:web:a3931419b9cf3fb820ca9d",
    measurementId: "G-RMNDLWLNVC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let usersData = []
  fetchData()
 function  fetchData(){
    const events =  firebase.firestore().collection('users')
    events.get().then((querySnapshot) => {
         usersData = querySnapshot.docs.map((doc) => {
          return {...doc.data() }
        })
      })
  }

document.getElementById('quantityInput').addEventListener("input", qunatityPrice);
document.getElementById('priceOne').innerHTML = (price * 1).toFixed(2) +' USD'
document.getElementById('priceTwo').innerHTML = (price * 10).toFixed(2) +' USD'
document.getElementById('priceThree').innerHTML = (price * 25).toFixed(2) +' USD'
document.getElementById('priceFour').innerHTML = (price * 50).toFixed(2) +' USD'

Array.from(document.getElementsByClassName('timeSelect')).forEach(e => {
        e.addEventListener('change', function() {
            calculatePrice(e,this)
        })
    })

calculatePrice = (e, that) => {
            e.value = that.value
            qurrentTime = that.value
            time = that.value[0]
            discount = 1
            if(that.value.indexOf('12') !== -1){
                discount = 0.7
                time = 12
            }
            if(that.value.indexOf('6') !== -1) {
                discount = 0.8
            }
            quantity = e.id=='One'?1:e.id=='Two'?10:e.id=='Three'?25:e.id=='Four'?50:quantity;
            document.getElementById(`price${e.id}`).innerHTML = (time * price * quantity * discount).toFixed(2)+' USD'
}

function qunatityPrice(e) {
    if(this.value >1000000) this.value = quantity
    else quantity = this.value
    if(e == 1) {
        quantity = 1
        this.value = 1
        document.getElementById('quantityInput').value = 1
    }
    time = document.getElementById('Zero').value[0]
    if(document.getElementById('Zero').value.indexOf('12') !== -1){
        time = 12
    }
    document.getElementById(`priceZero`).innerHTML = (time * price * quantity * discount).toFixed(2)+' USD'
    if(this.value <= 0) document.getElementById('priceZero').textContent = ""
}


document.getElementById('proxyType').addEventListener('change', function(){
    switch (this.value) {
        case 'Instagram':
            price = 2.13
            break;
        case 'Google':
            price = 2.5
            break;
        case 'Facebook':
            price = 2.12
            break;
        case 'Youtube':
            price = 2.34
            break;
        case 'Telegram':
            price = 1.87
            break;
       case 'Tinder':
            price = 3.3
            break;
       case 'TikTok':
            price = 1.23
            break;
        case 'Twitter':
            price = 3.24
            break;
        case 'Periscope':
            price = 4,23
            break;                          
    }
    discount = 1
    Array.from(document.getElementsByClassName('timeSelect')).forEach(e => {
        e.value = '1 month'
    })
    qunatityPrice(1)
    document.getElementById('priceOne').innerHTML = (price * 1).toFixed(2) +' USD'
    document.getElementById('priceTwo').innerHTML = (price * 10).toFixed(2) +' USD'
    document.getElementById('priceThree').innerHTML = (price * 25).toFixed(2) +' USD'
    document.getElementById('priceFour').innerHTML = (price * 50).toFixed(2) +' USD'
})

document.getElementsByClassName('logo_title')[0].addEventListener('click', () => {
    document.getElementsByClassName('content')[0].style.display = 'block'
    document.getElementById('login_page').style.display = 'none'
    document.getElementById('register_page').style.display = 'none'
    document.getElementById('loginEmail').value = ''
    document.getElementById('loginPassword').value = ''
    document.getElementById('registerEmail').value = ''
    document.getElementById('registerPassword').value = ''
    
})

document.getElementById('login').addEventListener('click', () => {
    document.getElementById('login').textContent = 'Login'
    if(localStorage.getItem('user'))localStorage.removeItem('user')
   document.getElementsByClassName('content')[0].style.display = 'none'
   document.getElementById('login_page').style.display = 'block'
   document.getElementById('loginEmail').style.border = '1px solid #6C63FF'
    document.getElementById('loginPassword').style.border = '1px solid #6C63FF'
   document.getElementById('register_page').style.display = 'none'
   document.getElementById('loginEmail').value = ''
   document.getElementById('loginPassword').value = ''
   document.getElementById('username').textContent = ''
})

document.getElementById('toLogin').addEventListener('click', () => {
    document.getElementById('login_page').style.display = 'block'
    document.getElementById('loginEmail').style.border = '1px solid #6C63FF'
    document.getElementById('loginPassword').style.border = '1px solid #6C63FF'
    document.getElementById('register_page').style.display = 'none'
    document.getElementById('loginEmail').value = ''
    document.getElementById('loginPassword').value = ''
    document.getElementById('username').textContent = ''
    
})

document.getElementsByClassName('registration')[0].addEventListener('click', () => {
    document.getElementById('login_page').style.display = 'none'
    document.getElementById('register_page').style.display = 'block'
    document.getElementById('registerEmail').value = ''
    document.getElementById('registerPassword').value = ''
    document.getElementById('registerEmail').style.border = '1px solid #6C63FF'
    document.getElementById('registerPassword').style.border = '1px solid #6C63FF'
})

document.getElementById('registerAccount').addEventListener('click', () => {
     email =  document.getElementById('registerEmail').value
    let password = document.getElementById('registerPassword').value
    document.getElementById('registerEmail').style.border = '1px solid #6C63FF'
    document.getElementById('registerPassword').style.border = '1px solid #6C63FF'

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if( re.test(email.toLowerCase())){
        if(password.length > 4) {
            let a = usersData.every(user => {
                return user.email !== email
            })
        
            if(a){
                firebase
                    .firestore()
                    .collection('users')
                    .add(
                    {
                        email,
                        password
                        
                    })
                    fetchData()
                localStorage.setItem('user', JSON.stringify({email,password}));
                currentUser = {email,password}
                document.getElementById('register_page').style.display = 'none'
                document.getElementsByClassName('content')[0].style.display = 'block'
                document.getElementById('login').textContent = 'Logout'
                document.getElementById('username').textContent = email
            }
               
        } else document.getElementById('registerPassword').style.border = '1px solid red'
   }else document.getElementById('registerEmail').style.border = '1px solid red'
})

  

document.getElementById('loginAccount').addEventListener('click', () => {
    email =  document.getElementById('loginEmail').value
    let password = document.getElementById('loginPassword').value
    document.getElementById('loginEmail').style.border = '1px solid #6C63FF'
    document.getElementById('loginPassword').style.border = '1px solid #6C63FF'
    currentUser = {}
    let a = usersData.some(user => {
        return user.email === email && user.password === password
    })
    if(a){
        fetchData()
        localStorage.setItem('user', JSON.stringify({email,password}));
        document.getElementById('loginEmail').style.border = '1px solid #6C63FF'
        document.getElementById('loginPassword').style.border = '1px solid #6C63FF'
        document.getElementById('loginEmail').value = ''
        document.getElementById('loginPassword').value = ''
        document.getElementById('login').textContent = 'Logout'
        document.getElementsByClassName('content')[0].style.display = 'block'
        document.getElementById('login_page').style.display = 'none'
        document.getElementById('username').textContent = email
    }else {
        document.getElementById('loginEmail').style.border = '1px solid red'
        document.getElementById('loginPassword').style.border = '1px solid red'
    }
})



var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = Array.from(document.getElementsByClassName("cart_button"));

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.forEach(e => {
    e.onclick = function() {
        if(JSON.parse(localStorage.getItem('user'))){
            modal.style.display = "block";
            let id = e.id.slice(3)
            let month = document.getElementById(id).value
            discount = 1
            time = 1
            if(month.indexOf('12') !== -1){
                 discount = 0.7
                 time = 12
             }
             if(month.indexOf('6') !== -1) {
                 time = 6
                  discount = 0.8
              }
            quantity = e.id.indexOf('One') !== -1 ?1:e.id.indexOf('Two') !== -1?10:e.id.indexOf('Three')!== -1?25:e.id.indexOf('Four')!== -1?50:quantity;
            document.getElementById('oriderInfo').textContent = `${email?'('+email+')':''}`
            document.getElementById('btc').textContent = `${(time * price * +quantity * discount * 0.000087*1000).toFixed(2)} mBTC`
            document.getElementById('sendWarning').textContent = `Send exactly ${(time * price * +quantity * discount * 0.000087*1000)} BTC to the specified address`
            document.getElementById('amount').textContent = `${(time * price * +quantity * discount * 0.000087*1000).toFixed(4)} BTC`
        }else {
            document.getElementsByClassName('content')[0].style.display = 'none'
            document.getElementById('login_page').style.display = 'block'
            document.getElementById('register_page').style.display = 'none'
        }
      }
})

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById('done').addEventListener('click', () => {
    alert('Payment will confirm in 3 hours')
    modal.style.display = "none";
    firebase
        .firestore()
        .collection('buys')
        .add({
            quantity,
            time: time+' months',
            price: `${(time * price * +quantity * discount * 0.000087*1000).toFixed(4)} BTC`,
            email: JSON.parse(localStorage.getItem('user')).email          
        })
                
})








function form(e) {
    e.preventDefault()
    let name = document.getElementById('name')
    let email = document.getElementById('email')
    let message = document.getElementById('message')
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!name.value.replace(/\s/g, '').length) {
        alert("Name only contains whitespace (ie. spaces, tabs or line breaks)")
    }
    else if (!message.value.replace(/\s/g, '').length) {
        alert("Message only contains whitespace (ie. spaces, tabs or line breaks)")
    }
    else if (re.test(email.value)) {
        email.style.color = '#595f6e';
        sendEmail(email.value, name.value, message.value)
        alert('Thank you your message has been sent successfully')
        name.value = ""
        email.value = ''
        message.value = ''
    } else {
        email.style.color = 'red'
    }
}

function sendEmail(email, name, message) {
    console.log(email, name,message)
    firebase
        .firestore()
        .collection('contacts')
        .add(
            {
                email,
                name,
                message
            }
        )
}