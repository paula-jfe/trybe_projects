/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

/* const { animals } = require('./data'); */
const data = require('./data');

function animalsByIds(...ids) {
  const animalsArray = [];

  if (ids !== undefined) {
    return ids.map(selectedId => data.animals.find(animalId => animalId.id === selectedId));
  }

  return animalsArray;
}

function animalsOlderThan(animal, age) {
  const animalSpecie = data.animals.filter(species => species.name === animal);

  const specieOlderThan = animalSpecie[0].residents.every(item => item.age >= age);

  return specieOlderThan;
}

function employeeByName(employeeName) {
  const newEmployeeObject = {};

  const getEmployee = data.employees.find(name => name.firstName === employeeName ||
    name.lastName === employeeName);

  return employeeName == null ? newEmployeeObject : getEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;

  const { managers, responsibleFor } = associatedWith;

  const createNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  return createNewEmployee;
}

function isManager(id) {
  return data.employees.some(manager => manager.managers.find(theId => theId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const createNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  const actualEmployees = data.employees.push(createNewEmployee);

  return actualEmployees;
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((accumulator, nextAnimals) => {
      accumulator[nextAnimals.name] = nextAnimals.residents.length;
      return accumulator; /* Pedir explicação aqui */
    }, {});
  }

  return data.animals.find(animalSpecie => animalSpecie.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;

  return ((Adult * data.prices.Adult) +
    (Child * data.prices.Child) +
    (Senior * data.prices.Senior));
}

function ifUndefinedFunction(regionAnimals) {
  const newObject = {};

  regionAnimals.forEach((region) => {
    const animalsLocation = data.animals.filter(animal => animal.location === region);

    const animalsSpecies = animalsLocation.map(specie => specie.name);

    return (newObject[region] = animalsSpecies);
  });

  return newObject;
}

function getGender(animalsPerRegion, sex) {
  const getAllAnimals = animalsPerRegion.map(animal => animal.residents);

  const getGenderAnimals = animalsPerRegion.map(arrayOfAnimals =>
    arrayOfAnimals.residents);

  const getSpecieGender = getGenderAnimals.map(item => item.filter(animal => animal.sex === sex));

  return !sex ? getAllAnimals : getSpecieGender;
}

function ifSorted(animalsPerRegion, sorted, sex) {
  const getCurrentGender = getGender(animalsPerRegion, sex);

  let getAnimalsNames = getCurrentGender.map(item => item.map(names => names.name));

  if (sorted === true) {
    getAnimalsNames = getAnimalsNames.map(array => array.sort());
  } /* Mestre Oliva e mestre Isaac ensinaram */

  return getAnimalsNames;
}

function ifIncludesNamesFunction(regionAnimals, sex, sorted) {
  const newObject = {};

  regionAnimals.forEach((region) => {
    const animalsPerRegion = data.animals.filter(area => area.location === region);

    const getAnimals = animalsPerRegion.map(animalSpecie => animalSpecie.name);

    const getAnimalsNames = ifSorted(animalsPerRegion, sorted, sex);

    const speciesAndNames = getAnimals.reduce((exit, animalName, index) =>
    ([...exit, { [animalName]: getAnimalsNames[index] }]), []);

    return (newObject[region] = speciesAndNames);
  });

  return newObject;
}

function animalMap(options) {
  const regionAnimals = ['NE', 'NW', 'SE', 'SW'];

  if (!options) {
    return ifUndefinedFunction(regionAnimals);
  }

  const { includeNames = false, sorted = false, sex } = options;

  if (includeNames === true) {
    return ifIncludesNamesFunction(regionAnimals, sex, sorted);
  }

  return ifUndefinedFunction(regionAnimals);
}

function schedule(dayName) {
  const scheduleWeek = {};

  const daysOfWeek = Object.keys(data.hours);
  daysOfWeek.forEach((day) => {
    if (data.hours[day].open === 0) {
      scheduleWeek[day] = 'CLOSED';
    } else {
      scheduleWeek[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
    }
  });

  return dayName === undefined ? scheduleWeek : {
    [dayName]: scheduleWeek[dayName],
  };
}

function oldestFromFirstSpecies(id) {
  const animalIds = data.employees.find(employeeId => employeeId.id === id).responsibleFor;

  const animalsData = data.animals.find(animalId => animalId.id === animalIds[0]);

  return Object.values(animalsData.residents.reduce((a, b) => (a.age > b.age ? a : b)));
}

function increasePrices(percentage) {
  const factor = ((percentage / 100) + 1);

  const ticketValue = data.prices;

  ticketValue.Adult = (Math.round(data.prices.Adult * factor * 100) / 100);
  ticketValue.Child = (Math.round(data.prices.Child * factor * 100) / 100);
  ticketValue.Senior = (Math.round(data.prices.Senior * factor * 100) / 100);

  return ticketValue;
}

function employeeCoverage(idOrName) {
  if (!idOrName) {
    /* Array de empregados */
    const getEmployeesArray = data.employees.map(arrayOfEmployees =>
      `${arrayOfEmployees.firstName} ${arrayOfEmployees.lastName}`);

    /* Array de arrays onde temos os ids dos animais */
    const getEmployeesAnimals = data.employees.map(arrayOfAnimals =>
      arrayOfAnimals.responsibleFor);

    /* Novo objeto */
    const getAnimals = getEmployeesAnimals.map(arrayOfAnimals => arrayOfAnimals.map(animalId =>
      data.animals.find(specie => specie.id === animalId).name));

    const generateFinalObject = getEmployeesArray.reduce((exit, employeeName, index) =>
      ({ ...exit, [employeeName]: getAnimals[index] }), {});

      console.log(generateFinalObject);

    return generateFinalObject;
    /* Feito junto ao Johnatas Henrique turma 2, Lugh Walle turma 6 e Sidnei Ramos turma 5 */
  }

  const selectEmployees = data.employees.find(idName =>
    (idOrName === idName.id ||
      idOrName === idName.firstName ||
      idOrName === idName.lastName),
  );

  const getAnimalsArray = selectEmployees.responsibleFor.map(
    animalIds =>
      data.animals.find(animalName => animalIds === animalName.id).name);

  return { [`${selectEmployees.firstName} ${selectEmployees.lastName}`]: getAnimalsArray };
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
