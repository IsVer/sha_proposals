console.log("hello script");
const inputPath = "./in/overview_version1.json";
const outputPath = "./out/overview_nested.json";

// * Require
const fs = require("fs");
let d3 = {};
d3.array = require("d3-array");

const raw = fs.readFileSync(inputPath, "utf8");
const json = JSON.parse(raw);

for (const row of json) {
  row.year = row.Year;
  delete row.Year;
  row.issueTypeName = row.Issue_type;
  switch (row.issueTypeName) {
    case "Environment":
      row.issueTypeCode = "env";
      break;
    case "Social":
      row.issueTypeCode = "soc";
      break;
    case "Governance":
      row.issueTypeCode = "gg";
      break;
    case "No ESG recognized":
      row.issueTypeCode = "no-esg";
      break;

    default:
      break;
  }
  delete row.Issue_type;
  row.passed = row.PassedY;
  delete row.PassedY;
  row.passed = row.passed == "Yes" ? true : false;
}
// console.log(json);

let grouped = d3.array.groups(
  json,
  x => x["year"],
  x => x["issueTypeCode"]
);

let yearArray = [];
for (const year of grouped) {
  let yearObject = { year: year[0] };
  let issueArray = [];
  for (const issue of year[1]) {
    // if (!issue[1][1]) {
    //   console.log(issue[1]);
    // }

    const issueTypeName = issue[1][0].issueTypeName;
    const issueTypeCode = issue[1][0].issueTypeCode;

    const getPassed = issue[1].find(x => x.passed == true);
    const getFailed = issue[1].find(x => x.passed == false);

    const passed = getPassed ? getPassed.count : 0;
    const failed = getFailed ? getFailed.count : 0;
    const total = passed + failed;

    let issueObject = {
      issueTypeName: issueTypeName,
      issueTypeCode: issueTypeCode,
      passed: passed,
      failed: failed,
      total: total
    };
    // console.log(issueObject);
    issueArray.push(issueObject);
  }
  yearObject.values = issueArray;
  yearArray.push(yearObject);
}

console.log(JSON.stringify(yearArray, null, 2));

fs.writeFileSync(outputPath, JSON.stringify(yearArray));
