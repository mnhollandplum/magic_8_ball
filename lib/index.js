$(document).ready(function(){
  // getAdvice();
  document.getElementById("get-advice").disabled = false;
  document.getElementById("random-advice").disabled = false;
  document.getElementById("reset-btn").disabled = true;
});

var topic = document.querySelector('#get-advice');
var random = document.querySelector('#random-advice');
var reset = document.querySelector('#reset-btn');

topic.addEventListener('click', getAdvice);
topic.addEventListener('click', startShaking)
random.addEventListener('click', function(){setTimeout(getRandomAdvice, 2000)});
random.addEventListener('click', startShaking)
reset.addEventListener('click', resetPage);

  function getAdvice() {
      var keyword = document.getElementById("keyword").value
      $.ajax('https://api.adviceslip.com/advice/search/'+ keyword, {
        type: 'GET',
        success: function(response) {
          result = JSON.parse(response);
            if(result['slips']) {
              slips = (result['slips'])
              rand = [Math.floor(Math.random() * slips.length)];
              advice = slips[rand]['advice']

              setTimeout(imageChange, 2000);
              setTimeout(stopShaking, 2000);
              setTimeout(displayAdvice, 2500);
            }
            else {
              setTimeout(imageChange, 2000);
              setTimeout(stopShaking, 2000);
              setTimeout(displayError, 2500);
            }
        },
          error : function() {
          setTimeout(imageChange, 2000);
          setTimeout(stopShaking, 2000);
          setTimeout(noInput, 2500);}
      })
      var element = document.getElementById("div1");
      element = ""
    }

  function getRandomAdvice() {
      $.ajax('https://api.adviceslip.com/advice', {
        type: 'GET',
        success: function(response) {
                result = JSON.parse(response);
                advice = (result['slip']['advice'])
                setTimeout(imageChange, 2000);
                setTimeout(stopShaking, 2000);
                setTimeout(displayAdvice, 2200);
              }
      })
      var element = document.getElementById("div1");
      element = ""
    }

  function addAdvice() {
    var new_advice = document.getElementById("submit-advice").value

    $.ajax('https://pacific-hamlet-18372.herokuapp.com/api/v1/slips/', {
      type: 'POST',
      data: {advice: new_advice},
      success: function(result) {
                  window.location.reload(true);
                }
    })
    console.log(new_advice);
}

  function displayAdvice() {
    var para = document.createElement("p");
    var node = document.createTextNode(advice);
    para.appendChild(node);
    var element = document.getElementById("div1");
    element.innerHTML = para.innerHTML;
    document.getElementById("get-advice").disabled = true;
    document.getElementById("random-advice").disabled = true;
    document.getElementById("reset-btn").disabled = false;

  }

  function displayError() {
    var para = document.createElement("p");
    var node = document.createTextNode("I do not have any advice for that topic.");
    para.appendChild(node);
    var element = document.getElementById("div1");
    element.innerHTML = para.innerHTML;
    document.getElementById("get-advice").disabled = true;
    document.getElementById("random-advice").disabled = true;
    document.getElementById("reset-btn").disabled = false;
  }

  function noInput() {
    var para = document.createElement("p");
    var node = document.createTextNode("You forgot to tell me what you need advice on. Please reset and try again.");
    para.appendChild(node);
    var element = document.getElementById("div1");
    element.innerHTML = para.innerHTML;
    document.getElementById("get-advice").disabled = true;
    document.getElementById("random-advice").disabled = true;
    document.getElementById("reset-btn").disabled = false;
  }

  function imageChange()
    {
    document.getElementById('image').src="./assets/advice-image.png";
    }

  function stopShaking()
  {
    document.getElementById('image').classList.remove("eight-ball-image");
  }

  function startShaking()
  {
    document.getElementById('image').classList.add("eight-ball-image");
  }

  function resetPage()
  {
    location.reload();
  }

module.exports = getAdvice()
module.exports = getRandomAdvice()
module.exports = displayAdvice()
module.exports = displayError()
module.exports = addAdvice()
