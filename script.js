
const preguntas = [
  "Si me doy cuenta de lo que el otro está por preguntar, me anticipo y le contesto directamente, para ahorrar tiempo.",
  "Mientras escucho a otra persona, me adelanto en el tiempo y me pongo a pensar en lo que le voy a responder.",
  "En general procuro centrarme en qué está diciendo el otro, sin considerar cómo lo está diciendo.",
  "Mientras estoy escuchando, digo cosas como ¡Ajá!, Hum... Entiendo... para hacerle saber a la otra persona que le estoy prestando atención.",
  "Creo que a la mayoría de las personas no le importa que las interrumpa, siempre que las ayude en sus problemas.",
  "Cuando escucho a algunas personas, mentalmente me pregunto: ¿por qué les resultará tan difícil ir directamente al grano?",
  "Cuando una persona realmente enojada expresa su molestia, yo simplemente dejo que lo que dice 'me entre por un oído y me salga por el otro'.",
  "Si no comprendo lo que una persona está diciendo, hago las preguntas necesarias hasta lograr entender.",
  "Solamente discuto con una persona cuando sé positivamente que estoy en lo cierto.",
  "Dado que he escuchado las mismas quejas y protestas infinidad de veces, generalmente, me dedico mentalmente a otra cosa mientras escucho.",
  "El tono de la voz de una persona me dice, generalmente, mucho más que las palabras mismas.",
  "Si una persona tiene dificultades en decirme algo, generalmente la ayudo a expresarse.",
  "Si no interrumpiera a las personas de vez en cuando, estas terminarían hablándome durante horas.",
  "Cuando una persona me dice tantas cosas juntas que siento superada mi capacidad para retenerlas, trato de poner mi mente en otra cosa para no alterarme.",
  "Si una persona está muy enojada, lo mejor que puedo hacer es escucharla hasta que descargue toda la presión.",
  "Si entiendo lo que una persona me acaba de decir, me parece redundante volver a preguntarle para verificar.",
  "Cuando una persona está equivocada acerca de algún punto de su problema, es importante interrumpirla y hacer que replantee ese punto de manera correcta.",
  "Cuando he tenido un contacto negativo con una persona (discusión, pelea...), no puedo evitar seguir pensando en ese episodio, aún después de haber iniciado un contacto con otra persona.",
  "Cuando le respondo a las personas, lo hago en función de la manera en que percibo cómo ellas se sienten.",
  "Si una persona no puede decirme exactamente qué quiere de mí, no hay nada que yo pueda hacer."
];

function comenzarTest() {
// Ya no se requiere nombre, así que removemos la validación
document.getElementById('introSection').style.display = 'none';
document.getElementById('testSection').style.display = 'block';
const container = document.getElementById("questionsContainer");
preguntas.forEach((texto, i) => {
const numero = i + 1;
const card = document.createElement("div");
card.className = "card mb-3 p-3";
card.innerHTML = `
  <p><strong>${numero}.</strong> ${texto}</p>
  <div class="btn-group" role="group">
    <input type="radio" class="btn-check" name="q${numero}" id="q${numero}-si" value="si">
    <label class="btn btn-outline-success" for="q${numero}-si">Sí</label>
    <input type="radio" class="btn-check" name="q${numero}" id="q${numero}-no" value="no">
    <label class="btn btn-outline-danger" for="q${numero}-no">No</label>
  </div>
`;
container.appendChild(card);
});
document.querySelectorAll('input[type="radio"]').forEach(input => {
input.addEventListener('change', updateProgress);
});
}


function updateProgress() {
  let answered = 0;
  for (let i = 1; i <= preguntas.length; i++) {
    if (document.querySelector(`input[name="q${i}"]:checked`)) answered++;
  }
  const percent = (answered / preguntas.length) * 100;
  const bar = document.getElementById("progressBar");
  bar.style.width = `${percent}%`;
  bar.innerText = `${Math.round(percent)}%`;
}

