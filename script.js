
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});


document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const form = document.getElementById('feedbackForm');
const formData = document.getElementById('formData');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
   
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Пожалуйста, введите корректный email адрес');
        return;
    }
    
   
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone)) {
        alert('Пожалуйста, введите корректный номер телефона');
        return;
    }
    
    
    const data = {
        name,
        email,
        phone,
        message
    };
    
    
    formData.innerHTML = `
        <div class="submitted-data">
            <h3>Отправленные данные:</h3>
            <p><strong>Имя:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Телефон:</strong> ${data.phone}</p>
            <p><strong>Сообщение:</strong> ${data.message}</p>
        </div>
    `;
    
    
    form.reset();
    
    
    formData.classList.add('animate__animated', 'animate__fadeIn');
    
   
    formData.scrollIntoView({ behavior: 'smooth' });
});


const subscribeForm = document.getElementById('subscribeForm');
const subscribeData = document.getElementById('subscribeData');

subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    

    const name = document.getElementById('subscribeName').value;
    const email = document.getElementById('subscribeEmail').value;
    const type = document.getElementById('subscribeType').value;
    
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Пожалуйста, введите корректный email адрес');
        return;
    }
    
    
    const subscription = {
        name,
        email,
        type,
        date: new Date().toISOString()
    };
    
    
    let subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    

    subscriptions.push(subscription);
    
   
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    
   
    subscribeData.innerHTML = `
        <div class="submitted-data">
            <h3>Подписка оформлена!</h3>
            <p><strong>Имя:</strong> ${subscription.name}</p>
            <p><strong>Email:</strong> ${subscription.email}</p>
            <p><strong>Тип подписки:</strong> ${getSubscriptionType(subscription.type)}</p>
        </div>
    `;
    
   
    subscribeData.classList.add('active');
    
   
    subscribeForm.reset();
    
    
    subscribeData.scrollIntoView({ behavior: 'smooth' });
});


function getSubscriptionType(type) {
    const types = {
        'news': 'Новости компании',
        'prices': 'Цены на продукцию',
        'all': 'Все новости'
    };
    return types[type] || type;
}


const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeIn');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

        
const style = document.createElement('style');
style.textContent = `
    .submitted-data {
        margin-top: 2rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .submitted-data h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
    }
    
    .submitted-data p {
        margin: 0.5rem 0;
    }
`;
document.head.appendChild(style); 