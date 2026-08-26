// ========================================
// MOBILE MENU
// ========================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    function toggleMenu() {
        navMenu.classList.toggle("active");
    }

    menuBtn.addEventListener("click", toggleMenu);

    document.querySelectorAll("#navMenu a").forEach(function(link) {

        link.addEventListener("click", function() {
            navMenu.classList.remove("active");
        });

    });
}


// ========================================
// DARK / LIGHT MODE
// ========================================

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    function toggleTheme() {

        document.body.classList.toggle("light");

        if (document.body.classList.contains("light")) {
            themeBtn.textContent = "☀️";
        } else {
            themeBtn.textContent = "🌙";
        }

    }

    themeBtn.addEventListener("click", toggleTheme);
}


// ========================================
// TYPING ANIMATION
// ========================================

const typing = document.getElementById("typing");

const words = [
    "Web Developer",
    "Frontend Developer",
    "JavaScript Developer",
    "Creative Developer"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typingAnimation() {

    if (!typing) return;

    const currentWord = words[wordIndex];

    if (!deleting) {

        typing.textContent =
            currentWord.substring(0, letterIndex + 1);

        letterIndex++;

        if (letterIndex === currentWord.length) {

            deleting = true;

            setTimeout(typingAnimation, 1000);

            return;
        }

    } else {

        typing.textContent =
            currentWord.substring(0, letterIndex - 1);

        letterIndex--;

        if (letterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typingAnimation,
        deleting ? 60 : 100
    );
}

typingAnimation();


// ========================================
// SKILL BAR ANIMATION
// ========================================

const progressBars =
    document.querySelectorAll(".progress-bar");

function animateSkills() {

    progressBars.forEach(function(bar) {

        const width = bar.dataset.width;

        bar.style.width = width + "%";

    });
}

const skillSection =
    document.getElementById("skills");

if (skillSection) {

    const skillObserver =
        new IntersectionObserver(function(entries) {

            if (entries[0].isIntersecting) {

                animateSkills();

                skillObserver.disconnect();
            }

        }, {
            threshold: 0.3
        });

    skillObserver.observe(skillSection);
}


// ========================================
// PROJECT FILTER
// ========================================

const filters =
    document.querySelectorAll(".filter");

const projects =
    document.querySelectorAll(".project-card");

function filterProjects(category) {

    projects.forEach(function(project) {

        const projectCategory =
            project.dataset.category;

        if (
            category === "all" ||
            category === projectCategory
        ) {

            project.style.display = "block";

        } else {

            project.style.display = "none";

        }

    });
}

filters.forEach(function(button) {

    button.addEventListener("click", function() {

        filters.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category =
            button.dataset.filter;

        filterProjects(category);

    });

});


// ========================================
// CONTACT FORM + BACKEND
// ========================================

const form =
    document.getElementById("contactForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const subjectInput =
    document.getElementById("subject");

const messageInput =
    document.getElementById("message");


// ========================================
// ERROR FUNCTIONS
// ========================================

function showError(element, message) {

    element.textContent = message;

}


function clearErrors() {

    document.getElementById("nameError").textContent = "";

    document.getElementById("emailError").textContent = "";

    document.getElementById("subjectError").textContent = "";

    document.getElementById("messageError").textContent = "";

}


// ========================================
// EMAIL VALIDATION
// ========================================

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


// ========================================
// FORM VALIDATION
// ========================================

function validateForm() {

    clearErrors();

    let valid = true;


    // NAME

    if (nameInput.value.trim() === "") {

        showError(
            document.getElementById("nameError"),
            "Please enter your name."
        );

        valid = false;
    }


    // EMAIL

    if (emailInput.value.trim() === "") {

        showError(
            document.getElementById("emailError"),
            "Please enter your email."
        );

        valid = false;

    } else if (
        !isValidEmail(emailInput.value.trim())
    ) {

        showError(
            document.getElementById("emailError"),
            "Please enter a valid email."
        );

        valid = false;
    }


    // SUBJECT

    if (subjectInput.value.trim() === "") {

        showError(
            document.getElementById("subjectError"),
            "Please enter a subject."
        );

        valid = false;
    }


    // MESSAGE

    if (messageInput.value.trim() === "") {

        showError(
            document.getElementById("messageError"),
            "Please enter your message."
        );

        valid = false;

    } else if (
        messageInput.value.trim().length < 10
    ) {

        showError(
            document.getElementById("messageError"),
            "Message must contain at least 10 characters."
        );

        valid = false;
    }


    return valid;
}


// ========================================
// SEND MESSAGE TO BACKEND
// ========================================

if (form) {

    form.addEventListener("submit", async function(event) {

        event.preventDefault();


        const status =
            document.getElementById("formStatus");


        // VALIDATE

        if (!validateForm()) {

            status.textContent = "";

            return;
        }


        // SHOW SENDING

        status.textContent = "Sending...";

        status.style.color = "#facc15";


        // GET VALUES

        const name =
            nameInput.value.trim();

        const email =
            emailInput.value.trim();

        const subject =
            subjectInput.value.trim();

        const message =
            messageInput.value.trim();


        try {

            // SEND TO BACKEND

            const response = await fetch(
                "http://localhost:5000/api/messages",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,

                        email: email,

                        subject: subject,

                        message: message

                    })
                }
            );


            const data =
                await response.json();


            // SUCCESS

            if (data.success) {

                status.textContent =
                    "Message sent successfully! ✅";

                status.style.color = "#4ade80";


                // CLEAR FORM

                form.reset();


                // RESET COUNTER

                updateCharacterCount();


            } else {

                status.textContent =
                    data.message ||
                    "Failed to send message.";

                status.style.color = "#f87171";

            }


        } catch (error) {

            console.error(
                "Backend Error:",
                error
            );


            status.textContent =
                "Unable to connect to backend ❌";

            status.style.color = "#f87171";

        }

    });

}


// ========================================
// MESSAGE CHARACTER COUNTER
// ========================================

const charCount =
    document.getElementById("charCount");


function updateCharacterCount() {

    if (!messageInput || !charCount) return;

    const length =
        messageInput.value.length;

    charCount.textContent =
        length + " / 500";

}


if (messageInput) {

    messageInput.addEventListener(
        "input",
        updateCharacterCount
    );

}


// ========================================
// SCROLL TO TOP
// ========================================

const topBtn =
    document.getElementById("topBtn");


function handleScroll() {

    if (!topBtn) return;


    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

}


window.addEventListener(
    "scroll",
    handleScroll
);


if (topBtn) {

    topBtn.addEventListener(
        "click",
        function() {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


// ========================================
// CURRENT YEAR
// ========================================

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}