document.addEventListener("DOMContentLoaded", function () {
    // GSAP Animation for the heading text
    gsap.from(".contain", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
    });

    // GSAP Animation for project cards
    gsap.utils.toArray(".project").forEach((project, index) => {
        gsap.from(project, {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: project,
                start: "top 90%",
                toggleActions: "play none none reverse",
            }
        });
    });

    // Language toggle function
    function setLanguage(lang) {
        document.querySelectorAll("[data-en]").forEach(el => {
            let text = lang === "fr" ? el.getAttribute("data-fr") : el.getAttribute("data-en");
            if (text) el.textContent = text;
        });

        document.getElementById("fr").classList.toggle("active", lang === "fr");
        document.getElementById("en").classList.toggle("active", lang === "en");
    }

    // Default language is English
    setLanguage("en");

    // Add event listeners for language buttons
    document.getElementById("en").addEventListener("click", () => setLanguage("en"));
    document.getElementById("fr").addEventListener("click", () => setLanguage("fr"));

    // Hover effects for projects
    let projects = document.querySelectorAll(".project");
    let heroText = document.querySelector(".contain");

    projects.forEach((project) => {
        project.addEventListener("mouseenter", () => {
            heroText.classList.add("fade-out");

            let randomX = gsap.utils.random(-15, 15); 
            let randomY = gsap.utils.random(-15, 15);
            let randomRotation = gsap.utils.random(-10, 10);

            gsap.to(project, { 
                x: randomX, 
                y: randomY, 
                rotation: randomRotation, 
                duration: 0.4, 
                ease: "power2.out" 
            });

            projects.forEach((p) => {
                if (p !== project) {
                    gsap.to(p, { opacity: 0.2, duration: 0.3 });
                }
            });

            heroText.style.color = "transparent";
            heroText.style.webkitTextStroke = "1px white";
        });

        project.addEventListener("mouseleave", () => {
            heroText.classList.remove("fade-out");

            gsap.to(project, { 
                x: 0, 
                y: 0, 
                rotation: 0, 
                duration: 0.4, 
                ease: "power2.out" 
            });

            projects.forEach((p) => {
                gsap.to(p, { opacity: 1, duration: 0.3 });
            });

            heroText.style.color = "";
            heroText.style.webkitTextStroke = "";
        });
    });
});
