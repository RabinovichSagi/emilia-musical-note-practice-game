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

export const templates_new_stories = [
  // Variations for "במשחק היו {a} ילדים..."
  {
    story: "במשחק היו {a} ילדים. הצטרפו עוד {b} ילדים. כמה ילדים יש עכשיו?",
    type: "addition_2",
    operation: (a, b) => a + b,
  },
  {
    story: "במשחק היו {a} ילדים. הצטרפו עוד {b} ילדים ואז הצטרפו עוד {c} ילדים. כמה ילדים יש עכשיו?",
    type: "addition_3",
    operation: (a, b, c) => a + b + c,
  },
  {
    story: "במשחק היו {a} ילדים. הצטרפו {b}, ואז עוד {c}, ואז הצטרפו {d}. כמה ילדים יש עכשיו?",
    type: "addition_4",
    operation: (a, b, c, d) => a + b + c + d,
  },
  {
    story: "במשחק היו {a} ילדים. עזבו {b} ילדים. כמה נשארו?",
    type: "subtraction_2",
    operation: (a, b) => a - b,
  },
  {
    story: "במשחק היו {a} ילדים. הצטרפו {b} ועזבו {c}. כמה נשארו?",
    type: "mixed_3",
    operation: (a, b, c) => a + b - c,
  },
  {
    story: "במשחק היו {a} ילדים. עזבו {b}, הצטרפו {c}. כמה ילדים יש עכשיו?",
    type: "mixed_4",
    operation: (a, b, c) => a - b + c,
  },
  {
    story: "במשחק היו {a} ילדים. עזבו {b}, ואז עזבו עוד {c}. כמה נשארו?",
    type: "mixed_5",
    operation: (a, b, c) => a - b - c,
  },

  // Variations for "על העץ יש {a} ציפורים..."
  {
    story: "על העץ יש {a} ציפורים. הצטרפו עוד {b} ציפורים. כמה ציפורים יש עכשיו?",
    type: "addition_2",
    operation: (a, b) => a + b,
  },
  {
    story: "על העץ יש {a} ציפורים. הצטרפו עוד {b} ציפורים, ואז הצטרפו {c}. כמה ציפורים יש עכשיו?",
    type: "addition_3",
    operation: (a, b, c) => a + b + c,
  },
  {
    story: "על העץ יש {a} ציפורים. הצטרפו {b}, ואז {c}, ואז {d}. כמה ציפורים יש עכשיו?",
    type: "addition_4",
    operation: (a, b, c, d) => a + b + c + d,
  },
  {
    story: "על העץ יש {a} ציפורים. עפו {b}. כמה נשארו?",
    type: "subtraction_2",
    operation: (a, b) => a - b,
  },
  {
    story: "על העץ יש {a} ציפורים. הצטרפו {b} ועפו {c}. כמה נשארו?",
    type: "mixed_3",
    operation: (a, b, c) => a + b - c,
  },
  {
    story: "על העץ יש {a} ציפורים. עפו {b}, ואז הצטרפו {c}. כמה ציפורים יש עכשיו?",
    type: "mixed_4",
    operation: (a, b, c) => a - b + c,
  },
  {
    story: "על העץ יש {a} ציפורים. עפו {b}, ואז עוד {c}. כמה נשארו?",
    type: "mixed_5",
    operation: (a, b, c) => a - b - c,
  },

  // Variations for "בחנות יש {a} תפוחים..."
  {
    story: "בחנות יש {a} תפוחים. קנו {b} תפוחים. כמה נשארו?",
    type: "subtraction_2",
    operation: (a, b) => a - b,
  },
  {
    story: "בחנות יש {a} תפוחים. הצטרפו עוד {b}. כמה תפוחים יש עכשיו?",
    type: "addition_2",
    operation: (a, b) => a + b,
  },
  {
    story: "בחנות יש {a} תפוחים. הצטרפו {b}, ונמכרו {c}. כמה נשארו?",
    type: "mixed_3",
    operation: (a, b, c) => a + b - c,
  },
  {
    story: "בחנות יש {a} תפוחים. הצטרפו {b}, ואז נמכרו {c}. כמה נשארו?",
    type: "mixed_4",
    operation: (a, b, c) => a - b + c,
  },

  // Variations for "בשדה יש {a} פרחים..."
  {
    story: "בשדה יש {a} פרחים. קטפו {b} פרחים. כמה נשארו?",
    type: "subtraction_2",
    operation: (a, b) => a - b,
  },
  {
    story: "בשדה יש {a} פרחים. קטפו {b} פרחים ואז הצטרפו {c} פרחים נוספים. כמה יש עכשיו?",
    type: "mixed_3",
    operation: (a, b, c) => a - b + c,
  },
  {
    story: "בשדה יש {a} פרחים. הצטרפו {b}, ואז קטפו {c}. כמה פרחים נשארו?",
    type: "mixed_4",
    operation: (a, b, c) => a + b - c,
  },

  // Variations for "בילדים בכיתה היו {a} שוקולדים..."
  {
    story: "בילדים בכיתה היו {a} שוקולדים. חילקו {b} לחברים. כמה נשארו?",
    type: "subtraction_2",
    operation: (a, b) => a - b,
  },
  {
    story: "בילדים בכיתה היו {a} שוקולדים. חילקו {b} לחברים וקיבלו {c}. כמה יש עכשיו?",
    type: "mixed_3",
    operation: (a, b, c) => a - b + c,
  },
  {
    story: "בילדים בכיתה היו {a} שוקולדים. חילקו {b}, ואז חילקו {c}. כמה נשארו?",
    type: "mixed_5",
    operation: (a, b, c) => a - b - c,
  }
];

export { templates_new_stories, templates_bus_drive, templates_grocery_shopping, templates_flower_bed, templates_balloons };
