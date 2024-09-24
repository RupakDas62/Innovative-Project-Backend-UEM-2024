const { MongoClient } = require('mongodb');

async function findNearestOffice(location) {
  console.log('Location received:', location); // Debugging log

  const client = await MongoClient.connect('mongodb+srv://dasr16983:F26r7p4qY4CyBcQu@innovation-project.5rsvb.mongodb.net/?retryWrites=true&w=majority&appName=Innovation-Project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('Innovation-Project');
  const offices = db.collection('fireoffices');

  console.log(offices);
  // Ensure 2dsphere index is set on location
  await offices.createIndex({ location: '2dsphere' });

  try {
    // Debug: Log the query being sent to MongoDB
    console.log('Querying nearest office with location:', [location.coordinates[0], location.coordinates[1]]);
    
    // Find the nearest office within a 10km radius
    const nearestOffice = await offices.findOne({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [location.coordinates[0], location.coordinates[1]], // [longitude, latitude]
          },
          $maxDistance: 100000, // Limit to nearest 100km
        },
      },
    });

    console.log('Nearest office found:', nearestOffice); // Debugging log

    return nearestOffice;
  } catch (error) {
    console.error('Error finding nearest office:', error);
    throw new Error('Error finding nearest office.');
  } finally {
    await client.close();
  }
}

module.exports = { findNearestOffice };
