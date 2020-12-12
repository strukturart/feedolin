const lazyload = ((_) => {
  let ll = function () {
    const images = document.querySelectorAll(".lazyload");

    function handleIntersection(entries) {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          entry.target.classList.add("loaded");
          observer.unobserve(entry.target);
        }
      });
    }

    const observer = new IntersectionObserver(handleIntersection);

    for (let i = 0; i < images.length; i++) {
      observer.observe(images[i]);
    }
  };

  let existCondition = setInterval(function () {
    if (document.getElementsByClassName("lazyload").length) {
      clearInterval(existCondition);
      ll();
    }
  }, 500);

  return { ll };
})();
