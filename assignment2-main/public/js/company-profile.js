window.onload = function() {
    fetch('/company/profile')
        .then(response => response.json())
        .then(data => {
            if (data.name) {
                document.getElementById('companyName').value = data.name;
                document.getElementById('companyDescription').value = data.description || '';
                document.getElementById('companyLocation').value = data.location || '';
            }
        })
        .catch(error => {
            console.log('Error loading profile:', error);
        });
};