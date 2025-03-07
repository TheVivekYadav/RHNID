function submitForm(event) {
    event.preventDefault();
    var rhnid = document.getElementById("rhnid").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phoneno").value;

    var formData = { rhnid: rhnid, email: email , phone: phone};

    fetch("https://rhnidcollection.vercel.app/api/submit", { // Removed `.js`
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => response.json()) // Try to read the response
    .then(data => {
        console.log("Response:", data);  // Log response
        alert(data.message || "Data submitted successfully!");
    })
    .catch(err => console.error("Error:", err));
}

