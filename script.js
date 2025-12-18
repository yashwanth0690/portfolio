document.addEventListener("DOMContentLoaded", () => {

  // Smooth scroll for navbar
  document.querySelectorAll("nav a").forEach(link => {
      link.addEventListener("click", function(e){
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if(target){
              target.scrollIntoView({behavior: "smooth"});
          }
      });
  });

  // Section reveal animation
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if(entry.isIntersecting){
              entry.target.classList.add("show");
          }
      });
  }, {threshold: 0.2});

  sections.forEach(sec => {
      sec.classList.add("hidden");
      observer.observe(sec);
  });

  // Back-to-top button
  const topBtn = document.createElement("button");
  topBtn.textContent = "↑";
  topBtn.id = "topBtn";
  document.body.appendChild(topBtn);
  Object.assign(topBtn.style, {
      position: "fixed",
      bottom: "30px",
      right: "30px",
      padding: "10px 15px",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
      display: "none",
      fontSize: "18px",
      background: "#0ff",
      color: "#000",
      zIndex: 1000
  });
  window.addEventListener("scroll", () => {
      if(window.scrollY > 400){
          topBtn.style.display = "block";
      } else {
          topBtn.style.display = "none";
      }
  });
  topBtn.addEventListener("click", () => {
      window.scrollTo({top: 0, behavior: "smooth"});
  });

  // EmailJS form submission
  const hireForm = document.getElementById("hireForm");
  const formStatus = document.getElementById("formStatus");

  hireForm.addEventListener("submit", function(e){
      e.preventDefault();

      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(() => {
            formStatus.textContent = "Message sent successfully!";
            formStatus.style.color = "#0f0";
            hireForm.reset();
        }, (err) => {
            formStatus.textContent = "Failed to send message. Check EmailJS keys.";
            formStatus.style.color = "#f00";
        });
  });

});
