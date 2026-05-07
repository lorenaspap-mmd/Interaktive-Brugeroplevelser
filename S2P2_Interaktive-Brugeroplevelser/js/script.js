const app = document.querySelector("#app");

const scenarios = [
  {
    title: "Phishing-mail",
    intro: "Det er søndag aften, og du gør klar til en ny studieuge.",
    situation: "Du gennemgår dine studiemails og ser en mail, der siger, at din adgang til studieplatformen bliver lukket om 24 timer, hvis du ikke bekræfter dit login.",
    choices: [
      {
        text: "Klikker på linket",
        result: "wrong",
        feedback: "Du har valgt at klikke på linket, og derfor risikerer du at give dine loginoplysninger til en falsk hjemmeside, som kan få adgang til din studieprofil og dine afleveringer."
      },
      {
        text: "Rapporterer mailen til IT",
        result: "correct",
        feedback: "Du har valgt at rapportere mailen til IT, og derfor hjælper du både dig selv og andre studerende med at undgå phishing-forsøg."
      },
      {
        text: "Ignorerer mailen",
        result: "okay",
        feedback: "Du har valgt at ignorere mailen, og derfor undgår du selv at blive snydt, men phishing-mailen kan stadig ramme andre studerende, hvis den ikke bliver rapporteret."
      }
    ]
  },
  {
    title: "Offentligt WiFi",
    intro: "Du sidder på en café og arbejder på en vigtig aflevering.",
    situation: "Du skal hurtigt logge ind på Wiseflow inden deadline. Caféen har åbent WiFi uden adgangskode.",
    choices: [
      {
        text: "Logger ind direkte på caféens WiFi",
        result: "wrong",
        feedback: "Du har valgt at logge ind på åbent WiFi, og derfor risikerer du, at andre på netværket kan opsnappe dine loginoplysninger eller studieoplysninger."
      },
      {
        text: "Bruger mobildata i stedet",
        result: "correct",
        feedback: "Du har valgt at bruge mobildata, og derfor undgår du risikoen ved at logge ind på Wiseflow gennem et offentligt netværk."
      },
      {
        text: "Tjekker HTTPS og er forsigtig",
        result: "okay",
        feedback: "Du har valgt at tjekke HTTPS, og derfor beskytter du dine data bedre end ved almindelig surfing, men åbent WiFi er stadig mindre sikkert end en privat forbindelse."
      }
    ]
  },
  {
    title: "Download program",
    intro: "Du mangler et program til din næste aflevering.",
    situation: "Du finder en gratis version på en ukendt hjemmeside, som lover hurtig download uden login.",
    choices: [
      {
        text: "Downloader programmet med det samme",
        result: "wrong",
        feedback: "Du har valgt at downloade programmet fra en ukendt hjemmeside, og derfor risikerer du at installere malware, som kan skade dine filer eller stjæle dine data."
      },
      {
        text: "Finder programmet via en officiel kilde",
        result: "correct",
        feedback: "Du har valgt at hente programmet fra en officiel kilde, og derfor mindsker du risikoen for virus eller falske programmer."
      },
      {
        text: "Spørger en medstuderende om et link",
        result: "okay",
        feedback: "Du har valgt at spørge en medstuderende, og derfor er chancen større for at finde et sikkert program, men linket kan stadig komme fra en usikker kilde."
      }
    ]
  },
  {
    title: "Password",
    intro: "Du skal oprette login til en ny studieplatform.",
    situation: "Du vil gerne vælge et password, som er nemt at huske.",
    choices: [
      {
        text: "Bruger et kort password som iba123",
        result: "wrong",
        feedback: "Du har valgt et kort og simpelt password, og derfor er det lettere for andre at gætte sig frem til din konto."
      },
      {
        text: "Genbruger et password fra en anden konto",
        result: "okay",
        feedback: "Du har valgt at genbruge et password, og derfor kan et tidligere datalæk give adgang til flere af dine konti samtidig."
      },
      {
        text: "Laver et langt og unikt password",
        result: "correct",
        feedback: "Du har valgt et langt og unikt password, og derfor bliver det sværere for andre at få adgang til din studieprofil."
      }
    ]
  }
];

function showStart() {
  app.innerHTML = `
    <h1>Velkommen til nye og nuværende studerende på erhvervsakademiuddannelser</h1>
    <p>Som studerende bruger du digitale platforme næsten hver dag. Her kan du teste din viden om datasikkerhed gennem fire korte scenarier, og derved forbedre dit videre studieforløb.</p>
    <p>Gennemgå alle scenarier og se, hvordan dine digitale valg kan påvirke din sikkerhed som studerende.</p>

    <div class="scenario-grid">
      ${scenarios.map((scenario, index) => `
        <article class="scenario-card">
          <h2>${scenario.title}</h2>
          <button data-index="${index}">Vælg scenarie</button>
        </article>
      `).join("")}
    </div>
  `;

  const buttons = document.querySelectorAll("[data-index]");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      showIntro(index);
    });
  });
}

function showIntro(index) {
  const scenario = scenarios[index];

  app.innerHTML = `
    <h1>${scenario.title}</h1>
    <p>${scenario.intro}</p>
    <button id="continueBtn">Fortsæt</button>
  `;

  document.querySelector("#continueBtn").addEventListener("click", function () {
    showScenario(index);
  });
}

function showScenario(index) {
  const scenario = scenarios[index];

  app.innerHTML = `
    <h1>${scenario.title}</h1>
    <p>${scenario.situation}</p>
    <h2>Hvad gør du?</h2>

    <div>
      ${scenario.choices.map((choice, choiceIndex) => `
        <button data-choice="${choiceIndex}">${choice.text}</button>
      `).join("")}
    </div>
  `;

  const buttons = document.querySelectorAll("[data-choice]");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const choiceIndex = this.getAttribute("data-choice");
      const selectedChoice = scenario.choices[choiceIndex];
      showResult(selectedChoice);
    });
  });
}

function showResult(choice) {
  let title = "";
  let image = "";
  let resultClass = "";

  if (choice.result === "wrong") {
    title = "Forkert valg";
    image = "img/wrong.png";
    resultClass = "wrong";
  } else if (choice.result === "okay") {
    title = "Nogenlunde valg";
    image = "img/okay.png";
    resultClass = "okay";
  } else {
    title = "Godt valg";
    image = "img/correct.png";
    resultClass = "correct";
  }

  app.innerHTML = `
    <h1 class="${resultClass}">${title}</h1>
    <img class="result-image" src="${image}" alt="${title}">
    <p class="${resultClass}">${choice.feedback}</p>
    <button id="restartBtn">Tilbage til forsiden</button>
  `;

  document.querySelector("#restartBtn").addEventListener("click", showStart);
}

showStart();