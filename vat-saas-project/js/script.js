// js/script.js

// --- 1. Mobile Menu Toggle Logic ---
const mobileMenuBtn = document.getElementById('mobile-menu-button');
const navLinks = document.querySelector('header nav div.hidden'); // Selects the desktop link container

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('hidden'); // Show/hide desktop links on mobile
        navLinks.classList.toggle('flex');
        navLinks.classList.toggle('flex-col');
        navLinks.classList.toggle('absolute');
        navLinks.classList.toggle('top-16');
        navLinks.classList.toggle('left-0');
        navLinks.classList.toggle('w-full');
        navLinks.classList.toggle('bg-white');
        navLinks.classList.toggle('p-6');
        navLinks.classList.toggle('shadow-lg');
        navLinks.classList.toggle('space-y-4');
        navLinks.classList.toggle('space-x-0');
    });
}

// --- 2. Sticky Header Logic ---
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('navbar-scrolled'); // Custom class in style.css
        } else {
            header.classList.remove('navbar-scrolled');
        }
    });
}


// --- 3. VAT Calculator Logic (calculator.html) ---
const countrySelect = document.getElementById('countrySelect');
const vatRateInput = document.getElementById('vatRate');
const baseAmountInput = document.getElementById('baseAmount');
const calculateBtn = document.getElementById('calculateBtn');

const resultsArea = document.getElementById('resultsArea');
const resBase = document.getElementById('resultBaseAmount');
const resVatLabel = document.getElementById('resultVatLabel');
const resVatAmount = document.getElementById('resultVatAmount');
const resTotal = document.getElementById('resultTotalAmount');

// Step 3a: Update the VAT % input field when a country is selected
if (countrySelect) {
    countrySelect.addEventListener('change', () => {
        const selectedRateDecimal = countrySelect.value;
        if (selectedRateDecimal) {
            const percentage = parseFloat(selectedRateDecimal) * 100;
            vatRateInput.value = percentage; // Update input field
            vatRateInput.classList.remove('bg-slate-100', 'text-slate-500');
            vatRateInput.classList.add('bg-white', 'text-secondary');
        }
    });
}

// Step 3b: Core Calculation Function
if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
        const amount = parseFloat(baseAmountInput.value);
        const rateDecimal = parseFloat(countrySelect.value);

        // Simple validation
        if (isNaN(amount) || amount <= 0 || isNaN(rateDecimal)) {
            alert("Please enter a valid amount greater than 0 and select a country.");
            return;
        }

        // --- THE CALCULATION ---
        const vatAmount = amount * rateDecimal;
        const totalAmount = amount + vatAmount;

        // Step 3c: Display the Results
        // Helper to format currency
        const formatCurrency = (num) => `€${num.toFixed(2)}`;

        resBase.innerText = formatCurrency(amount);
        resVatLabel.innerText = `VAT (${(rateDecimal * 100).toFixed(0)}%):`;
        resVatAmount.innerText = formatCurrency(vatAmount);
        resTotal.innerText = formatCurrency(totalAmount);

        // Show the results area with a simple animation
        resultsArea.classList.remove('hidden');
        setTimeout(() => {
            resultsArea.classList.remove('scale-95', 'opacity-0');
            resultsArea.classList.add('scale-100', 'opacity-100');
        }, 10);
    });
}