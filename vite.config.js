import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        homeLight: resolve(__dirname, 'home-light.html'),
        homeMobile: resolve(__dirname, 'home-mobile.html'),
        journal: resolve(__dirname, 'journal.html'),
        artists: resolve(__dirname, 'artists.html'),
        artistPortfolioUpdated: resolve(__dirname, 'artist-portfolio-updated.html'),
        artistProfile: resolve(__dirname, 'artist-profile.html'),
        artistProfileMobile: resolve(__dirname, 'artist-profile-mobile.html'),
        artistProfileAuctions: resolve(__dirname, 'artist-profile-auctions.html'),
        roomView: resolve(__dirname, 'room-view.html'),
        auctionHistory: resolve(__dirname, 'auction-history.html'),
        auctionHistoryMobile: resolve(__dirname, 'auction-history-mobile.html'),
        auctionRegistration: resolve(__dirname, 'auction-registration.html'),
        becomeArtist: resolve(__dirname, 'become-artist.html'),
        verification: resolve(__dirname, 'verification.html'),
        browseGallery: resolve(__dirname, 'browse-gallery.html'),
        browseGalleryLight: resolve(__dirname, 'browse-gallery-light.html'),
        certificate: resolve(__dirname, 'certificate.html'),
        collectorDashboard: resolve(__dirname, 'collector-dashboard.html'),
        collectorDashboardMobile: resolve(__dirname, 'collector-dashboard-mobile.html'),
        commissions: resolve(__dirname, 'commissions.html'),
        shippingTracking: resolve(__dirname, 'shipping-tracking.html'),
        curationReview: resolve(__dirname, 'curation-review.html'),
        liveAuctions: resolve(__dirname, 'live-auctions.html'),
        liveBidding: resolve(__dirname, 'live-bidding.html'),
        paymentPreauth: resolve(__dirname, 'payment-preauth.html'),
        registrationSuccessful: resolve(__dirname, 'registration-successful.html'),
        requestCommission: resolve(__dirname, 'request-commission.html'),
        requestReceived: resolve(__dirname, 'request-received.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        termsConditions: resolve(__dirname, 'terms.html'),
        userCommissions: resolve(__dirname, 'user-commissions.html'),
        login: resolve(__dirname, 'login/index.html')
      }
    }
  }
})
