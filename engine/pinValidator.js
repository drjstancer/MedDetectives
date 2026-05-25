const validPins = {
  '4821': 'pin-01'
};

export function validateInvestigationPin(pin) {
  if (validPins[pin]) {
    return {
      valid: true,
      discoveryId: validPins[pin]
    };
  }

  return {
    valid: false,
    message: 'The evidence still feels incomplete.'
  };
}
