function component() {
  let ele = document.createElement('div');
  ele.innerHTML = `Hello`;
  return ele;
}

document.body.appendChild(component());
