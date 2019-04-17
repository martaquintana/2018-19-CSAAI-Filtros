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
      // CIE luminance for the RGB
      // The human eye is bad at seeing red and blue, so we de-emphasize them.
      var v = 0.2126*r + 0.7152*g + 0.0722*b;
      data[i] = data[i+1] = data[i+2] = v

      }
      ctx.putImageData(imgDataG, 0, 0);
  }
  //-- Funcion de retrollamada del deslizador
  deslizadorR.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    range_valueR.innerHTML = deslizadorR.value
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    var data = imgData.data

    //-- Obtener el umbral de rojo del desliador
    var umbral = deslizadorR.value

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbral)
        data[i] = umbral;
    }
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  deslizadorG.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    range_valueG.innerHTML = deslizadorG.value

    var imgData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    var data = imgData2.data

    //-- Obtener el umbral de rojo del desliador
    var umbral2 = deslizadorG.value

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
      if (data[i+1] > umbral2)
        data[i+1] = umbral2;
    }

    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData2, 0, 0);
  }

  deslizadorB.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    range_valueB.innerHTML = deslizadorB.value
    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    var imgData3 = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    var data = imgData3.data


    //-- Obtener el umbral de rojo del desliador
    var umbral3 = deslizadorB.value

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
      if (data[i+2] > umbral3)
        data[i+2] = umbral3;
    }

    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData3, 0, 0);
  }


}
