// DATE

let fecha = new Date();
console.log(fecha);


// Si al constructor se le pasa un único argumento numérico,
// son los milisegundos desde el 1/1/1970
fecha = new Date(0); // 1/1/1970 00:00:00
console.log(fecha);

// Si se le pasa más de un argumento, se interpretan como
// año, mes, día, hora, minutos, segundos y milisegundos en la hora local
// Cuidado: enero corresponde al numero 0
fecha = new Date(2021,10,5,9,0,0,0);
console.log(fecha);

// Si se omite la hora, por defecto se toma medianoche 00:00:00
fecha = new Date(2021,5,9);
console.log(fecha);

// Para especigicar una fecha y hora en UTC/GMT:
fecha = new Date(Date.UTC(2021,10,5));

// También se puede pasar un string al constructor
fecha = new Date("2021-10-11");
console.log(fecha);

// Distintos formatos de fecha:
console.log("toISOString()", fecha.toISOString());
console.log("toUTCString()", fecha.toUTCString());
console.log("toDateString()", fecha.toDateString());
console.log("toLocaleDateString()", fecha.toLocaleDateString());
console.log("toTimeString()", fecha.toTimeString());
console.log("toLocaleTimeString()", fecha.toLocaleTimeString());
console.log("toString()", fecha.toString());

// Getters y Setters
fecha.getFullYear();
fecha.getMonth();
fecha.getDate();
fecha.getDay(); // Día de la semana del 0 al 6
fecha.getHours();
fecha.getMinutes();
fecha.getSeconds();
fecha.getMilliseconds();

fecha.setFullYear(2020);
fecha.setUTCFullYear(2020);

// PAra trabajar con milisegundos:
fecha.getTime();
fecha.setTime(10000000000);
Date.now();

// Las fechas admiten operadores +, -, > y <
