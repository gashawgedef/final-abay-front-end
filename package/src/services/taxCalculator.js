export const calculateTax=(income)=> {
    let taxRate;
    let taxAmount;
    switch (true) {
      case income <= 600:
        taxRate = 0;
        break;
      case income <= 1650:
        taxRate = 0.1;
        break;
      case income <= 3200:
        taxRate = 0.15;
        break;
      case income <= 5250:
        taxRate = 0.20;
        break;
      case income <= 7800:
        taxRate = 0.25;
        break;
      case income <= 10900:
        taxRate = 0.30;
        break;
      default:
        taxRate = 0.35;
    }
    taxAmount = income * taxRate;
    return taxAmount;
  }