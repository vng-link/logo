export class ShowMore {
  constructor() {
    this._showMore = document.querySelectorAll('[data-show-more]');
    this._list = null;
    this._button = null;

    this._documentClickHandler = this._documentClickHandler.bind(this);
  }

  init() {
    if (!this._showMore.length) {
      return;
    }

    document.addEventListener('click', this._documentClickHandler);
  }

  _documentClickHandler(evt) {
    const target = evt.target;

    if (!target.closest('[data-show-more-button]')) {
      return;
    }

    this._parent = target.closest('[data-show-more]');
    this._button = this._parent.querySelector('[data-show-more-button]');
    this._list = this._parent.querySelector('[data-show-more-list]');

    if (this._button) {
      this._getContent();
    }
  }

  async _getContent() {
    const currentPage = ++this._button.dataset.currentPage;
    this._button.setAttribute('data-current-page', currentPage);

    const params = {
      currentPage,
    };

    try {
      const response = await fetch('/local/templates/zhbi-street/ajax/get-content.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(params).toString(),
      })
      const result = await response.text();

      if (result) {
        this._list.innerHTML = result;

        if (Number(currentPage) === Number(this._button.dataset.maxPages)) {
          this._button.remove();
        }
      }
    } catch (err) {
      console.log('Error: ' + err);
    }
  }
}