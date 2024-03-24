const readline = require('readline');

// Constants for tax rates, NHIF rates, NSSF rate, and housing levy rate
const TAX_RATES = [
    { min: 0, max: 24000, rate: 0.1 },
    { min: 24001, max: 32333, rate: 0.25 },
    { min: 32334, max: 41905, rate: 0.3 },
    { min: 41906, max: 55826, rate: 0.32 },
    { min: 55827, max: Infinity, rate: 0.35 }
];

const NHIF_RATES = [
    { min: 0, max: 5999, amount: 150 },
    { min: 6000, max: 7999, amount: 300 },
    { min: 8000, max: 11999, amount: 400 },
    { min: 12000, max: 14999, amount: 500 },
    { min: 15000, max: 19999, amount: 600 },
    { min: 20000, max: 24999, amount: 750 },
    { min: 25000, max: 29999, amount: 850 },
    { min: 30000, max: 34999, amount: 900 },
    { min: 35000, max: 39999, amount: 950 },
    { min: 40000, max: 44999, amount: 1000 },
    { min: 45000, max: 49999, amount: 1100 },
    { min: 50000, max: 59999, amount: 1200 },
    { min: 60000, max: 69999, amount: 1300 },
    { min: 70000, max: 79999, amount: 1400 },
    { min: 80000, max: 89999, amount: 1500 },
    { min: 90000, max: 99999, amount: 1600 },
    { min: 100000, max: Infinity, amount: 1700 }
];

const NSSF_RATE = 0.06;
const HOUSING_LEVY_RATE = 0.01; // Assuming a 1% housing levy rate

// Function to calculate PAYE tax
function calculatePAYE(grossSalary) {
    let tax = 0;
    for (let i = 0; i < TAX_RATES.length; i++) {
        if (grossSalary > TAX_RATES[i].max) {
            tax += (TAX_RATES[i].max - TAX_RATES[i].min + 1) * TAX_RATES[i].rate;
        } else {
            tax += (grossSalary - TAX_RATES[i].min + 1) * TAX_RATES[i].rate;
            break;
        }
    }
    return tax;
}

// Function to calculate NHIF deductions
function calculateNHIF(grossSalary) {
    for (let i = 0; i < NHIF_RATES.length; i++) {
        if (grossSalary >= NHIF_RATES[i].min && grossSalary <= NHIF_RATES[i].max) {
            return NHIF_RATES[i].amount;
        }
    }
}

// Function to calculate NSSF deductions
function calculateNSSF(grossSalary) {
    return grossSalary * NSSF_RATE;
}

// Function to calculate housing levy
function calculateHousingLevy(basicSalary) {
    return basicSalary * HOUSING_LEVY_RATE;
}

// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits) {
    const grossSalary = basicSalary + benefits;
    const PAYE = calculatePAYE(grossSalary);
    const NHIF = calculateNHIF(grossSalary);
    const NSSF = calculateNSSF(grossSalary);
    const housingLevy = calculateHousingLevy(basicSalary);
    const netSalary = grossSalary - PAYE - NHIF - NSSF - housingLevy;
    return netSalary;
}

// Create interface for input/output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Get input from the user
rl.question("Enter basic salary (in Ksh): ", (basicSalary) => {
    rl.question("Enter benefits (in Ksh): ", (benefits) => {
        const netSalary = calculateNetSalary(parseFloat(basicSalary), parseFloat(benefits));
        console.log("Net Salary:", netSalary.toFixed(2), "Ksh");
        rl.close();
    });
});

