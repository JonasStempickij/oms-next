import dbConnect from '../../../lib/dbConnect';
import Job from '../../../models/Job';

export default async function handler(req, res) {
  const { method, query } = req;
  console.log(`Query ${JSON.stringify(query)}`);
  const { client, material, thickness } = query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const queryObject = {};

        if (client) {
          queryObject.client = { $regex: client, $options: 'i' };
        }
        if (material && material !== 'ALL') {
          queryObject.jobParts = { $elemMatch: { material } };
        }
        if (thickness && thickness !== '0') {
          queryObject.jobParts = { $elemMatch: { thickness } };
        }
        console.log(queryObject);
        const jobs = await Job.find(queryObject);
        res.status(201).json({ success: true, jobs });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error });
      }
      break;
    case 'POST':
      try {
        const job = await Job.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: job });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case 'PUT':
      try {
        const job = await Job.updateOne({ _id: req.body._id }, req.body);
        res.status(200).json({ success: true, data: job });
      } catch (error) {
        console.log(error);
        res.status(400).json({ sucess: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
