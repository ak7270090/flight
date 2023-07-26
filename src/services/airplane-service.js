const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

// new instance of the AirplaneRepository class
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    throw new AppError(
      "Something went wrong while creating airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Something went wrong while getting all airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(data) {
  try {
    const airplane = await airplaneRepository.get(data);
    return airplane;
  } catch (error) {
    console.log("error in service is", error);
    Logger.error(error);

    if (error.statusCode == StatusCodes.NOT_FOUND) {
      console.log("Failing in service layer due to status code not found");
      throw new AppError(
        "The Airplane you requested is not present in the database",
        error.statusCode
      );
    }
    throw new AppError(
      "Something went wrong while getting airplane by id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirplane(id) {
  try {
    const response = await airplaneRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airplane you requested to delete is not present in the database",
        error.statusCode
      );
    }

    throw new AppError(
      "Something went wrong while getting all airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getAllAirplanes,
  getAirplane,
  destroyAirplane,
};
