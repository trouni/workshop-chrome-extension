// TODO: Uncomment the code below

// let active = false;

// function toggleFontPicker() {
//   const displayBoxTemplate = '<div id="font-picker-box">My Font Picker</div>';
//   if (active) {
//     document.getElementById('font-picker-box').remove();
//     document.removeEventListener("mouseover", getFont);
//   } else {
//     document.querySelector('body').insertAdjacentHTML('afterbegin', displayBoxTemplate);
//     document.addEventListener("mouseover", getFont);
//   }
//   active = !active
// }

// const getFont = (event) => {
//   document.getElementById('font-picker-box').innerText = window.getComputedStyle(event.target).fontFamily.split(",")[0];
// }

// TODO: Add a listener using runtime.onMessage.addListener to trigger the toggleFontPicker() action when clicking the button in popup.html
