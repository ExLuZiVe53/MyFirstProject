$('.offer').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    fade: true,
    asNavFor: '.slider-photo'
  });
  $('.slider-photo').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.offer',
    arrows: false,
    fade: true,
    centerMode: true,
    focusOnSelect: true
  });



// burger-menu

/*let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');

menuBtn.addEventListener('click', function(){
  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');
})*/


/* Modal window */

let btnOpen = document.getElementById('btn-open');
let modal = document.getElementById('wrapper-modal');

let overlay = document.getElementById('overlay');
let btnClose = document.getElementById('btn-close');

btnOpen.addEventListener('click',function(){
    modal.classList.add('active');
});

function closeModal(){
    modal.classList.remove('active');
}

overlay.addEventListener('click',closeModal);
btnClose.addEventListener('click',closeModal);

/* Slider */

const prev = document.getElementById('btn-prev-left'),
      next = document.getElementById('btn-next-right'),
      slides = document.querySelectorAll('.slide'),
      squares = document.querySelectorAll('.square'),
      slidesWrap = document.querySelectorAll('.slider-wrapper');

let index = 0;

const activeSlide = n => {
    for(slide of slides){
        slide.classList.remove('active');
    }
    slides[n].classList.add('active');
}

const activeSquare = n => {
    for(square of squares) {
        square.classList.remove('active');
    }
    squares[n].classList.add('active');
}

const prepareCurrentSlide = ind => {
    activeSlide(ind);
    activeSquare(ind);
}

const nextSlide = () => {
    if(index == slides.length - 1){
        index = 0;
        prepareCurrentSlide(index);
    }else{
        index++;
        prepareCurrentSlide(index);
    }
};
const prevSlide = () => {
    if(index == 0){
        index = slides.length - 1;
        prepareCurrentSlide(index);
    }else{
        index--;
        prepareCurrentSlide(index);
    }
};

squares.forEach((item,indexSquare) => {
    item.addEventListener('click', () => {
        index = indexSquare;
        prepareCurrentSlide(index);
        clearInterval(interval);
    })
});

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);


/*  */

// Validator

$('.btn__icon').on('click', function(e) {
    e.preventDefault();
    $(this).parent('modals').submit();
  })
  
  $.validator.addMethod('regex', function(value, element, regexp) {
    let regExsp = new RegExp(regexp);
    return regExsp.test(value);
  }, 'Please check you input')
  
  function valEll(el) {
    el.validate ({
      rules : {
        firstName: {
          required: true,
          regex: "[A-Za-z]{1,32}"
        },
        email: {
          required: true,
          regex: "[0-9A-Za-z]"
        },
        phone: {
          required: true,
          digits: true,
          minlength: 10,
          maxlength: 13,
          regex: "[0-9]+"
        }
      },
      messages: {
        firstName: {
          required: 'Field is required',
          regexp: 'Enter your name correctly'
        },
        email: {
          required: 'Field is required',
          regexp: 'Enter your email correctly'
        },
        phone: {
          required: 'Field is required',
          regexp: 'Enter your phone correctly'
        }
      },
      submitHandler: function(form) {
        $('#preloader-active').fadeIn();
        let $form = $(form);
        let $formId = $(form).attr('id');
        switch ($formId) {
          case 'form-book':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize()
            })
            .done(function() {
              console.log('success');
            })
            .fail(function() {
              console.log('Fail');
            })
            .always(function() {
              setTimeout(function() {
                $form.trigger('reset');
                $('.wrapper-modal').fadeOut();
              }, 1000);
              setTimeout(function() {
                $('#preloader-active').fadeOut();
              }, 1400)
            });
         break;
         case 'search-box':
          $ajax({
            type: 'POST',
            url: $form.attr('action'),
            data: $form.serialize()
          })
          .done(function() {
            console.log('success');
          })
          .fail(function() {
            console.log('Fail');
          })
          .always(function() {
            setTimeout(function() {
              $form.trigger('reset');
              $('.wrapper-modal').fadeOut();
            }, 1000);
            setTimeout(function() {
              $('preloader-active').fadeOut();
            }, 1400)
          });
         break;
        }
        return false;
      }
    })
  };
  
  $('.form-val').each(function(){
    valEll($(this));
  })
