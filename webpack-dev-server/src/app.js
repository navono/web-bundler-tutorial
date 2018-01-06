import './assets/css/style.css';

function component() {
  var ele = document.createElement('div');
  ele.innerHTML = 'Hello, Webpack 3!';
  return ele;
}

document.body.appendChild(component());
