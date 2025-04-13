const questionnaire = [
    { qlabel: 'Quel est le Goty de 2022 ?', qid: 1, reponses: [
        { rlabel: 'Elden Ring', rid: 1 },
        { rlabel: 'Zelda', rid: 2 },
        { rlabel: 'Mario', rid: 3 }
    ] },
    { qlabel: 'Quel est le studio derriere Cyberpunk 2077 ?', qid: 2, reponses: [
        { rlabel: 'Larian', rid: 1 },
        { rlabel: 'CDPR', rid: 2 },
        { rlabel: 'Fromsoftware', rid: 3 }
    ] },
    { qlabel: 'Lequel de ces films est un ghibli ?', qid: 3, reponses: [
        { rlabel: 'Flow', rid: 1 },
        { rlabel: 'Le voyage de chihiro', rid: 2 },
        { rlabel: 'Avengers : Infinity war', rid: 3 }
    ] },
    { qlabel: 'Quel jeu a pour personnage jouable un chat ?', qid: 4, reponses: [
        { rlabel: 'Animal Crossing', rid: 1 },
        { rlabel: 'God Of War', rid: 2 },
        { rlabel: 'Stray', rid: 3 }
    ] },
    { qlabel: 'Combien faut il depense sur StarCitizen pour etre Concierge ?', qid: 5, reponses: [
        { rlabel: '100', rid: 1 },
        { rlabel: '1000', rid: 2 },
        { rlabel: '500', rid: 3 }
    ] }
];

let reponsesUtilisateur = "";
let currentQuestionIndex = 0;

function afficherQuestion() {
    const container = document.getElementById("questionnaire-container");
    container.innerHTML = "";
    
    if (currentQuestionIndex < questionnaire.length) {
        const question = questionnaire[currentQuestionIndex];
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `<p class='text-xl text-center font-bold'>${question.qlabel}</p>`;
        
        question.reponses.forEach(reponse => {
            const button = document.createElement("button");
            button.textContent = reponse.rlabel;
            button.className = "btn btn-accent hover:bg-accent-focus hover:scale-105 focus:outline-2 focus:outline-offset-2 btn-lg block mx-auto m-9";
            button.onclick = () => enregistrerReponse(question.qid, reponse.rid);
            questionElement.appendChild(button);
        });
        
        container.appendChild(questionElement);
    } else {
        verifierRedirection();
    }
}

function enregistrerReponse(qid, rid) {
    reponsesUtilisateur += `Q${qid}_R${rid}`;
    currentQuestionIndex++;
    afficherQuestion();
}

function verifierRedirection() {
    const container = document.getElementById("questionnaire-container");
    const correctPath = "Q1_R1Q2_R2Q3_R2Q4_R3Q5_R2.html";

    if (reponsesUtilisateur === "Q1_R1Q2_R2Q3_R2Q4_R3Q5_R2") {
        window.location.href = correctPath;
        return;
    }

    const pageCible = `${reponsesUtilisateur}.html`;
    
    fetch(pageCible, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                window.location.href = pageCible;
            } else {
                container.innerHTML = `<p class='text-red-500'>Suite à vos réponses, vous ne souhaitez pas être contacté.</p>`;
            }
        })
        .catch(() => {
            container.innerHTML = `<p class='text-red-500'>Suite à vos réponses, vous ne souhaitez pas être contacté.</p>`;
        });
}


function bruteForce() {
  const possibleResponses = questionnaire.map(q =>
    q.reponses.map(r => `Q${q.qid}_R${r.rid}`)
  );
  const combinaisons = produitCartesien(possibleResponses).map(arr => arr.join(""));

  let i = 0;
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  function tryNext() {
    if (i >= combinaisons.length) {
      return;
    }

    const filename = `${combinaisons[i]}.html`;
    iframe.src = filename;

    iframe.onload = () => {
      window.location.href = filename;
    };

    iframe.onerror = () => {
      i++;
      tryNext();
    };
    setTimeout(() => {
      i++;
      tryNext();
    }, 50);
  }

  tryNext();
}

function produitCartesien(arr) {
  return arr.reduce((a, b) => a.flatMap(x => b.map(y => [...x, y])), [[]]);
}



function cartesianProduct(arr) {
    return arr.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
}


document.addEventListener("DOMContentLoaded", afficherQuestion);
