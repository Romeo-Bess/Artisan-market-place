import os
import glob
import re

# Navigation map: text content of anchor -> destination file
NAV_MAP = {
    # Main nav
    "Browse": "browse-gallery.html",
    "Browse Gallery": "browse-gallery.html",
    "Browse Art": "browse-gallery.html",
    "Gallery": "browse-gallery.html",
    "Artists": "artists.html",
    "Discover Creators": "artists.html",
    "Live Auctions": "live-auctions.html",
    "Auctions": "live-auctions.html",
    "Journal": "journal.html",
    "Commissions": "commissions.html",
    "Commission": "commissions.html",
    "Dashboard": "collector-dashboard.html",
    "Collector Dashboard": "collector-dashboard.html",
    "My Dashboard": "collector-dashboard.html",
    "My Collection": "collector-dashboard.html",
    "Sign In": "login/index.html",
    "Log In": "login/index.html",
    "Login": "login/index.html",
    "Become an Artist": "become-artist.html",
    "Become an Artisane Artist": "become-artist.html",
    "Submit Your Work": "become-artist.html",
    "Apply": "become-artist.html",
    "Checkout": "checkout.html",
    "Secure Checkout": "checkout.html",
    "Complete Purchase": "checkout.html",
    "Place Bid": "live-bidding.html",
    "Bid Now": "live-bidding.html",
    "Register to Bid": "auction-registration.html",
    "Register for Auction": "auction-registration.html",
    "Auction History": "auction-history.html",
    "View History": "auction-history.html",
    "Certificate of Authenticity": "certificate.html",
    "View Certificate": "certificate.html",
    "Request a Commission": "request-commission.html",
    "Commission an Artwork": "request-commission.html",
    "Shipping & Tracking": "shipping-tracking.html",
    "Track Order": "shipping-tracking.html",
    "Terms & Conditions": "terms.html",
    "Terms": "terms.html",
    "Upload Artwork": "upload-artwork.html",
    "Your Commissions": "user-commissions.html",
    "My Commissions": "user-commissions.html",
}

def wire_file(filepath):
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    original = content

    # Determine page type (light vs dark) based on content or filename
    is_light = "light" in filepath or "home-light" in filepath
    home_page = "home-light.html" if is_light else "index.html"

    # 1. Logo wrapping: wrap Artisane logo text in a home link
    content = re.sub(
        r'<span class="font-display-lg text-display-lg text-primary tracking-tight">Artisane</span>',
        f'<a href="{home_page}"><span class="font-display-lg text-display-lg text-primary tracking-tight">Artisane</span></a>',
        content
    )
    content = re.sub(
        r'<span class="text-headline-md font-headline-md text-primary dark:text-primary-fixed tracking-tight">Artisane</span>',
        f'<a href="{home_page}"><span class="text-headline-md font-headline-md text-primary dark:text-primary-fixed tracking-tight">Artisane</span></a>',
        content
    )
    content = re.sub(
        r'<div class="font-headline-md text-headline-md text-primary dark:text-primary-fixed tracking-tight cursor-pointer">Artisane</div>',
        f'<a href="{home_page}"><div class="font-headline-md text-headline-md text-primary dark:text-primary-fixed tracking-tight cursor-pointer">Artisane</div></a>',
        content
    )

    # 2. Wire anchor hrefs based on their visible text content
    def process_anchor(match):
        anchor_tag = match.group(0)
        # Only process anchors with href="#" or no href
        if 'href="#"' not in anchor_tag and "href='#'" not in anchor_tag:
            return anchor_tag
        # Extract visible text
        text_match = re.search(r'>([^<]+)</a>', anchor_tag)
        if not text_match:
            # Try to find text in nested span
            text_match = re.search(r'<span[^>]*>([^<]+)</span>', anchor_tag)
        if text_match:
            text = text_match.group(1).strip()
            if text in NAV_MAP:
                dest = NAV_MAP[text]
                anchor_tag = anchor_tag.replace('href="#"', f'href="{dest}"')
                anchor_tag = anchor_tag.replace("href='#'", f"href='{dest}'")
        return anchor_tag

    content = re.sub(r'<a\s[^>]*href=["\']#["\'][^>]*>.*?</a>', process_anchor, content, flags=re.DOTALL)

    # 3. Wire artist profile links
    content = re.sub(
        r'href="#"([^>]*>(?:[^<]*<[^/][^>]*>[^<]*</[^>]*>)*[^<]*Elena Vance)',
        r'href="artist-profile.html"\1',
        content
    )

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  [+] Wired navigation in: {filepath}")
        return True
    return False


def main():
    html_files = glob.glob("*.html")
    updated = 0
    for filepath in sorted(html_files):
        if wire_file(filepath):
            updated += 1
    print(f"\nWired navigation in {updated} of {len(html_files)} files.")

if __name__ == "__main__":
    main()