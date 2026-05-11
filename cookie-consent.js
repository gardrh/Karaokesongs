// SingPin! Cookie Consent
// Handles GDPR-compliant consent for Analytics and AdSense

(function() {
  const CONSENT_KEY = 'singpin_cookie_consent';
  const CONSENT_VERSION = '1.0';

  // Check if consent already given
  function getConsent() {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch(e) { return null; }
  }

  function saveConsent(analytics, ads) {
    const consent = {
      version: CONSENT_VERSION,
      date: new Date().toISOString(),
      analytics: analytics,
      ads: ads
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    return consent;
  }

  // Load Google Analytics
  function loadAnalytics() {
    if (window._analyticsLoaded) return;
    window._analyticsLoaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZWRV1ZH9BE';
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-ZWRV1ZH9BE');
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }

  // Load AdSense
  function loadAds() {
    if (window._adsLoaded) return;
    window._adsLoaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9252708748504526';
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
    gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
  }

  function applyConsent(consent) {
    if (consent.analytics) loadAnalytics();
    if (consent.ads) loadAds();
  }

  function removeBanner() {
    const banner = document.getElementById('singpin-cookie-banner');
    if (banner) {
      banner.style.transform = 'translateY(120%)';
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 400);
    }
  }

  function showBanner() {
    // Default consent mode — denied until user chooses
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });

    const banner = document.createElement('div');
    banner.id = 'singpin-cookie-banner';
    banner.innerHTML = `
      <div id="scb-inner">
        <div id="scb-top">
          <span id="scb-icon">🍪</span>
          <div id="scb-text">
            <strong>We use cookies</strong>
            <p>We use cookies for analytics and personalised ads to keep SingPin! free. You can choose what to allow.</p>
          </div>
        </div>
        <div id="scb-toggles">
          <div class="scb-toggle-row">
            <div class="scb-toggle-info">
              <span class="scb-toggle-label">Necessary</span>
              <span class="scb-toggle-desc">Required for the site to work</span>
            </div>
            <div class="scb-toggle scb-toggle-on scb-disabled">
              <div class="scb-thumb"></div>
            </div>
          </div>
          <div class="scb-toggle-row">
            <div class="scb-toggle-info">
              <span class="scb-toggle-label">Analytics</span>
              <span class="scb-toggle-desc">Helps us understand how you use the site</span>
            </div>
            <div class="scb-toggle" id="scb-analytics-toggle" onclick="singpinToggle('analytics')">
              <div class="scb-thumb"></div>
            </div>
          </div>
          <div class="scb-toggle-row">
            <div class="scb-toggle-info">
              <span class="scb-toggle-label">Advertising</span>
              <span class="scb-toggle-desc">Allows personalised ads that fund this site</span>
            </div>
            <div class="scb-toggle" id="scb-ads-toggle" onclick="singpinToggle('ads')">
              <div class="scb-thumb"></div>
            </div>
          </div>
        </div>
        <div id="scb-buttons">
          <button id="scb-reject" onclick="singpinConsent('reject')">Reject all</button>
          <button id="scb-custom" onclick="singpinConsent('custom')">Save choices</button>
          <button id="scb-accept" onclick="singpinConsent('accept')">Accept all</button>
        </div>
        <div id="scb-links">
          <a href="privacy-policy.html">Privacy Policy</a> · <a href="privacy-policy.html">Cookie Policy</a>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Animate in
    requestAnimationFrame(() => {
      banner.style.transform = 'translateY(0)';
      banner.style.opacity = '1';
    });
  }

  // Toggle state
  window._cookieToggles = { analytics: false, ads: false };

  window.singpinToggle = function(type) {
    window._cookieToggles[type] = !window._cookieToggles[type];
    const el = document.getElementById(`scb-${type}-toggle`);
    if (window._cookieToggles[type]) {
      el.classList.add('scb-toggle-on');
    } else {
      el.classList.remove('scb-toggle-on');
    }
  };

  window.singpinConsent = function(action) {
    let analytics = false, ads = false;
    if (action === 'accept') { analytics = true; ads = true; }
    else if (action === 'custom') {
      analytics = window._cookieToggles.analytics;
      ads = window._cookieToggles.ads;
    }
    // reject = both false
    const consent = saveConsent(analytics, ads);
    applyConsent(consent);
    removeBanner();
  };

  // Init
  const existing = getConsent();
  if (existing && existing.version === CONSENT_VERSION) {
    applyConsent(existing);
  } else {
    // Show banner after short delay so page loads first
    window.addEventListener('DOMContentLoaded', function() {
      setTimeout(showBanner, 800);
    });
  }
})();
