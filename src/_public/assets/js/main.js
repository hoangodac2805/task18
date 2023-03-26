$(document).ready(function () {
  $(".c-mainvisual--exbox").slick({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    cssEase: "linear",
    prevArrow: false,
    nextArrow: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
        },
      },
    ],
  });
});
$(document).ready(function () {
  $(".c-mainvisual--notifiMid").slick({
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    prevArrow: $(".c-mainvisual--arrowL"),
    nextArrow: $(".c-mainvisual--arrowR")


  });
});
$(document).ready(function () {
  $(".c-plan--slick ").slick({
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: $(".c-plan--prev"),
    nextArrow: $(".c-plan--next"),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          prevArrow: $(".c-plan--prev"),
          nextArrow: $(".c-plan--next"),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: $(".c-plan--prev"),
          nextArrow: $(".c-plan--next"),
        },
      },
    ],
  });
});
//----scroll fade
window.addEventListener('scroll', reveal)
function reveal() {

  var reveals = document.querySelectorAll('.c-scrollBox');
  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 50;

    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add('is-active');
    } else {
      reveals[i].classList.remove('is-active')
    }
  }

}



//----backtotop-----
let mybutton = document.getElementById("backtotop");

window.onscroll = function () {
  scrollFunction();

};

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.querySelector('header').classList.add('is-fixed')
  } else {
    document.querySelector('header').classList.remove('is-fixed')
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
mybutton.addEventListener("click", topFunction);
//-----navbar--
let navBtn = document.getElementById("navbarToggle");
let header = document.querySelector('header');
navBtn.addEventListener('click', function () {
  if (!header.classList.contains('is-active')) {
    header.classList.add('is-active')
    document.body.style.overflow = 'hidden';
    this.querySelector('span').innerText = "閉じる"
    this.querySelector('img').src = "/assets/img/header/closebar.png"
  } else {
    header.classList.remove('is-active')
    document.body.style.overflow = 'unset';
    this.querySelector('span').innerText = "メニュー"
    this.querySelector('img').src = "/assets/img/header/bar.png"
  }

})



let navMain = document.querySelector('.c-header--navbody');
let listonoff = document.querySelectorAll('.c-nav--onoff');
let child1 = document.querySelector('#c-navchild1');
let child2 = document.querySelector('#c-navchild2');
let par = document.querySelectorAll('.c-nav--plus');
let back = document.querySelectorAll('.c-nav--back');
for (let item of par) {
  item.addEventListener('click', function () {
    navMain.style.display = 'none';
    if (this.classList.contains('c-nav--par1')) {
      child1.style.display = 'block'
    } else {
      child2.style.display = 'block'
    }
  })
}
for (let item of back) {
  item.addEventListener('click', function () {
    navMain.style.display = 'block';
    child1.style.display = "none";
    child2.style.display = "none";
  })
}
for (let item of listonoff) {
  item.addEventListener('click', function () {
    header.classList.remove('is-active')
    document.body.style.overflow = 'unset';
    navBtn.querySelector('span').innerText = "メニュー"
    navBtn.querySelector('img').src = "/assets/img/header/bar.png"
  })
}







//-----validation---
let validation = new Validation();
let forminput = ['company', 'name', 'email', 'tel', 'post', 'homeadr', 'district', 'paragrahp']
let notCheckEmpty = ["company", "郵便番号", "address"];
let validationArr = [{ id: "name" }, { id: "email" }, { id: "tel" }, { id: "paragrahp" }];

let errArr = [
  { name: "お名前", err: "" },
  { name: "メールアドレス", err: "" },
  { name: "電話番号", err: "" },
  { name: "お問い合わせ内容", err: "" }

];
let subbtn = document.getElementById("submitbtn");
let form = document.getElementById("contactform");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let flag = true;
    for (vali of validationArr) {
      let inputItem = document.getElementById(vali.id);
      let value = inputItem.value;
      let name = inputItem.name;

      let errorid = vali.id + 'err';
      let desc = name;
      checktype(value, errorid, desc, name);
    }
    for (let i = 0; i < errArr.length; i++) {
      if (errArr[i].err.trim() !== "") {
        flag = false;
      }
    }
    document.querySelector('#posterr').innerHTML = '';
 
    if (!flag) {
      let content = `<p>Please try again!!!
      <br>
      もう一度試してください。
      </p>`
      opennotifi(content, "error")
      return;
    }
    for (let i = 0; i < forminput.length; i++) {
      document.getElementById(forminput[i]).value = '';
    }
    document.querySelector('#address').value = '';
    let content = `<p>Thank you!!!<br>
    ありがとうございます。
    </p>`
    opennotifi(content, "success")

  });

}
///----postcode

