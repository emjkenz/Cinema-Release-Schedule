// This is code for the carousel.

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, { duration: 5000 });
    var instance = M.Carousel.getInstance.next(1);
});


  // Note for my dummy self. Use point brackets {} and : instead of =.
  // End carousel code.