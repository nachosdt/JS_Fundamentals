// EXPRESIONES REGULARES (REGEXP)
console.log("\nEXPRESIONES REGULARES\n");
// Creación de expresiones regulares
let expreg = /s$/; // Hace match a cualquier string que termine en s
expreg = new RegExp("s$");

// Buscar palabras determinadas
expreg = /palabra/;
// Todos los carácteres alfabéticos y numéricos tienen valor literal en las expresiones regulares
// Otros carácteres no alfanuméricos también tienen valor literal:
expreg = /\n/; // Nueva linea
expreg = /\t/; // Tabulación
expreg = /\0/; // Caracter null
expreg = /\b/; // Espacio
expreg = /\v/; // Tabulación vertical
expreg = /\x00/; // Caracter Latino del número hexadecimal
expreg = /\u0000/; // Caracter Unicode del número hexadecimal

// Agrupar caracteres
expreg = /[abc]/ // Cualquier caracter incluido entre los corchetes
expreg = /[^abc]/ // Cualquier caracter no incluido entre los corchetes
expreg = /[a-zA-z0-9]/ // Cualquier carácter alfanumérico del alfabeto latino

// Agrupaciones comunes
expreg = /\s/; // Espacio, tabulación y cualquier tipo de espacio en blanco
expreg = /\S/; // Cualquier caracter DISTINTO de espacio en blanco
expreg = /\w/; // Cualquier letra ASCII ([a-zA-z0-9])
expreg = /\W/; // Cualquier caracter que no sea una letra ASCII ([^a-zA-z0-9])
expreg = /\d/; // Cualquier dígito ([0-9])
expreg = /\D/; // Cualquier carácter que no sea un dígito ([^0-9])

// Repeticiones
expreg = /\d\d\d\d/;
console.log('"1234".search(/\d\d\d\d/) =',"1234".search(expreg));
console.log('"123".search(/\d\d\d\d/) =',"123".search(expreg));
console.log('"12345".search(/\d\d\d\d/) =',"12345".search(expreg));

expreg = /\d{1,4}/; // Entre 1 y 4 repeticiones
expreg = /\d{1,}/; // 1 o más repeticiones
expreg = /\d{3}/; // Exáctamente 3 repeticiones
expreg = /\d?/; // 0 o 1 repeticiones ({0,1})
expreg = /\d+/; // Una o más repeticiones ({1,})
expreg = /\d*/; // 0 o más repeticiones ({0,})

// Por defecto, este tipo de repeticiones son "greedy".
// Para que la repetición sea "non-greedy", hay que añadir una interrogación ?
expreg = /a+/; // Una o más repeticiones de a
console.log('"aaa".match(/a+/) =', "aaa".match(expreg));
expreg = /a+?/;
console.log('"aaa".match(/a+?/) =', "aaa".match(expreg));


// Alternativas
expreg = /\d|[a-z]/; // Un dígito o una letra
// Las posibles alternativas se leen de izquierda a derecha
// Si la de la izquierda hace match, la de la derecha se ignora
expreg = /a|ab/;
console.log('"ab".match(/a|ab/) =', "ab".match(expreg)); // Sólo hace match a primera a

// Agrupación
expreg = /(ab|cd){1,3}|ef/; // Entre 1 y 3 repeticines de ab o cd, o la cadena ef
// Las agrupaciones con paréntesis también permiten extraer porciones de la cadena
expreg = /[a-z]+(\d)/; // Podemos extraer el dígito
// También se usan para referirse a subexpresines de la propia expresión regular
expreg = /(['"])[^'"]*\1/; // El número \1 se refiere al texto del primer paréntesis.
// Otra forma de agrupar es con (?:...) 
expreg = /([Jj]ava(?:[Ss]cript)?)\sis\s(fun\w*)/;
// Aí también se pueden nombrar las subexpresiones regulares
expreg = /(?<comillas>['"])[^'"]*\k<comillas>/;

// Anchors
expreg = /\sJava\s/;
console.log('" Java ".match(/\\sJava\\s/) =', " Java ".match(expreg));
console.log('"Java".match(/\\sJava\\s/) =', "Java".match(expreg));
expreg = /\bJava\b/;
console.log('" Java ".match(/\\bJava\\b/) =', " Java ".match(expreg)); 

expreg = /^A/; // El principio de una cadena 
expreg = /A$/; // El final una cadena 
expreg = /A\b/; // Hace match de la posición que separa un carácter alfanumérico y otro no alfanumérico
expreg = /A\B/; // Hace match a la posición que no marca un límite entre palabras

// Flags
expreg = /regexp/g; // Global match
expreg = /regexp/i; // Case insentitive
expreg = /regexp/m; // Multiline
expreg = /regexp/s; // "." match el fin de linea
expreg = /regexp/u; // Unicode
expreg = /regexp/y; // Sticky RegExp. Hace match al principio de una cadena o en el primer carácter a continuación
// del match previo

// Métodos de los string para el pattern matching
"Javascript".search(/script/ui); // Devuelve el índice de la coincidencia o -1 si no existe coincidencia
"JAVasCript".replace(/javascript/gi,"JavaScript"); // Sin la flag g únicamente sustituye la primera coincidencia
// replace() permite trabajar con subexpresiones entre paréntesis
expreg = /"([^"]*)"/g;
console.log('Sustitución de "comillas"'.replace(expreg,'<<$1>>'));
expreg = /"(?<textoEntreComillas>[^"]*)"/g;
console.log('Sustitución de "comillas"'.replace(expreg,'ç$<textoEntreComillas>ç'));
// También se puede pasar como segundo argumento una callbak para trasformar el texto coincidente
console.log("11 12 13 14 15".replace(/\d+/gu, n => parseInt(n)+1));

let url = /(\w+):\/\/([\w.]+)\/(\S*)/;
let texto = "Visita mi web en http://www.W3Schools.com/Javascript";
let match = texto.match(url);
let fullurl, protocol, host, path;
if (match!==null) {
    fullurl = match[0];
    protocol = match[1];
    host = match[2];
    path = match[3];
}
console.log(fullurl);
console.log(protocol);
console.log(host);
console.log(path);

url = /(?<protocol>\w+):\/\/(?<host>[\w.]+)\/(?<path>\S*)/;
match = texto.match(url);
console.log(match[0]);
console.log(match.input);
console.log(match.index);
console.log(match.groups.protocol);
console.log(match.groups.host);
console.log(match.groups.path);

let palabras = /\b\p{Alphabetic}+\b/gu;
texto = "Vamos a probar el método .matchAll().";
for (let palabra of texto.matchAll(palabras)) {
    console.log(`Palabra "${palabra}" en el indice ${palabra.index}`);
}

console.log("1    ,     2   ,3,     4".split(/\s*,\s*/));

// La clase RegExp
expreg = new RegExp("\\d{5}", "g"); 
// Propiedades:
expreg.source; // Valor de la expresión regular sin / 
expreg.flags; // flags de la expresión regular
expreg.global; // Distintas flags
expreg.ignoreCase;
expreg.multiline;
expreg.dotAll;
expreg.unicode;
expreg.sticky;
expreg.lastIndex; // Especifica el índice desde el cual se empezará a buscar coincidencias
// cuando se usan las flags g o y

// Métodos
expreg.test(texto); // Devuelve true o false
expreg.exec(texto); // Devuelve un array o null, si no hay coincidencias