function analizarRespuestas() {
    const respuestas = {};
    for (let i = 1; i <= preguntas.length; i++) {
      const seleccionada = document.querySelector(`input[name="q${i}"]:checked`);
      if (!seleccionada) {
        alert("Por favor, responde todas las preguntas.");
        return;
      }
      respuestas[`q${i}`] = seleccionada.value;
    }

    let item1 = 0, item2 = 0, item3 = 0, item4 = 0;

    // Ítem 1: preguntas 1, 5, 9, 13, 17 — se cuentan NO
    if (respuestas.q1 === 'no') item1++;
    if (respuestas.q5 === 'no') item1++;
    if (respuestas.q9 === 'no') item1++;
    if (respuestas.q13 === 'no') item1++;
    if (respuestas.q17 === 'no') item1++;

    // Ítem 2: preguntas 2, 6, 10, 14, 18 — se cuentan NO
    if (respuestas.q2 === 'no') item2++;
    if (respuestas.q6 === 'no') item2++;
    if (respuestas.q10 === 'no') item2++;
    if (respuestas.q14 === 'no') item2++;
    if (respuestas.q18 === 'no') item2++;

    // Ítem 3: preguntas 3, 7 (NO) — 11, 15, 19 (SÍ) - Esto debería permanecer igual
    if (respuestas.q3 === 'no') item3++;
    if (respuestas.q7 === 'no') item3++;
    if (respuestas.q11 === 'si') item3++;
    if (respuestas.q15 === 'si') item3++;
    if (respuestas.q19 === 'si') item3++;

    // Ítem 4: preguntas 4, 8, 12 (SÍ) — 16, 20 (NO) - Esto debería permanecer igual
    if (respuestas.q4 === 'si') item4++;
    if (respuestas.q8 === 'si') item4++;
    if (respuestas.q12 === 'si') item4++;
    if (respuestas.q16 === 'no') item4++;
    if (respuestas.q20 === 'no') item4++;

    // Interpretación por ítem
    const r1 = item1 === 5 ?
      "Ud. sabe escuchar sin interrumpir. Su paciencia le permitirá generar muy buenas relaciones." :
      item1 >= 3 ?
      "A veces Ud. se pone a hablar encima de la otra persona... Si Ud. permitiera que las personas terminen antes de comenzar a hablar, sus contactos con ellas serán más simples y satisfactorios." :
      "Ud. parece estar tan ansioso por hablar que no puede escuchar... ¿Cómo puede relacionarse con las personas si no las escucha?";

    const r2 = item2 === 5 ?
      "Ud. tiene la disciplina y serenidad para prestar a las personas la atención que merecen. Esto le permitirá desarrollar excelentes relaciones interpersonales. ¡Felicitaciones!" :
      item2 >= 3 ?
      "Si lograra no desconcentrarse, Ud. lograría contactos personales más duraderos y satisfactorios." :
      "Seguramente Ud. con frecuencia se encuentra diciendo... ¿Qué? ¿Cómo? ¿Qué dijo? Reconozca que entender a las personas requiere el 100% de su atención...!!!";

    const r3 = item3 === 5 ?
      "Ud. es un oyente empático... logra percibir cómo se sienten las personas con que habla... Ud. tiene la capacidad para entender y ayudar a las personas..." :
      item3 >= 3 ?
      "Ud. se da cuenta de cómo se sienten las personas... pero le da más peso al mensaje explícito..." :
      "Ud. no parece darse cuenta de cómo se sienten las personas con que habla...";

    const r4 = item4 === 5 ?
      "Ud. hace todo lo necesario para que la otra persona se pueda expresar... Ud. logrará contactos muy satisfactorios..." :
      item4 >= 3 ?
      "Ud. es un oyente activo... pero no está haciendo todo lo posible..." :
      "Ud. parece no querer involucrarse demasiado en sus contactos...";

    // Mostrar resultados
    const resultHTML = `
    <div id="reporte">
      <h3 class="text-center">Informe de Escucha Activa</h3>
      <div class="card mb-3"><div class="card-header bg-primary text-white">Escuchar sin interrumpir</div><div class="card-body">${r1}</div></div>
      <div class="card mb-3"><div class="card-header bg-success text-white">Atención plena</div><div class="card-body">${r2}</div></div>
      <div class="card mb-3"><div class="card-header bg-info text-white">Percibir emociones</div><div class="card-body">${r3}</div></div>
      <div class="card mb-3"><div class="card-header bg-warning text-dark">Facilitar la expresión</div><div class="card-body">${r4}</div></div>
    </div>
    `;

    document.getElementById("result").innerHTML = resultHTML;
    document.getElementById("resultSection").style.display = "block";
    document.getElementById("resultSection").scrollIntoView({ behavior: 'smooth' });
  }
  

function descargarPDF() {
const element = document.getElementById("reporte");

// Usar un pequeño retardo para asegurar que el DOM esté listo
setTimeout(() => {
html2pdf().set({
  margin: 1,
  filename: 'informe_escucha_activa.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
}).from(element).save();
}, 300); // pequeño delay para asegurar render
}

