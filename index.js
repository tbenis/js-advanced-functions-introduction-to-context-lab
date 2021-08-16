// Your code here

function createEmployeeRecord(arr) {
  const empRecObj = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return empRecObj;
}

function createEmployeeRecords(arrofArr) {
  //   const empRecObj = [];
  //   for (let i = 0; i < arrofArr.length; i++) {
  //     for (let j = 0; j < arrofArr[i].length; j++) {
  //       empRecObj.push({
  //         firstName: arrofArr[i][j][0],
  //         familyName: arrofArr[i][j][1],
  //         title: arrofArr[i][j][2],
  //         payPerHour: arrofArr[i][j][3],
  //         timeInEvents: [],
  //         timeOutEvents: [],
  //       });
  //     }
  //   }

  //   return empRecObj;
  return arrofArr.map(function (row) {
    return createEmployeeRecord(row);
  });
}

function createTimeInEvent(empRecObj, dateTimeStamp) {
  let [date, hour] = dateTimeStamp.split(" ");

  empRecObj.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return empRecObj;
}

function createTimeOutEvent(empRecObj, dateTimeStamp) {
  let [date, hour] = dateTimeStamp.split(" ");

  empRecObj.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return empRecObj;
}

function hoursWorkedOnDate(empRecObj, dateStamp) {
  let inEvent = empRecObj.timeInEvents.find(function (e) {
    return e.date === dateStamp;
  });

  let outEvent = empRecObj.timeOutEvents.find(function (e) {
    return e.date === dateStamp;
  });

  return (outEvent.hour - inEvent.hour) / 100;
}
function wagesEarnedOnDate(empRecObj, dateStamp) {
  let rawWage = hoursWorkedOnDate(empRecObj, dateStamp) * empRecObj.payPerHour;
  return parseFloat(rawWage.toString());
}

function allWagesFor(empRecObj) {
    let eligibleDates = empRecObj.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(empRecObj, d)
    }, 0)

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(rec){
        return rec.firstName === firstName
      })
}
function calculatePayroll(empRecArr) {
    return empRecArr.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
