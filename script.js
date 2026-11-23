// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

// Live Keyword Search & Highlight in About Section
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchFeedback = document.getElementById("searchFeedback");
const paragraphs = document.querySelectorAll(".searchable-block p:not(.commitment-note)");

// Store original HTML so we can reset cleanly
const originalTexts = Array.from(paragraphs).map((p) => p.innerHTML);

function highlightKeyword(rawTerm) {
  const term = rawTerm.trim();

  // Restore original text first
  paragraphs.forEach((p, index) => {
    p.innerHTML = originalTexts[index];
  });

  if (!term) {
    searchFeedback.textContent = "";
    return;
  }

  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  let matchCount = 0;

  paragraphs.forEach((p) => {
    const matches = p.textContent.match(regex);
    if (matches) {
      matchCount += matches.length;
      p.innerHTML = p.innerHTML.replace(
        regex,
        '<span class="highlight-match">$1</span>'
      );
    }
  });

  searchFeedback.textContent =
    matchCount > 0
      ? `Found ${matchCount} match(es) for "${term}".`
      : `No matches found for "${term}".`;
}

searchForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  highlightKeyword(searchInput.value);
});

searchInput?.addEventListener("input", (e) => {
  highlightKeyword(e.target.value);
});

// Sample Cart / Quote Counter Interaction
const cartBtn = document.getElementById("cartBtn");
const cartCountEl = document.getElementById("cartCount");
let quoteItems = 0;

cartBtn?.addEventListener("click", () => {
  quoteItems += 1;
  cartCountEl.textContent = String(quoteItems);
  searchFeedback.textContent = `Added 1 item to enquiry bag (Total items: ${quoteItems}).`;
});

// Enquiry Modal Open / Close
const enquiryModal = document.getElementById("enquiryModal");
const quickMailBtn = document.getElementById("quickMailBtn");
const quickChatBtn = document.getElementById("quickChatBtn");
const closeModal = document.getElementById("closeModal");
const enquiryForm = document.getElementById("enquiryForm");
const enquiryStatus = document.getElementById("enquiryStatus");

function openEnquiryModal() {
  enquiryModal.classList.add("open");
  enquiryModal.setAttribute("aria-hidden", "false");
}

function hideEnquiryModal() {
  enquiryModal.classList.remove("open");
  enquiryModal.setAttribute("aria-hidden", "true");
  enquiryStatus.textContent = "";
}

quickMailBtn?.addEventListener("click", openEnquiryModal);
quickChatBtn?.addEventListener("click", openEnquiryModal);
closeModal?.addEventListener("click", hideEnquiryModal);

enquiryModal?.addEventListener("click", (e) => {
  if (e.target === enquiryModal) {
    hideEnquiryModal();
  }
});

enquiryForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("enqName").value.trim();
  enquiryStatus.textContent = `Thank you, ${name}. Your enquiry has been noted locally.`;
  enquiryForm.reset();
});