import Teams from '../database/models/teams';

const getAllTeams = async (): Promise<Teams[]> => Teams.findAll();

const teamsService = { getAllTeams };

export default teamsService;
