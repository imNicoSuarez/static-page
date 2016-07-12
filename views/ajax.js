

function callbackListener() {
  console.log('asdasd');
  console.log(this.responseText);
}

var req =  new XMLHttpRequest();
req.addEventListener('load', callbackListener);
req.open('GET', 'http://jsonplaceholder.typicode.com/users/1');

req.send();