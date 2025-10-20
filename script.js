document.getElementById("calculateBtn").addEventListener("click", function() {
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const heightUnit = document.getElementById("heightUnit").value;

  const bmiValue = document.getElementById("bmiValue");
  const bmiMessage = document.getElementById("bmiMessage");

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    bmiValue.textContent = "";
    bmiMessage.textContent = "Please enter valid height and weight!";
    bmiMessage.style.color = "red";
    return;
  }

  // Convert feet to centimeters if selected
  let heightInMeters;
  if (heightUnit === "ft") {
    heightInMeters = height * 0.3048; // 1 foot = 0.3048 meters
  } else {
    heightInMeters = height / 100; // cm to m
  }

  const bmi = (weight / (heightInMeters ** 2)).toFixed(1);
  bmiValue.textContent = `Your BMI: ${bmi}`;

  if (bmi < 18.5) {
    bmiMessage.textContent = "You are underweight 😕";
    bmiMessage.style.color = "#f39c12";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    bmiMessage.textContent = "You have a normal weight 😊";
    bmiMessage.style.color = "#27ae60";
  } else if (bmi >= 25 && bmi < 29.9) {
    bmiMessage.textContent = "You are overweight 😬";
    bmiMessage.style.color = "#e67e22";
  } else {
    bmiMessage.textContent = "You are obese 😔";
    bmiMessage.style.color = "#e74c3c";
  }
});
