import { html, render } from '/node_modules/lit-html/lit-html.js';

export function loadContacts() {
  const content = document.getElementById('main_content');
  render(
    html`
      <section style="background-color: #f2f6ff;" class="section-main">
        <div class="main-container">
          <h2 style="margin-bottom:2vw;">С вами работают</h2>

          <div class="contacts-grid">
            <div class="adaptive-text__company">
              <p style="font-weight: bold; margin-bottom: 1vw;">
                Махотин Алексей
              </p>

              <p style="margin-bottom: 0.5vw;">Коммерческий директор</p>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img
                      class="phone-icon"
                      src="/svgs/phone-calling.svg"
                      alt="phone call"
                    />
                  </div>
                  <span>+7 (499) 638-28-01</span>
                </a>
              </div>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img class="email-icon" src="/svgs/email.svg" alt="email" />
                  </div>
                  <span>a.makhotin@tochkaholoda.ru</span>
                </a>
              </div>
            </div>

            <div class="adaptive-text__company">
              <p style="font-weight: bold; margin-bottom: 1vw;">
                Чижов Дмитрий
              </p>

              <p style="margin-bottom: 0.5vw;">Генеральный директор</p>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img
                      class="phone-icon"
                      src="/svgs/phone-calling.svg"
                      alt="phone call"
                    />
                  </div>
                  <span>+7 (499) 638-28-01</span>
                </a>
              </div>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img class="email-icon" src="/svgs/email.svg" alt="email" />
                  </div>
                  <span>dc@tochkaholoda.ru</span>
                </a>
              </div>
            </div>

            <div class="adaptive-text__company">
              <p style="font-weight: bold; margin-bottom: 1vw;">
                Шишканов Игорь
              </p>

              <p style="margin-bottom: 0.5vw;">Менеджер по продажам</p>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img
                      class="phone-icon"
                      src="/svgs/phone-calling.svg"
                      alt="phone call"
                    />
                  </div>
                  <span>+7 (499) 638-28-01</span>
                </a>
              </div>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img class="email-icon" src="/svgs/email.svg" alt="email" />
                  </div>
                  <span>is@tochkaholoda.ru</span>
                </a>
              </div>
            </div>

            <div class="adaptive-text__company">
              <p style="font-weight: bold; margin-bottom: 1vw;">
                Ерилина Елена
              </p>

              <p style="margin-bottom: 0.5vw;">Менеджер отдела закупок</p>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img
                      class="phone-icon"
                      src="/svgs/phone-calling.svg"
                      alt="phone call"
                    />
                  </div>
                  <span>+7 (499) 638-28-01 доб.04</span>
                </a>
              </div>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img class="email-icon" src="/svgs/email.svg" alt="email" />
                  </div>
                  <span>zakupki@tochkaholoda.ru</span>
                </a>
              </div>
            </div>

            <div class="adaptive-text__company">
              <p style="font-weight: bold; margin-bottom: 1vw;">
                Севостьянова Елена
              </p>

              <p style="margin-bottom: 0.5vw;">Менеджер по продажам</p>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img
                      class="phone-icon"
                      src="/svgs/phone-calling.svg"
                      alt="phone call"
                    />
                  </div>
                  <span>+7 (499) 638-28-01 доб.06</span>
                </a>
              </div>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img class="email-icon" src="/svgs/email.svg" alt="email" />
                  </div>
                  <span>es@tochkaholoda.ru</span>
                </a>
              </div>
            </div>

            <div class="adaptive-text__company">
              <p style="font-weight: bold; margin-bottom: 1vw;">
                Барабошкин Алексей
              </p>

              <p style="margin-bottom: 0.5vw;">Менеджер по продажам</p>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img
                      class="phone-icon"
                      src="/svgs/phone-calling.svg"
                      alt="phone call"
                    />
                  </div>
                  <span>+7 (499) 638-28-01</span>
                </a>
              </div>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img class="email-icon" src="/svgs/email.svg" alt="email" />
                  </div>
                  <span>ab@tochkaholoda.ru</span>
                </a>
              </div>
            </div>

            <div class="adaptive-text__company">
              <p style="font-weight: bold; margin-bottom: 1vw;">
                Кузнецова Ирина
              </p>

              <p style="margin-bottom: 0.5vw;">Начальник сервисного центра</p>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img
                      class="phone-icon"
                      src="/svgs/phone-calling.svg"
                      alt="phone call"
                    />
                  </div>
                  <span>+7 (499) 638-28-01</span>
                </a>
              </div>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img class="email-icon" src="/svgs/email.svg" alt="email" />
                  </div>
                  <span>service@tochkaholoda.ru</span>
                </a>
              </div>
            </div>

            <div class="adaptive-text__company">
              <p style="font-weight: bold; margin-bottom: 1vw;">
                Дмитрий Семенюк
              </p>

              <p style="margin-bottom: 0.5vw;">Начальник монтажного отдела</p>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img
                      class="phone-icon"
                      src="/svgs/phone-calling.svg"
                      alt="phone call"
                    />
                  </div>
                  <span>+7 (499) 638-28-01</span>
                </a>
              </div>

              <div></div>
            </div>

            <div class="adaptive-text__company">
              <p style="font-weight: bold; margin-bottom: 1vw;">
                Полякова Марина
              </p>

              <p style="margin-bottom: 0.5vw;">Бухгалтер</p>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img
                      class="phone-icon"
                      src="/svgs/phone-calling.svg"
                      alt="phone call"
                    />
                  </div>
                  <span>+7 (499) 638-28-01 доб.01</span>
                </a>
              </div>

              <div>
                <a class="contact-link" href="tel:+1234567890">
                  <div style="margin-top: 2px; margin-right: 2px">
                    <img class="email-icon" src="/svgs/email.svg" alt="email" />
                  </div>
                  <span>buh2@tochkaholoda.ru</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    content
  );
}
