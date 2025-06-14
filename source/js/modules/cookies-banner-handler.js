const cookiesBannerHandler = () => {
  const cookiesBanner = document.querySelector("[data-cookies]");
  if (!cookiesBanner) return;

  const btn = document.querySelector('[data-cookies="button"]');
  if (!btn) return;

  function checkCookies() {
    if (document.cookie.indexOf("warned") === -1) {
      cookiesBanner.classList.add("is-active");
      btn.addEventListener("click", () => {
        document.cookie = "warned=true; max-age=31536000; path=/";
        cookiesBanner.classList.remove("is-active");
      });
    }
  }

  checkCookies();
};

export { cookiesBannerHandler };
