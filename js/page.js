const menu = document.querySelector(".menu");

if (menu) {
  const menuMain = menu.querySelector(".menu-main");
  const goBack = menu.querySelector(".go-back");
  const menuTrigger = document.querySelector(".mobile-menu-trigger");
  const closeMenu = menu.querySelector(".mobile-menu-close");
  let subMenu;

  if (menuMain) {
    menuMain.addEventListener("click", (e) => {
      if (!menu.classList.contains("active")) {
        return;
      }
      if (e.target.closest(".menu-item-has-children")) {
        const hasChildren = e.target.closest(".menu-item-has-children");
        showSubMenu(hasChildren);
      }
    });
  }

  if (goBack) {
    goBack.addEventListener("click", () => {
      hideSubMenu();
    });
  }

  if (menuTrigger) {
    menuTrigger.addEventListener("click", () => {
      toggleMenu();
    });
  }

  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      toggleMenu();
    });
  }

  const menuOverlay = document.querySelector(".menu-overlay");
  if (menuOverlay) {
    menuOverlay.addEventListener("click", () => {
      toggleMenu();
    });
  }

  function toggleMenu() {
    menu.classList.toggle("active");
    if (menuOverlay) menuOverlay.classList.toggle("active");
  }

  function showSubMenu(hasChildren) {
    subMenu = hasChildren.querySelector(".sub-menu");
    subMenu.classList.add("active");
    subMenu.style.animation = "slideLeft 0.5s ease forwards";
    const menuTitle =
      hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
    menu.querySelector(".current-menu-title").innerHTML = menuTitle;
    menu.querySelector(".mobile-menu-head").classList.add("active");
  }

  function hideSubMenu() {
    subMenu.style.animation = "slideRight 0.5s ease forwards";
    setTimeout(() => {
      subMenu.classList.remove("active");
    }, 300);
    menu.querySelector(".current-menu-title").innerHTML = "";
    menu.querySelector(".mobile-menu-head").classList.remove("active");
  }

  window.onresize = function () {
    if (this.innerWidth > 991) {
      if (menu.classList.contains("active")) {
        toggleMenu();
      }
    }
  };
}

$(document).ready(function () {
  // Mobile Filter Sidebar Toggle
  // Using delegate to ensure it works even if elements are added dynamically
  $(document).on("click", ".filter-toggle-btn", function () {
    console.log("Filter toggle clicked");
    $(".filter-box").addClass("active");
    $(".filter-overlay").addClass("active");
    $("body").css("overflow", "hidden");
  });

  $(document).on(
    "click",
    ".filter-close-btn, .filter-overlay, .apply-filter-btn",
    function () {
      $(".filter-box").removeClass("active");
      $(".filter-overlay").removeClass("active");
      $("body").css("overflow", "");
    },
  );
});

$(window).on("scroll", function () {
  if ($(window).scrollTop() > 30) {
    $("header").addClass("affix");
  } else {
    $("header").removeClass("affix");
  }
});

$(window).scroll(function () {
  if ($(this).scrollTop() >= 50) {
    // If page is scrolled more than 50px
    $("#return-to-top").fadeIn(200); // Fade in the arrow
  } else {
    $("#return-to-top").fadeOut(200); // Else fade out the arrow
  }
});
$("#return-to-top").click(function () {
  // When arrow is clicked
  $("body,html").animate(
    {
      scrollTop: 0, // Scroll to top of body
    },
    500,
  );
});

// Remove preloader after page load
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("fade-out");
  }
});

$(document).ready(function () {
  // Search Overlay Toggle
  $(".search-trigger").click(function (e) {
    e.preventDefault();
    $(".search-full-width").addClass("active");
    setTimeout(function () {
      $(".search-input-full").focus();
    }, 400);
  });

  $(".search-close").click(function () {
    $(".search-full-width").removeClass("active");
  });

  // Close on Escape key
  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      $(".search-full-width").removeClass("active");
    }
  });

  // Close when clicking outside of the search container but within the overlay
  $(".search-full-width").click(function (e) {
    if ($(e.target).hasClass("search-full-width")) {
      $(this).removeClass("active");
    }
  });

  // Wishlist Animation & Logic (Simplified: Just color change & pop)
  $(".wishlist-btn").click(function () {
    const $btn = $(this);

    // Pop animation
    $btn.addClass("animating");
    setTimeout(() => {
      $btn.removeClass("animating");
    }, 450);

    // Toggle active state (color change)
    $btn.toggleClass("active");
  });
});

