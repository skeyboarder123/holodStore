import { html } from '/node_modules/lit-html/lit-html.js';

export function getOrderFormTemplate({ type }) {
  // Вызываем функцию загрузки reCAPTCHA перед попыткой рендеринга
  if (typeof loadRecaptcha === 'function') {
    loadRecaptcha();
  }

  setTimeout(() => {
    if (window.grecaptcha && window.grecaptcha.render) {
      try {
        window.grecaptcha.render('recaptcha-container', {
          callback: function(token) {
            document.getElementById('g-recaptcha-response').value = token;
          },
          'expired-callback': function() {
            document.getElementById('g-recaptcha-response').value = '';
          },
        });
      } catch (e) {
        console.log('reCAPTCHA already rendered');
      }
    }
  }, 500); // Увеличиваем время ожидания до 500мс

  return html`
    <div id="overlay" class="overlay adaptive-text__company">
      <div class="form-container">
        <form
          id="contactForm"
          style=""
          @submit=${(e) => {
            const recaptchaResponse = document.getElementById(
              'g-recaptcha-response'
            );
            if (!recaptchaResponse || !recaptchaResponse.value) {
              e.preventDefault();
              alert('Пожалуйста, подтвердите, что вы не робот');
              return false;
            }
          }}
        >
          <div>
            <h2
              style="
                  width: 100%;
                  font-weight: 600;
                  text-align: center;
                  color: #14193c;
                  margin-bottom: 1vw;
                "
            >
              ${type === 'order' ? 'Создание заказа' : 'Обратный звонок'}
            </h2>
            <p
              class="adaptive-text__company"
              style="width: 100%; text-align: center; color: #14193c; font-weight: 500;"
            >
              Оставьте свои данные и мы с вами свяжемся
            </p>
          </div>

          <div style="display: flex; flex-direction: column;">
            <label
              for="name"
              class="adaptive-text__company"
              style="margin-bottom: 0.5vw; color: #14193c"
              >Ваше имя*</label
            >
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ваше имя"
              required
            />

            <label
              for="phone"
              class="adaptive-text__company"
              style="margin-bottom: 0.5vw; color: #14193c"
              >Номер телефона*</label
            >
            <input
              style=""
              type="tel"
              id="phone"
              name="phone"
              placeholder="Номер телефона"
              required
            />

            <label for="message" style="margin-bottom: 0.5vw; color: #14193c"
              >Текст сообщения</label
            >
            <textarea
              id="message"
              name="message"
              placeholder="Текст сообщения"
            ></textarea>

            <label class="checkbox-label">
              <input type="checkbox" name="consent" required />
              <span></span>
              <span
                class="adaptive-text__company"
                style="color:rgba(0, 0, 0, 0.5); width: fit-content; "
              >
                Согласие на обработку своих персональных данных
              </span>
            </label>

            <div
              id="recaptcha-container"
              class="g-recaptcha"
              style="margin: 1rem 0;"
              data-sitekey="6Ld9NyYrAAAAALt8vQMiMC-xESRgkrxWehBKzRHm"
              data-callback="onRecaptchaSuccess"
            ></div>
            <input
              type="hidden"
              id="g-recaptcha-response"
              name="g-recaptcha-response"
              required
            />
          </div>

          <button type="submit" class="stock-text">Отправить</button>
        </form>
        <button class="closeFormBtn">×</button>
      </div>
    </div>
  `;
}
