"use strict";
// console.log("hello");

// ********MAKE CIRCLE PERCENTAGE ANIMATED********
const numberOne = document.getElementById("skill-pie__number--1");
const numberTwo = document.getElementById("skill-pie__number--2");

let counterOne = 0;
let counterTwo = 0;
/*We want to count from 0 to 65% or 95% and so on. It means, later we 
will increase with '+1'. So, it has to be "LET" to make it 
changable variable*/
const callPie = function ([entry]) {
  if (entry.isIntersecting) {
    //We use "setInterval(method)". This method takes two parameter a CALLBACK function and DELAY-OPTION.
    // More: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
    const elIntervalOne = setInterval(function () {
      if (counterOne == 95) {
        clearInterval();
      } else {
        counterOne += 1;
        numberOne.innerHTML = `${counterOne}%`;
      }
    }, 21.05);
    // 0r (2000ms / 95 = 21.05). Without calculation, just need to experiment for perfect number. But that calculation is better
    const elIntervalTwo = setInterval(function () {
      if (counterTwo == 65) {
        clearInterval();
      } else {
        counterTwo += 1;
        numberTwo.innerHTML = `${counterTwo}%`;
      }
    }, 30.77);
  }
};

const pieObserver = new IntersectionObserver(callPie, {
  root: null,
  threshold: 1,
  // rootMargin: `${numOne}px`,
});
pieObserver.observe(numberOne);
pieObserver.observe(numberTwo);

// ******** MENU ITEMS FADEOUT ********
const nav = document.querySelector(".navigation__nav");

const handleHover = function (e, opacity) {
  if (e.target.classList.contains("navigation__nav-link")) {
    // console.log(e); //To test
    const link = e.target;
    const siblings = link
      .closest("nav")
      .querySelectorAll(".navigation__nav-link");
    // console.log(siblings);

    siblings.forEach((el) => {
      // el.style.opacity = this
      if (el !== link) el.style.opacity = opacity;
    });
  }
};

nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

// ******** DIALOGUE BOX ACTIVATION ********
const box = document.querySelector(".thanks");
const overlay = document.querySelector(".overlay");
const btnClose = document.querySelector(".thanks_close");
const btnOpen = document.querySelector(".thanks_show");

const toggleBox = function () {
  box.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

btnOpen.addEventListener("click", toggleBox);
btnClose.addEventListener("click", toggleBox);
overlay.addEventListener("click", toggleBox);

// Close the box using "KEYS"
document.addEventListener("keydown", function (e) {
  // console.log(e);
  if (e.key === "Escape") {
    // console.log("Esc was pressed");
    if (!box.classList.contains("hidden")) {
      //It means, if 'box' class doesn't contain "hidden" class
      toggleBox();
    }
  }
});

// **********SMOOTH SCROLLING ANIMATION**********
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href"); // Now target each 'href' attribute where we gonna implemet the animation
    // console.log(href); // Now target each 'href' attribute where we gonna implemet the animation

    // First connect to top link(clicking from footer logo)
    if (href === "#")
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    // Now link to all other links (in section-level which is as document element)
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      // console.log(sectionEl);
      sectionEl.scrollIntoView({ behavior: "smooth" });
      /* We used 'scrollIntoView function, bcoz we dont know the pixel
      value how high or how low in the content. But for logo we used
      "top:0", bco it is situated at the very top (0pixel level) */
    }
  });
});

//////SCROLL FROM THE FOOTER-ICON
const footerHand = document.querySelector(".footer__icon");
footerHand.addEventListener("click", function () {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

// ********** ACTIVATE TAB ELEMENTS **********
const about = document.querySelector(".about");
const tabButtons = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");
about.addEventListener("click", function (e) {
  // console.log(e.target.dataset.id);
  /*It works as event-BUBLING means, if we click on a button, it will 
  show everything inside the button viceversa. "dataset" always 
  returns an objet (we named our object as 'data-id'). So we need just
  the property 'id'. This propery we could name whatever we wanted. */

  const id = e.target.dataset.id; //We store it first in a variable
  if (id) {
    //Here () means if "id" exist, then do something
    //   // remove selected from other buttons
    tabButtons.forEach(function (btn) {
      btn.classList.remove("active"); //We could better hide it in HTML and add here we JS
      e.target.classList.add("active");
    });
    //   // hide other articles
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id); //The content has the matching 'id' thta we want to display
    element.classList.add("active");
  }
});

// **** Experience box Movement ****
// const items = document.querySelectorAll(".timeline__list");

// const isInViewport = (el) => {
//   const rect = el.getBoundingClientRect();
//   return (
//     rect.top >= 0 &&
//     rect.left >= 0 &&
//     rect.bottom <=
//       (window.innerHeight || document.documentElement.clientHeight) &&
//     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//   );
// };

//  ********FOOTER copyright(To settle current year)*******
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;
// console.log(yearEl)

// **** DIFFRENT APPROACHT(For experience box Movement) ****
const items = document.querySelectorAll(".timeline__list");

function isVisible(domElement) {
  const handler = function ([entry]) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      timelineObserver.disconnect();
    }
  };
  const options = {
    root: null, //set it to entire viewport again
    threshold: 0,
    // rootMargin: "607px", //This is hardcodded
    rootMargin: `0px 0px -${domElement.getBoundingClientRect().height}px 0px`,
  };

  const timelineObserver = new IntersectionObserver(handler, options);
  timelineObserver.observe(domElement);
}

items.forEach(function (item) {
  isVisible(item);
});
