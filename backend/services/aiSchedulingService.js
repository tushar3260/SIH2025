// simple placeholder for scoring slots. You can replace with ML later.
export const scoreSlot = (slot, practitionerLoad=0, patientPref=null) => {
  // lower score -> better
  let score = new Date(slot.start).getTime() / 1000;
  score += practitionerLoad * 1000;
  if (patientPref && patientPref.preferredTimes?.includes(slot.start)) score -= 100000;
  return score;
};
