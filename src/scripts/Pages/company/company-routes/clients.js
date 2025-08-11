import { html, render } from '/node_modules/lit-html/lit-html.js';

export function loadClients() {
  const content = document.getElementById('main_content');
  render(
    html`
      <section style="background-color: #f2f6ff" class="section-main">
        <div class="main-container">
          <h2 style="margin-bottom:2vw;">Клиенты</h2>

          <p style="margin-bottom:2vw;" class="adaptive-text__company">
            Клиенты нашей компании - это организации и частные лица, активно
            использующие климатическое оборудование для создания комфортного
            микроклимата на рабочем месте или в жилом пространстве. Более 20 лет
            мы помогаем им купить и правильно установить климатическую технику,
            поддерживаем её работу на оптимальном уровне, ремонтируем вышедшие
            из строя детали. Кондиционеры, холодильные
            сплит-системы, вентиляционные установки, промышленные
            вентиляторы, тепловые насосы, бойлеры косвенного нагрева и котлы
            отопления - вот только не полный перечень товаров интернет-магазина
            «Точка Холода». Больше 45000 позиций, акции и сезонные скидки на
            монтаж. Будем рады видеть и Вас в числе своих постоянных клиентов.
          </p>

          <div style="margin-bottom: 4vw;">
            <div class="company-grid">
              <div
                style=" padding: 1vw;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/ya.webp"
                    alt="ya"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Яндекс
                </p>

                <p>
                  Транснациональная компания в отрасли информационных
                  технологий, владеющая одноимённой системой поиска в интернете,
                  интернет-порталом и веб-службами в нескольких странах.
                  Наиболее заметное положение занимает на рынках России,
                  Белоруссии и Казахстана.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/turk.webp"
                    alt="turk"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  ISBANK
                </p>

                <p>
                  Крупнейший частный банк Турции. По состоянию на 30 сентября
                  2018 года активы ISBANK составляют 444,3 млн турецких лир.
                  ISBANK является крупнейшим турецким банком с точки зрения
                  общего объема кредитов, акционерного капитала и активов. Кроме
                  того, ISBANK занимает первое место среди банков частного
                  сектора по объему валютных депозитов до востребования.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/tat.webp"
                    alt="tat"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Татнефть
                </p>

                <p>
                  Татнефть - одна из крупнейших российских нефтяных компаний, в
                  составе которой динамично развиваются нефтегазодобыча,
                  нефтепереработка, нефтегазохимия, сеть АЗС, композитный
                  кластер, электроэнергетика, разработка и производство
                  оборудования для нефтегазовой отрасли и блок сервисных
                  структур.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/domo.webp"
                    alt="domo"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Московский аэропорт Домодедово
                </p>

                <p>
                  Московский аэропорт Домодедово — одна из крупнейших воздушных
                  гаваней России, в 2021 году аэропорт обслужил 25,1 млн
                  человек. Домодедово выбран для полетов в Москву членами
                  ведущих мировых авиационных альянсов – Star Alliance и
                  Oneworld.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/del.webp"
                    alt="del"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Деловые линии
                </p>

                <p>
                  ГК «Деловые Линии» — основана в 2001 году. Крупнейший
                  транспортно-логистический оператор России: занимает 1 место по
                  объему складских площадей в регионах РФ (Knight Frank, 2021) и
                  в рейтинге служб доставки в Москве («RAEX-Аналитика», 2020
                  г.). «Деловые Линии» – в перечне системообразующих организаций
                  страны (Минтранс РФ). Признан «Надежным перевозчиком России» в
                  2022 г. согласно рейтингу Национального союза экспертов в
                  сфере транспорта и логистики (СЭЛ) при поддержке Минтранса РФ.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/rub.webp"
                    alt="rub"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  ДКРС ОАО "РЖД"
                </p>

                <p>
                  ДКРС ОАО "РЖД" "РОССИЙСКИЕ ЖЕЛЕЗНЫЕ ДОРОГИ" Дирекция по
                  комплексной реконструкции железных дорог и строительству
                  объектов железнодорожного транспорта - филиал открытого
                  акционерного общества. Мы выполняли монтаж систем
                  кондиционирования воздуха в новом офисе компании ДКРС ОАО
                  "РЖД" площадью более 4000 м.кв. Было установлено большое
                  количество сплит - систем различных типов и марок. В настоящее
                  время мы обслуживание все кондиционеры в офисе ДКРС ОАО "РЖД",
                  а так же устанавливаем дополнительные кондиционеры по запросу
                  Заказчика.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/mich.webp"
                    alt="mich"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  MICHELIN
                </p>

                <p>
                  MICHELIN воплощает идею движения, которое является
                  неотъемлемым элементом жизни и развития человека. Вдобавок к
                  разработке шин из инновационных материалов MICHELIN всегда
                  способствовал развитию взаимодействия между людьми и
                  открытости, предлагая широкий спектр решений для обеспечения
                  безопасности, комфорта и экологичности путешествий, а также
                  новых впечатлений.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/mild.webp"
                    alt="mild"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Брендинговое агенство Майлдберри
                </p>

                <p>
                  Майлдберри (MILDBERRY) - международное брендинговое агенство.
                  Занимается разработкой корпоративных и товарных брендов, новых
                  товаров и услуг, дизайном упаковки и еще большим объемом задач
                  в области маркетинга. Агентство имеет офисы в Лондоне,
                  Брюсселе, Милане, Дубаи, Гонконге, Шанхае и Москве.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/arg.webp"
                    alt="arg"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Аргус Медиа
                </p>

                <p>
                  Argus Media Ltd. - частная британская компания. Московское
                  представительство Argus это специализированное информационно-
                  аналитическое агентство, освещающее рынки нефти, газа,
                  электричества, угля, морских, речных и сухопутных перевозок. В
                  компании мы выполняем обслуживание и ремонт кондиционеров.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/fimiguerro.webp"
                    alt="fimiguerro"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  ИНТУРАЭРО
                </p>

                <p>
                  Компания ИНТУРАЭРО - ведущий поставщик полного спектра услуг в
                  сфере организации деловых поездок. Мы выполнили в компании
                  ИНТУРАЭРО ремонт и модернизацию существующей системы
                  кондиционирования.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/disco.webp"
                    alt="disco"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Ресторан Discovery Club
                </p>

                <p>
                  Ресторан Дискавери клуб находится на Новокузнецкой улице, в
                  самом центре Москвы. Необычный интерьер ресторана в форме
                  палубы морской яхты производит впечатление. Мы выполнили в
                  ресторане работы по проектированию, поставке и монтажу системы
                  вентиляции и кондиционирования воздуха. Проводим модернизацию
                  оборудования, а также ремонт и техническое обслуживание
                  существующих кондиционеров и систем вентиляции.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/start.webp"
                    alt="start"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Яндекс
                </p>

                <p>
                  Сеть фитнес клубов Старт 7 - это небольшие и уютные клубы
                  семейные клубы. Клуб предлагает множество программ для детей в
                  возрасте от 6 лет и взрослых до 120 лет.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/les.webp"
                    alt="les"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Лесбанк
                </p>

                <p>
                  ОАО АКБ "Лесбанк"- это универсальная кредитная организация,
                  обслуживающая все виду бизнеса. ОАО АКБ "Лесбанк" является
                  самостоятельной и независимой организацией, не входящей ни в
                  какой холдинг. Мы проводим техническое обслуживание всех
                  кондиционеров банка.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/mev.webp"
                    alt="mev"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Металлокомплект-М
                </p>

                <p>
                  Компания Металлокомплект-М входит в десятку крупнейших
                  металлоторгующих компаний России. Мы установили более 25
                  систем кондиционирования в новом офисе компании
                  Металлокомплект-М, площадью более 500 м.кв.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/otp.webp"
                    alt="otp"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  ОТР
                </p>

                <p>
                  ОТР (Организационно - Технологические Решения) ведущий
                  российский системный интегратор, специализирующийся на
                  консалтинговых услугах в ИТ-сфере, а так же предоставляет
                  комплексные ИТ-решения для финансовых организаций,
                  государственных корпораций и предприятий индустрии. В компании
                  ОТР мы выполняем работы по обслуживанию систем
                  кондиционирования воздуха в серверных комнатах, устанавливаем
                  новые кондиционеры в офисных помещениях компании.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/ferrero.webp"
                    alt="ferrero"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Ферреро Руссия
                </p>

                <p>
                  Ферреро Руссия входит в холдинговую компанию группы Ferrro. В
                  группу Ferrero входит 72 компании, 15 фабрик, 3 "Социальных
                  предприятия". Компания производит конфеты Raffaello, ореховую
                  пасту Nutella, Kinder сюрприз, драже tik tak.В настоящее время
                  мы осуществляем в компании Ферреро полный комплекс работ по
                  обслуживанию климатического оборудования, установке нового
                  оборудования.
                </p>
              </div>

              <div
                style=" padding: 1vw;;border:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <div class="company-grid-img">
                  <img
                    style="width:100%; height:100%; "
                    src="/imgs/clients/shikkko.webp"
                    alt="shikkko"
                  />
                </div>

                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Типография ШИКО
                </p>

                <p>
                  Крупная типография и дизайн центр. Компания на рынке более 10
                  лет.В производственном помещении типографии мы установили
                  несколько промышленных кондиционеров, смонтировали систему
                  вентиляции в производственной и офисной части типографии.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    content
  );
}
