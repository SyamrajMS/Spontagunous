window.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  var button = document.getElementById("contact-form-button");
  var status = document.getElementById("contact-form-status");

  if (!form) return;

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();

    var originalButtonText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = "Sending...";
    status.innerHTML = "";
    status.className = "mt-3";

    var data = new FormData(form);

    fetch(form.action, {
      method: form.method || "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          button.style.display = "none";
          status.className = "mt-3 alert alert-success";
          status.innerHTML =
            "<strong>Thank you!</strong> Your message has been sent successfully. We will get back to you shortly.";
        } else {
          response
            .json()
            .then(function (resData) {
              status.className = "mt-3 alert alert-danger";
              if (resData && resData.message) {
                status.innerHTML = "Oops! " + resData.message;
              } else {
                status.innerHTML =
                  "Oops! There was a problem submitting your form. You can also email us directly at <a href='mailto:me@syamraj.in'>me@syamraj.in</a>.";
              }
              button.disabled = false;
              button.innerHTML = originalButtonText;
            })
            .catch(function () {
              status.className = "mt-3 alert alert-danger";
              status.innerHTML =
                "Oops! There was a problem submitting your form. You can also email us directly at <a href='mailto:me@syamraj.in'>me@syamraj.in</a>.";
              button.disabled = false;
              button.innerHTML = originalButtonText;
            });
        }
      })
      .catch(function () {
        status.className = "mt-3 alert alert-danger";
        status.innerHTML =
          "Oops! There was a problem submitting your form. Please email us directly at <a href='mailto:me@syamraj.in'>me@syamraj.in</a>.";
        button.disabled = false;
        button.innerHTML = originalButtonText;
      });
  });
});
