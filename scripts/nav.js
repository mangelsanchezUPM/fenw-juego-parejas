$().ready(() => {
  localStorage.setItem("cards-number", 20);
  localStorage.setItem("time-limit", 0);
  $("#router-outlet").load("html/home.html");

  $("#home").click(() => $("#router-outlet").load("html/home.html"));
  $("#play").click(() => {
    $("#router-outlet").load("html/play.html");
  });
  $("#records").click(() => $("#router-outlet").load("html/records.html"));
  $("#preferences").click(() =>
    $("#router-outlet").load("html/preferences.html")
  );
  $("#login").click(() => $("#router-outlet").load("html/login.html"));
  $("#register").click(() => $("#router-outlet").load("html/signup.html"));
});
