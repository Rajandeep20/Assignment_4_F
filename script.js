document.getElementById('surveyForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    const name = document.getElementById('name').value.trim();
    if (!name) {
        document.getElementById('nameError').textContent = 'Name is required.';
        isValid = false;
    }

    const source = document.querySelector('input[name="source"]:checked');
    if (!source) {
        document.getElementById('sourceError').textContent = 'Please select how you heard about us.';
        isValid = false;
    }

    const features = document.querySelectorAll('input[name="features"]:checked');
    if (features.length === 0) {
        document.getElementById('featuresError').textContent = 'Please select at least one feature.';
        isValid = false;
    }

    const experience = document.getElementById('experience').value;
    if (experience === '') {
        document.getElementById('experienceError').textContent = 'Please rate your experience.';
        isValid = false;
    }

    const username = document.getElementById('username').value;
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    if (!usernamePattern.test(username)) {
        document.getElementById('usernameError').textContent = 'Username must be alphanumeric.';
        isValid = false;
    }

    const customCode = document.getElementById('customCode').value;
    const customCodePattern = /^[A-Z]{3}-\d{4}$/;
    if (!customCodePattern.test(customCode)) {
        document.getElementById('customCodeError').textContent = 'Code must be in the format ABC-1234.';
        isValid = false;
    }

    if (isValid) {
        const formData = {
            name: name,
            source: source ? source.value : '',
            features: Array.from(features).map(checkbox => checkbox.value),
            experience: experience,
            username: username,
            customCode: customCode,
            date: document.getElementById('date').value,
            comments: document.getElementById('comments').value
        };

        fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.json) {
                    alert('Form submitted successfully! Your data has been recorded.');
                    console.log('Server response:', data);
                } else {
                    alert('There was an error submitting the form. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to submit the form due to a network error. Please check your connection and try again.');
            });
    }
});
