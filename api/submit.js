
/**
 * @author Narendra Khadayat
 */
//
export default async function handler(req, res) {
  // response header first
  res.setHeader('Content-Type', 'application/json');

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are accepted' 
    });
  }

  try {
    const { name, email, subject, message, formType } = req.body;
    
    // Validate fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing fields',
        message: 'Name, email and message are required'
      });
    }

    console.log('New submission:', { name, email, subject, message, formType });

    // Successful response
    return res.status(200).json({ 
      status: 'success',
      message: 'Thank you for your feedback!' 
    });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}

