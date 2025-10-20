document.getElementById("calculateBtn").addEventListener("click", function () {
  const ageValue = document.getElementById("age").value.trim();
  const heightValue = document.getElementById("height").value.trim();
  const weightValue = document.getElementById("weight").value.trim();

  const resultDiv = document.getElementById("result");
  const tipDiv = document.getElementById("tip");

  if (ageValue === "" || heightValue === "" || weightValue === "") {
    resultDiv.textContent = "⚠️ Please fill all fields!";
    tipDiv.textContent = "";
    return;
  }

  const age = parseFloat(ageValue);
  let height = parseFloat(heightValue);
  let weight = parseFloat(weightValue);
  const heightUnit = document.getElementById("heightUnit").value;
  const weightUnit = document.getElementById("weightUnit").value;

  // Convert units
  if (heightUnit === "ft") height = height * 30.48;
  if (weightUnit === "lbs") weight = weight * 0.453592;

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (isNaN(bmi) || bmi <= 0) {
    resultDiv.textContent = "❌ Invalid input!";
    tipDiv.textContent = "";
    return;
  }

  const bmiValue = bmi.toFixed(1);
  resultDiv.textContent = `Your BMI: ${bmiValue}`;

  // ✅ Age-specific BMI logic
  let tip = "";
  let minIdeal, maxIdeal;

  if (age < 18) {
    tip = "You are under 18. Consult a doctor for accurate BMI for teens.";
    resultDiv.style.color = "#00c3ff";
  } else if (age >= 18 && age <= 64) {
    minIdeal = (18.5 * heightInMeters ** 2).toFixed(1);
    maxIdeal = (24.9 * heightInMeters ** 2).toFixed(1);

    if (bmi < 18.5) {
      tip = "You're underweight. Eat more healthy fats and proteins.";
      resultDiv.style.color = "#00c3ff";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      tip = "You're in a healthy range. Keep maintaining your lifestyle!";
      resultDiv.style.color = "#00ff95";
    } else if (bmi >= 25 && bmi <= 29.9) {
      tip = "You're overweight. Add cardio and eat balanced meals.";
      resultDiv.style.color = "#ffb142";
    } else {
      tip = "You're obese. Focus on fitness and consult a nutritionist.";
      resultDiv.style.color = "#ff4d4d";
    }
  } else {
    minIdeal = (23 * heightInMeters ** 2).toFixed(1);
    maxIdeal = (30 * heightInMeters ** 2).toFixed(1);
    tip =
      "For age 65+, BMI values are interpreted differently. Maintain strength & mobility.";
    resultDiv.style.color = "#ffaa00";
  }

  // Display
  tipDiv.innerHTML = `
    <strong>Age:</strong> ${age}<br>
    ${tip}<br>
    ${
      minIdeal && maxIdeal
        ? `Ideal Weight Range: ${minIdeal}kg - ${maxIdeal}kg`
        : ""
    }
  `;
});

// Reset
document.getElementById("resetBtn").addEventListener("click", function () {
  document.getElementById("age").value = "";
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("tip").textContent = "";
});
