$(document).ready(function(){
  getAdvice();
});

var topic = document.querySelector('#get-advice');
var random = document.querySelector('#random-advice');
var reset = document.querySelector('#reset-btn')
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
                if(result['message']) {
                  displayError(result['message']['text'])
                }
                else {
                slips = (result['slips'])
                rand = [Math.floor(Math.random() * slips.length)];
                advice = slips[rand]['advice']
                setTimeout(displayAdvice(advice), 10000)
                setTimeout(imageChange, 2000)
                setTimeout(stopShaking, 2000)
              }
        }
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
                displayAdvice(advice)
                setTimeout(imageChange, 2000)
                setTimeout(stopShaking, 2000)
              }
      })
      var element = document.getElementById("div1");
      element = ""
    }
  function displayAdvice() {
    var para = document.createElement("p");
    var node = document.createTextNode(advice);
    para.appendChild(node);
    var element = document.getElementById("div1");
    element.innerHTML = para.innerHTML;
  }

  function displayError() {
    var para = document.createElement("p");
    var node = document.createTextNode("I do not have any advice for that topic");
    para.appendChild(node);
    var element = document.getElementById("div1");
    element.innerHTML = para.innerHTML;
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
module.exports = displayAdvice()
module.exports = displayError()
