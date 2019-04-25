function main() {
  console.log("En main()....");

  //-- Acceso al objeto con la imagen
  var img = document.getElementById('imagesrc');
  //-- Acceso al objeto con el canvas
  var canvas = document.getElementById('display');
  //-- Acceso a los deslizadores
  deslizadorR = document.getElementById('deslizadorR');
  deslizadorG = document.getElementById('deslizadorG');
  deslizadorB = document.getElementById('deslizadorB');
  //-- Valores de los deslizadores
  range_valueR = document.getElementById('range_valueR');
  range_valueG = document.getElementById('range_valueG');
  range_valueB = document.getElementById('range_valueB');
  grey = document.getElementById('boton1');
  botonoriginal = document.getElementById('botonoriginal');
    botonoriginal.onclick = () => {
        ctx.drawImage(img, 0,0);
    }

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Obtener el contexto del canvas para
  //-- trabajar con el
  var ctx = canvas.getContext("2d");

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  grey.onclick=()=>{
    var imgDataG = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //-- Obtener el array con todos los píxeles
    var data = imgDataG.data

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
      var r = data[i];
      var g = data[i+1];
      var b = data[i+2];
      //tambien he encontrado que va con:
      // var v = 0.2126*r + 0.7152*g + 0.0722*b;
      var v = (3*r +4*g + b)/8;
      data[i] = data[i+1] = data[i+2] = v
      }
      ctx.putImageData(imgDataG, 0, 0);
  }

  function RGB(){

    ctx.drawImage(img, 0,0);
    range_valueR.innerHTML = deslizadorR.value;
    range_valueG.innerHTML = deslizadorG.value;
    range_valueB.innerHTML = deslizadorB.value;

    //-- Obtener la imagen del canvas en pixeles
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    var data = imgData.data

    //-- Obtener los umbrales
    var umbralRojo = deslizadorR.value
    var umbralVerde = deslizadorG.value
    var umbralAzul = deslizadorB.value

    //-- Filtrar la imagen según los nuevos umbrales
    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralRojo)
          data[i] = umbralRojo;
      if (data[i+1] > umbralVerde)
          data[i+1] = umbralVerde;
      if (data[i+2] > umbralAzul)
          data[i+2] = umbralAzul;
    }
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  //-- Funcion de retrollamada de los deslizadores
  deslizadorR.oninput = () => {
    RGB()
  }

  deslizadorG.oninput = () => {
    RGB()
  }

  deslizadorB.oninput = () => {dd
    RGB()
  }
}
