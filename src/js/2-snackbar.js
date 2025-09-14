import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
form.addEventListener('submit', clickButton);
function clickButton(event) {
  event.preventDefault();
  const radioValue = event.target.elements.state.value;
  const delay = event.target.elements.delay.value;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioValue === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, Number(delay));
  })
    .then(date =>
      iziToast.show({
        ...baseToast,
        message: `✅ Fulfilled promise in ${date}ms`,
        backgroundColor: 'green',
      })
    )
    .catch(error =>
      iziToast.show({
        ...baseToast,
        message: `❌ Rejected promise in ${error}ms`,
        backgroundColor: 'red',
      })
    );
}

const baseToast = {
  position: 'center',
  timeout: 3000,
  messageSize: '30',
  messageLineHeight: '75',
};
