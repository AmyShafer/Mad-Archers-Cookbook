var testButton = document.getElementById("#test");

function getFatSecret() {
    var fatSecret_api = "https://platform.fatsecret.com/js?key=d9911e97996c4e7f8f846708e92e1c91";

    fetch(fatSecret_api)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
}

testButton.addEventListener('click', getFatSecret);

