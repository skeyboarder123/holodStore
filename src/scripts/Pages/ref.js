import { html, render } from '/node_modules/lit-html/lit-html.js';

export function loadRef() {
  const content = document.getElementById('main_content');
  render(
    html`
      <section style="background-color: #f2f6ff" class="section-main">
        <div class="main-container">
          <h2 style="margin-bottom:2vw;">О компании</h2>
        </div>
      </section>
    `,
    content
  );
}
