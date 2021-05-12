import { LitElement, css, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { paperSizes } from './paper-generation.js';

import './pq-menu.js';

export class PaperPage extends LitElement {
  // Note: Your element must have a hyphen in the name (for example, "hello-world"). It's a requirement
  // so that our components don't collide with future additions to HTML.
  static get it() {
    return 'paper-page';
  }

  static get properties() {
    // All of the properties of this component and a type for each (used when converting
    // attributes to property values).
    return { name: { type: String } };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
  }

  // Uncomment this to remove the Shadow DOM from this component.
  createRenderRoot() {
    return this;
  }

  adBlock() {
    return html`<div class="panel panel-default">
      <div class="panel-body">
        <div class="leaderboardAd">
          <script
            async
            src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
          <!-- PaperQuik Leaderboard -->
          <ins
            class="adsbygoogle"
            style="display:inline-block;width:728px;height:90px"
            data-ad-client="ca-pub-8376642740439271"
            data-ad-slot="6535942993"
          ></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>
      </div>
    </div>`;
  }

  paper() {
    return html`<svg
      class="d-none d-print-block"
      width="215.89999mm"
      height="279.39999mm"
      viewBox="0 0 215.9 279.4"
      version="1.1"
      id="svg8"
    >
      <g>
        <rect
          style="fill:none;fill-rule:evenodd;stroke:none;stroke-width:0.263791;stroke-opacity:1"
          id="rect10"
          width="215.89999mm"
          height="279.39999mm"
          x="0"
          y="0"
        />
        <rect
          style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:0.263791;stroke-opacity:1"
          id="rect10"
          width="191.73621"
          height="255.73621"
          x="12.131895"
          y="12.131895"
        />
      </g>
    </svg>`;
  }

  paperIconStyle(paperSize) {
    return {
      width: paperSize.width / 2.8 + 'px',
      height: paperSize.height / 2.8 + 'px',
    };
  }

  stepOne() {
    return html`<div class="panel panel-default size-section">
      <div class="panel-heading">
        <h2>1: Pick a paper size</h2>
      </div>
      <div class="panel-body">
        ${paperSizes.map((paperSize) => {
          return html`<a href="#/paper/${paperSize.id}">
            <div
              class="paperIcon"
              style="${styleMap(this.paperIconStyle(paperSize))}"
              class=""
            >
              <span class="paperName">${paperSize.name}</span>
            </div>
          </a>`;
        })}
      </div>
    </div>`;
  }

  stepTwo() {
    return html` <div class="panel panel-default layout-section">
      <div class="panel-heading">
        <h2>
          2: Pick a layout
          <span ng-show="selectedPaper"
            >for {{ selectedPaper.name }} size paper</span
          >
        </h2>
      </div>
      <div class="panel-body">
        <div>
          <a
            href="#/layout/{{ layout.id }}"
            ng-repeat="layout in paperLayouts(selectedPaper)"
          >
            <div class="layoutIcon">
              <span class="layoutName">{{ layout.name }}</span>
              <div
                style="width: 100%; height: 125px; border: 1px solid black; overflow: hidden;"
              >
                <img
                  style="position: relative; width: 100%;"
                  ng-src="{{ layout.image }}"
                />
              </div>
            </div>
          </a>
        </div>

        <div ng-if="!selectedPaper">
          You must pick a paper size before you pick a layout for your page.
        </div>
      </div>
    </div>`;
  }

  stepThree() {
    return html`<div class="panel panel-default print-section">
      <div class="panel-heading">
        <h2>3: Print your paper</h2>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-8"></div>
          <div class="col-md-4">
            <button class="btn btn-primary btn-block" ng-click="print()">
              Print your paper
            </button>

            <div id="mc_embed_signup">
              <form
                action="http://johnmunsch.us8.list-manage.com/subscribe/post?u=bd3c8c7355797b6633a3503e7&amp;id=e3f181919d"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                class="validate"
                target="_blank"
                novalidate
              >
                <label for="mce-EMAIL"
                  >Subscribe to learn when PaperQuik updates</label
                >
                <input
                  type="email"
                  value=""
                  name="EMAIL"
                  class="email"
                  id="mce-EMAIL"
                  placeholder="email address"
                  required
                />
                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;">
                  <input
                    type="text"
                    name="b_bd3c8c7355797b6633a3503e7_e3f181919d"
                    value=""
                  />
                </div>
                <div class="clear">
                  <button
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    class="btn btn-primary"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div> `;
  }

  render() {
    return html`${this.paper()}
      <pq-menu class="d-print-none" active="paper"></pq-menu>
      <div class="container d-print-none">
        <div class="jumbotron" ng-show="$storage.showWelcome">
          <h1>The Paper You Need - Available Right Away</h1>
          <p></p>
          <p>
            <button
              class="btn btn-primary btn-lg"
              ng-click="$storage.showWelcome = false"
            >
              Get Started
            </button>
          </p>
        </div>

        ${this.adBlock()} ${this.stepOne()} ${this.stepTwo()}
        ${this.stepThree()} ${this.adBlock()}

        <footer>
          <p>© 2021 John Munsch</p>
        </footer>
      </div>`;
  }
}

customElements.define(PaperPage.it, PaperPage);