const readline=require('readline');

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

// Prompt the user to input student marks
rl.question("Enter student marks:",(marks)=>{
    // Check if the input is valid between 0 and 100
marks=parseInt(marks);
// Convert input to an integer
if (isNaN(marks) || marks < 0 || marks > 100) {
    console.log("Invalid input. Please enter a valid number between 0 and 100.");
    rl.close();
    return;
}
   
    // Determine the grade based on the marks
    if (marks > 79) {
        grade = "A";
    } else if (marks >= 60 && marks <= 79) {
        grade = "B";
    } else if (marks >= 50 && marks <= 59) {
        grade = "C";
    } else if (marks >= 40 && marks <= 49) {
        grade = "D";
    } else {
        grade = "E";
    }

    // Output the grade
    console.log(`Student grade: ${grade}`);
    rl.close()
});
