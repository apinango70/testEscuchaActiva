
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
    "¡Qué gran habilidad! Escuchar con paciencia y sin interrumpir te ayudará a construir relaciones sólidas y significativas." :
    item1 >= 3 ?
      "A veces podrías sentir la tentación de hablar antes de que la otra persona termine. Permitir que los demás terminen sus ideas hará que la comunicación sea más fluida y enriquecedora." :
      "Puede que estés tan entusiasmado por compartir tu opinión que olvides escuchar completamente. Con un poco más de calma, puedes fortalecer tus conexiones con los demás.";

  const r2 = item2 === 5 ?
    "Tu atención plena y disciplina son una gran fortaleza. Estas cualidades te ayudarán a establecer relaciones interpersonales excepcionales. ¡Buen trabajo!" :
    item2 >= 3 ?
      "Enfocarte más plenamente en los demás podría ayudarte a construir relaciones aún más satisfactorias y enriquecedoras." :
      "Es posible que a veces pierdas el hilo de las conversaciones. Dedicar toda tu atención a entender a los demás puede marcar una gran diferencia en tus relaciones.";

  const r3 = item3 === 5 ?
    "¡Impresionante! Tienes una gran capacidad para percibir cómo se sienten las personas con las que hablas. Esto es clave para entenderlas y apoyarlas." :
    item3 >= 3 ?
      "Reconoces las emociones de los demás, aunque podrías centrarte más en entenderlas profundamente para fortalecer tus vínculos." :
      "Podrías pasar por alto algunas señales emocionales de los demás. Prestar más atención a sus sentimientos te permitirá conectar de una manera más cercana.";

  const r4 = item4 === 5 ?
    "¡Excelente! Creas un espacio cómodo para que otros se expresen, lo cual enriquece mucho tus interacciones." :
    item4 >= 3 ?
      "Eres un oyente comprometido, aunque siempre hay oportunidad de involucrarte más para fortalecer tus conversaciones." :
      "Puede que no siempre estés totalmente involucrado en tus interacciones. Tomarte un momento para conectar más profundamente podría ser muy positivo.";

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



