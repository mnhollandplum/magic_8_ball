  function getAdvice() {
    $('#get-advice').on('click', function(){
      var keyword = document.getElementById("keyword").value
      $.ajax('https://api.adviceslip.com/advice/search/'+ keyword, {
        type: 'GET',
        success: function(response) {
                result = JSON.parse(response);
                slips = (result['slips'])
                rand = [Math.floor(Math.random() * slips.length)];
                advice = slips[rand]['advice']
                displayAdvice(advice)
        }
      })
    })
  }

  function displayAdvice(advice) {
    var para = document.createElement("p");
    var node = document.createTextNode(advice);
    para.appendChild(node);
    var element = document.getElementById("div1");
    element.appendChild(para);
  }
