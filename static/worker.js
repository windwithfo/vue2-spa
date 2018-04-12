onmessage = function(event){
  //向主线程发送event.data.name信息
  console.log(event.data);
  postMessage(event.data.name);
};
window.postMessage('reload');
