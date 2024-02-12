// Import MongoDB Driver
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string)
const uri = 'mongodb://localhost:27017/your_database_name';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('MongoDB connection error:', err);
    return;
  }

  // Specify the database and collection
  const db = client.db('your_database_name');
  const collection = db.collection('your_collection_name');

  // Query the database and display results
  collection.find({}).toArray((err, result) => {
    if (err) {
      console.error('Error fetching data from MongoDB:', err);
      return;
    }

    // Display results in the HTML document
    const resultsSection = document.getElementById('results-section');
    result.forEach(data => {
      resultsSection.innerHTML += `
        <div class="post">
          <div class="post-details">
            <h3>${data.pet_name}</h3>
            <p>Service Type: ${data.service_type}</p>
            <p>${data.additional_details}</p>
          </div>
        </div>
      `;
    });

    // Close the MongoDB connection
    client.close();
  });
});
