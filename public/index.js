const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);
});

const sendMail = (mail) => {
  var checkbox = document.getElementById("checkbox");
  if (checkbox.checked) {
    fetch("https://mankowski92-best-shop.herokuapp.com/send", {
      method: "post",
      body: mail,
    }).then((response) => {
      return response.json();
    });
    alert("Twoja prośba o kontakt została wysłana : )");
  }
  if (!checkbox.checked) {
    alert("Please tick the consent for the processing of your personal data");
  }
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});