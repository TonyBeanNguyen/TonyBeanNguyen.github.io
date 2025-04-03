function checkWeather() {
  let myTemp = document.querySelector("#myTemp");
  console.log(myTemp);
  let temp = myTemp.Value;
  console.log("temp value is", temp);
  if (temp < 10) {
    console.log("it is freezing");
    body.style.backgroundColor = "Gray";
  } else if (temp >= 10 && temp < 20) {
    console.log("it is pleasant weather");
    body.style.backgroundColor = "Blue";
  } else if (temp >= 20 && temp < 35) {
    console.log("it is nice and sunny");
    body.style.backgroundColor = "Green";
  } else if (temp >= 35) {
    console.log("it is burning hot");
    body.style.backgroundColor = "Crimson";
  }
}
