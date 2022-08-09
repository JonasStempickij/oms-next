import dbConnect from '../../../lib/dbConnect';
import Job from '../../../models/Job';

export default async function handler(req, res) {
  const { method, query } = req;
  console.log(query);
  const { client, material, thickness } = query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        if (client === '') {
          const jobs = await Job.find({});
          res.status(200).json({ success: true, jobs });
        } else {
          if (material === 'All') {
            const jobs = await Job.find({
              'client': { $regex: client, $options: 'i' },
              'jobParts.thickness': thickness,
            });
            res.status(200).json({ success: true, jobs });
          } else {
            console.log('not all');
            const jobs = await Job.find({
              'client': { $regex: client, $options: 'i' },
              'jobParts.material': material,
              'jobParts.thickness': thickness,
            });
            res.status(200).json({ success: true, jobs });
          }
        } /* find all the data in our database */
      } catch (error) {
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
