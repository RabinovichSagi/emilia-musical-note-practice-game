const templates_bus_drive = [
  {
    story: "אוטובוס יצא עם {a} נוסעים. בתחנה עלו {b} נוסעים. כמה נוסעים יש?",
    type: "addition_2",
    operation: (a, b) => a + b,
  },
  {
    story: "אוטובוס יצא עם {a} נוסעים. בתחנה עלו {b} נוסעים, ואז עלו עוד {c} נוסעים. כמה נוסעים יש?",
    type: "addition_3",
    operation: (a, b, c) => a + b + c,
  },
  {
    story: "אוטובוס יצא עם {a} נוסעים. בתחנה הראשונה עלו {b} נוסעים, בשנייה עלו {c}, ובשלישית עלו עוד {d}. כמה נוסעים יש?",
    type: "addition_4",
    operation: (a, b, c, d) => a + b + c + d,
  },
  {
    story: "אוטובוס יצא עם {a} נוסעים. בתחנה ירדו {b} נוסעים. כמה נוסעים נשארו?",
    type: "subtraction_2",
    operation: (a, b) => a - b,
  },
  {
    story: "אוטובוס יצא עם {a} נוסעים. בתחנה הראשונה עלו {b} נוסעים, ואז ירדו {c} נוסעים. כמה נוסעים נשארו?",
    type: "mixed_3",
    operation: (a, b, c) => a + b - c,
  },
  {
    story: "אוטובוס יצא עם {a} נוסעים. בתחנה ירדו {b} נוסעים, ואז בתחנה הבאה עלו {c} נוסעים חדשים. כמה נוסעים יש עכשיו באוטובוס?",
    type: "mixed_4",
    operation: (a, b, c) => a - b + c,
  },
  {
    story: "אוטובוס יצא עם {a} נוסעים. בתחנה ירדו {b} נוסעים, ואחר כך בתחנה הבאה ירדו עוד {c} נוסעים. כמה נוסעים נשארו באוטובוס?",
    type: "mixed_5",
    operation: (a, b, c) => a - b - c,
  }
];

const templates_grocery_shopping = [
  {
    story: "מיכל קנתה {a} תפוחים, ואז קנתה עוד {b} תפוחים. כמה תפוחים יש לה עכשיו?",
    type: "addition_2",
    operation: (a, b) => a + b,
  },
  {
    story: "מיכל קנתה {a} תפוחים, אחר כך קנתה עוד {b} תפוחים, ואז עוד {c}. כמה תפוחים יש לה עכשיו?",
    type: "addition_3",
    operation: (a, b, c) => a + b + c,
  },
  {
    story: "מיכל קנתה {a} תפוחים, אחר כך קנתה עוד {b}, ואז עוד {c}, ולבסוף עוד {d}. כמה תפוחים יש לה?",
    type: "addition_4",
    operation: (a, b, c, d) => a + b + c + d,
  },
  {
    story: "מיכל קנתה {a} תפוחים, ונתנה {b} תפוחים לחברתה. כמה תפוחים נשארו לה?",
    type: "subtraction_2",
    operation: (a, b) => a - b,
  },
  {
    story: "מיכל קנתה {a} תפוחים, אחר כך קנתה עוד {b} תפוחים, ואז נתנה {c} לחברתה. כמה תפוחים נשארו לה?",
    type: "mixed_3",
    operation: (a, b, c) => a + b - c,
  },
  {
    story: "מיכל קנתה {a} תפוחים. לאחר מכן נתנה {b} לחברתה, ואז קנתה {c} נוספים. כמה יש לה עכשיו?",
    type: "mixed_4",
    operation: (a, b, c) => a - b + c,
  },
  {
    story: "מיכל קנתה {a} תפוחים. לאחר מכן נתנה {b} לחברתה ועוד {c} לחבר נוסף. כמה תפוחים נשארו לה?",
    type: "mixed_5",
    operation: (a, b, c) => a - b - c,
  }
];

const templates_flower_bed = [
  {
    story: "בערוגה היו {a} פרחים. הגנן שתל עוד {b} פרחים. כמה פרחים יש עכשיו?",
    type: "addition_2",
    operation: (a, b) => a + b,
  },
  {
    story: "בערוגה היו {a} פרחים. הגנן שתל {b} פרחים, ואחר כך עוד {c}. כמה פרחים יש עכשיו בערוגה?",
    type: "addition_3",
    operation: (a, b, c) => a + b + c,
  },
  {
    story: "בערוגה היו {a} פרחים. הגנן שתל {b} פרחים, אחר כך {c}, ואז עוד {d}. כמה פרחים יש עכשיו בערוגה?",
    type: "addition_4",
    operation: (a, b, c, d) => a + b + c + d,
  },
  {
    story: "בערוגה היו {a} פרחים. {b} פרחים נבלו. כמה פרחים נשארו בערוגה?",
    type: "subtraction_2",
    operation: (a, b) => a - b,
  },
  {
    story: "בערוגה היו {a} פרחים. הגנן שתל עוד {b} פרחים, ואז {c} פרחים נבלו. כמה פרחים יש עכשיו בערוגה?",
    type: "mixed_3",
    operation: (a, b, c) => a + b - c,
  },
  {
    story: "בערוגה היו {a} פרחים. {b} פרחים נבלו, ואז הגנן שתל {c} נוספים. כמה פרחים יש עכשיו בערוגה?",
    type: "mixed_4",
    operation: (a, b, c) => a - b + c,
  },
  {
    story: "בערוגה היו {a} פרחים. {b} פרחים נבלו, ואחריהם עוד {c} פרחים נבלו. כמה פרחים נשארו בערוגה?",
    type: "mixed_5",
    operation: (a, b, c) => a - b - c,
  }
];

const templates_balloons = [
  {
    story: "במסיבה היו {a} בלונים. הוסיפו עוד {b} בלונים. כמה בלונים יש עכשיו?",
    type: "addition_2",
    operation: (a, b) => a + b,
  },
  {
    story: "במסיבה היו {a} בלונים. הוסיפו {b} בלונים, ואז עוד {c}. כמה בלונים יש עכשיו?",
    type: "addition_3",
    operation: (a, b, c) => a + b + c,
  },
  {
    story: "במסיבה היו {a} בלונים. {b} בלונים התפוצצו. כמה בלונים נשארו?",
    type: "subtraction_2",
    operation: (a, b) => a - b,
  },
  {
    story: "במסיבה היו {a} בלונים. {b} בלונים התפוצצו, ואז הוסיפו {c} בלונים נוספים. כמה בלונים יש עכשיו?",
    type: "mixed_4",
    operation: (a, b, c) => a - b + c,
  },
  {
    story: "במסיבה היו {a} בלונים. {b} בלונים התפוצצו, ואחריהם עוד {c} בלונים התפוצצו. כמה בלונים נשארו?",
    type: "mixed_5",
    operation: (a, b, c) => a - b - c,
  }
];

export { templates_bus_drive, templates_grocery_shopping, templates_flower_bed, templates_balloons };
