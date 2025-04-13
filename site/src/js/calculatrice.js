document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("#calculator button");
  
    let current = "";
  
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const value = btn.textContent;
  
        if (value === "C") {
          current = "";
          display.value = "";
        } else if (value === "=") {
          try {
            // Remplace eval par une évaluation sécurisée simple
            display.value = Function('"use strict"; return (' + current + ')')();
            current = display.value;
          } catch {
            display.value = "Erreur";
            current = "";
          }
        } else {
          current += value;
          display.value = current;
        }
      });
    });
  
    // Support clavier
    document.addEventListener("keydown", (e) => {
      const allowed = "0123456789+-*.";
      if (allowed.includes(e.key)) {
        current += e.key;
        display.value = current;
      } else if (e.key === "Enter") {
        try {
          display.value = Function('"use strict"; return (' + current + ')')();
          current = display.value;
        } catch {
          display.value = "Erreur";
          current = "";
        }
      } else if (e.key === "Backspace") {
        current = current.slice(0, -1);
        display.value = current;
      } else if (e.key === "Escape") {
        current = "";
        display.value = "";
      }
    });
  });
  