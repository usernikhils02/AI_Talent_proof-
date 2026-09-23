import { renderCertificateHTML } from '../../utils/certificates.js';
import { LANGUAGES_DATA } from '../../data/roles.js';

export class CertificateModalController {
  constructor() {
    this.overlay = document.getElementById('certificate-modal-overlay');
    this.bodyEl = document.getElementById('certificate-modal-body');
    this.closeBtn = document.getElementById('cert-modal-close-btn');
    this.doneBtn = document.getElementById('btn-close-cert');
    this.printBtn = document.getElementById('btn-print-certificate');

    this.initEvents();
  }

  initEvents() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.doneBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    this.printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  show(candidateName, languageId, certId, certDate) {
    const langObj = LANGUAGES_DATA.find(l => l.id === languageId);
    const langName = langObj ? langObj.name : languageId.toUpperCase();

    this.bodyEl.innerHTML = renderCertificateHTML(
      candidateName,
      langName,
      certId || `CERT-${languageId.toUpperCase()}-VERIFIED`,
      certDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    );

    this.overlay.classList.add('active');
  }

  close() {
    this.overlay.classList.remove('active');
  }
}
