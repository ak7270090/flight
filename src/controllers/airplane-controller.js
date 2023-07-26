const { Logger } = require("../config");
const { AirplaneService } = require("../services/");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createAirplane(req, res) {
  try {
    const { modelNumber, capacity } = req.body;
    console.log(modelNumber, capacity);

    const airplane = await AirplaneService.createAirplane({
      modelNumber: modelNumber,
      capacity: capacity,
    });

    SuccessResponse.data = airplane;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    Logger.error(error);
    return res.status(error.status).json(ErrorResponse);
  }
}

async function getAllAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAllAirplanes();
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    Logger.error(error);
    return res.status(error.status).json(ErrorResponse);
  }
}

async function getAirplane(req, res) {
  try {
    const airplanes = await AirplaneService.getAirplane(req.params.id);
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    Logger.error(error);
    return res.status(error.status).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
  getAllAirplanes,
  getAirplane,
};
