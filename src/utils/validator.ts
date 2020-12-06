interface Entry {
  EmployeeID: string;
  'First Name': string;
  'Last Name': string;
  'Phone Number': string;
  Email: string;
}

const validateRules = {
  Email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  'Phone Number': /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
  EmployeeID: /^[a-zA-Z]{1}[0-9]{6,}$/,
};

export default (entries: Entry[]) => {
  const validatedEntries = [];

  loop: for (let entry of entries) {
    for (let attr in entry) {
      if (!entry[attr]) {
        console.log(`Missing ${attr} in the entry`);
        continue loop;
      }
    }

    for (let validatePart in validateRules) {
      const rule = validateRules[validatePart];
      const validated = rule.test(entry[validatePart]);
      if (!validated) {
        console.log(`${validatePart} format is invalid.`);
        continue loop;
      }
    }
    validatedEntries.push({
      Email: entry['Email'],
      Fname: entry['First Name'],
      Lname: entry['Last Name'],
      Phone: entry['Phone Number'],
      EmployeeID: entry['EmployeeID'],
    });
  }

  return validatedEntries;
};
