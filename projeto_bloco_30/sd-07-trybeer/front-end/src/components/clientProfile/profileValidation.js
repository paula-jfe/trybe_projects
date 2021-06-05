const profileValidation = (name) => {
  const specialCharReg = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

  const NAME_MIN_LENGTH = 12;

  if (!name || name.length < NAME_MIN_LENGTH || specialCharReg.test(name)) {
    console.log('problema em name');
    return true;
  }

  return false;
};

export default profileValidation;