$(function () {
  if ($.fn.datepicker) {
    $("#datepicker2").datepicker();
  }
});

// Flexible Password Toggle Handler
$(document).on("click", ".password-toggle", function () {
  const $toggle = $(this);
  const $input = $toggle.siblings("input");
  if ($input.length > 0) {
    const type = $input.attr("type") === "password" ? "text" : "password";
    $input.attr("type", type);
    $toggle.toggleClass("fa-eye fa-eye-slash");
  }
});

// Forgot Password Modal Steps Logic
function showFpStep(stepId) {
  // Hide all steps
  document.getElementById("fp-step-email").style.display = "none";
  document.getElementById("fp-step-otp").style.display = "none";
  document.getElementById("fp-step-reset").style.display = "none";

  // Show target step
  document.getElementById(stepId).style.display = "block";
}

function goToOtp() {
  showFpStep("fp-step-otp");
}

function goToReset() {
  showFpStep("fp-step-reset");
}

function backToEmail() {
  showFpStep("fp-step-email");
}

function backToOtp() {
  showFpStep("fp-step-otp");
}

function finishReset() {
  // Hide modal
  const modalEl = document.getElementById("fogotpwd");
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) {
    modal.hide();
  }
}

function resendCode() {
  // Placeholder for resend code logic
  console.log("Resend Code Clicked");
}

// Reset Forgot Password Modal to first step on close
const fpModal = document.getElementById("fogotpwd");
if (fpModal) {
  fpModal.addEventListener("hidden.bs.modal", function () {
    showFpStep("fp-step-email");
    // Clear inputs if needed
    const inputs = fpModal.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
  });
}

$(document).ready(function () {
  // Mobile Filter Sidebar Toggle
  $(".filter-toggle-btn").click(function () {
    $(".filter-box").addClass("active");
    $(".filter-overlay").addClass("active");
    $("body").css("overflow", "hidden");
  });


  $(".filter-close-btn, .filter-overlay, .apply-filter-btn").click(function () {
    $(".filter-box").removeClass("active");
    $(".filter-overlay").removeClass("active");
    $("body").css("overflow", "");
  });

  // Cart Sidebar Toggle
  function openCartSidebar() {
    $(".cart-sidebar").addClass("active");
    $(".cart-sidebar-overlay").addClass("active");
    $("body").css("overflow", "hidden");
  }

  function closeCartSidebar() {
    $(".cart-sidebar").removeClass("active");
    $(".cart-sidebar-overlay").removeClass("active");
    $("body").css("overflow", "");
  }

  // Open on Add to Cart Click
  $(".btn-cart").click(function (e) {
    e.preventDefault();
    openCartSidebar();
  });

  // Open on Header Cart Icon Click
  $(".cart-trigger").click(function (e) {
    e.preventDefault();
    openCartSidebar();
  });


  // Close actions
  $(".close-cart-sidebar, .cart-sidebar-overlay, .btn-continue-shopping").click(function () {
    closeCartSidebar();
  });

  // Global Quantity Counter Logic (Works for Sidebar and Cart Page)
  $(document).on('click', '.decrement-btn', function () {
    let $input = $(this).siblings('.quantity-input');
    // Fallback if structure is different (Bootstrap input-group vs custom)
    if ($input.length === 0) {
      $input = $(this).closest('.input-group').find('.quantity-input');
    }

    let quantity = parseInt($input.val());
    if (quantity > 1) {
      $input.val(quantity - 1);
    }
  });

  $(document).on('click', '.increment-btn', function () {
    let $input = $(this).siblings('.quantity-input');
    // Fallback
    if ($input.length === 0) {
      $input = $(this).closest('.input-group').find('.quantity-input');
    }

    let quantity = parseInt($input.val());
    $input.val(quantity + 1);
  });

  // Prevent non-numeric typing
  $(document).on('input', '.quantity-input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (this.value === '' || this.value === '0') this.value = 1;
  });

});