var URL = "https://postal-codes-jp.azurewebsites.net/api/PostalCodes/"
let districtIp = document.querySelector('#district');
let city = document.querySelector('#address')
let post = document.querySelector('#post');

let cityoption = (city?.querySelectorAll('option'));
//debounce
const debounce = (func, delay) => {
  let debounceTimer
  return function () {
    const context = this
    const args = arguments
    clearTimeout(debounceTimer)
    debounceTimer
      = setTimeout(() => func.apply(context, args), delay)
  }
}
const postcode = async (postnum) => {
  if  (validation.kiemTraPost(postnum)) {
    let number = postnum.replace("-", "");
    try {
      const res = await axios.get(`${URL}${number}`);
      document.querySelector('#posterr').innerHTML = ''
      return res.data;
    } catch (error) {

    }
  } else {
    document.querySelector('#posterr').innerHTML = '郵便番号に誤りがあります'
  }

}
//main
const onpostnum = debounce(async function (e) {

  //validate
  let value = e.target.value;
  let name = e.target.name;
  let errorid = e.target.id + 'err';
  let desc = name;
  checktype(value, errorid, desc, name);


  //

  let postnum = e.target.value;

  let data = await postcode(postnum);
  try {
    districtIp.value = data[0].city.name + data[0].name;
    
    for (let item of cityoption) {
      item.removeAttribute("selected");
      if (item.value === data[0].city.pref.name) {

        item.setAttribute("selected", "")
        city.value = item.value;
      return;
      }
    }
  } catch (error) {

  }

}, 1500)








window.onpostnum = onpostnum;
//
const onchangeFunc = (e) => {
  let value = e.target.value;
  let name = e.target.name;
  let errorid = e.target.id + 'err';

  let desc = name;

  checktype(value, errorid, desc, name);
};

//----check type----
const checktype = (value, errorid, desc, name) => {
  if (name === "お名前") {
    notifiErr(value, errorid, desc, name, validation.kiemTraTatCaLaChu(value));
  }

  if (name === "メールアドレス") {
    notifiErr(value, errorid, desc, name, validation.kiemTraEmail(value));
  }
  if (name === "電話番号") {
    notifiErr(value, errorid, desc, name, validation.kiemTraSoDT(value));
  }
  if (name === "お問い合わせ内容") {

    notifiErr(value, errorid, desc, name, validation.kiemTraRong(value));
  }
 
};
//----notifi----
const notifiErr = (value, errorid, desc, name, valiType) => {
  let errIndex = errArr.findIndex((item) => item.name === name);
  if (name === '郵便番号') {
    return;
  }
  if (valiType) {
    document.getElementById(errorid).innerHTML = "";
    errArr[errIndex].err = "";
  } else {
    document.getElementById(errorid).innerHTML = desc + "に誤りがあります!!!";
    errArr[errIndex].err = desc + "に誤りがあります!!!";
  }
  if (name === 'お問い合わせ内容') {
    document.getElementById(errorid).innerHTML = "";
    errArr[errIndex].err = "";
  }
  if (validation.kiemTraRong(value) && !notCheckEmpty.includes(name)) {
    document.getElementById(errorid).innerHTML = desc + "を入力してください!!!";
    errArr[errIndex].err = desc + "を入力してください!!!";
  }

};

//---open--notifi
var opennotifi = (content, type) => {
  let ntf = document.querySelector('.c-ntf');
  let ntfmain = document.querySelector('.c-ntf--main');
  if (type == 'success') {
    ntfmain.style.color = 'green'
  } else {
    ntfmain.style.color = 'red'
  }
  ntfmain.innerHTML = content;
  ntf.style.display = "block";
  setTimeout(() => {
    ntf.style.display = "none";
  }, 4000);
}

window.onchangeFunc = onchangeFunc;
