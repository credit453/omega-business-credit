document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    logo.addEventListener('mouseover', () => {
        logo.style.animationPlayState = 'paused';
    });
    logo.addEventListener('mouseout', () => {
        logo.style.animationPlayState = 'running';
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscriptionForm');
    const totalPriceElement = document.getElementById('totalPrice');
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    const prices = {
        loan: 200,
        grant: 150,
        website: 500,
        emailCreation: 50,
        phone: 75
    };

    function updateTotalPrice() {
        let total = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += prices[checkbox.id];
            }
        });
        totalPriceElement.textContent = total;
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotalPrice);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const services = formData.getAll('services').join(', ');

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            name: formData.get('name'),
            email: formData.get('email'),
            services: services,
            total: totalPriceElement.textContent
        }).then((response) => {
            alert('Your subscription request has been sent successfully!');
        }, (error) => {
            console.error('FAILED...', error);
            alert('Failed to send your subscription request. Please try again.');
        });
    });
});
