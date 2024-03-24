const readline = require('readline');
const rl = readline.createInterface({
    //standard input
    input:process.stdin,
    //standard output
    output:process.stdout,
});
function calculateDemeritPoints(speed) {
    const speedLimit = 70;
    const kmPerDemeritPoint = 5;

    if (speed <= speedLimit) {
        console.log('Ok');
    } else {
        const demeritPoints = Math.floor((speed - speedLimit) / kmPerDemeritPoint);
        
        if (demeritPoints >12) {
            console.log("License suspended");
        } else {
            console.log(`Points: ${demeritPoints}`);
        }
    }
}

rl.question('Enter the speed:',(speed)=>{
    //promt the user to enter to the speed
    calculateDemeritPoints(Number(speed));
    //call checkSpeed function with the entered speed
    rl.close();
});


